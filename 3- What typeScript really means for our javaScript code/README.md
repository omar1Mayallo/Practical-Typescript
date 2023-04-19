# What TypeScript Really Means for Our JavaScript Code ?

As effective book said **_"Understand That Code Generation Is Independent of Types"_** , but What is meaning of that !

At a high level, what we get when we compile TypeScript code (using the tsc command) are two things:

- Convert our TypeScript code, with modern features, to an older version of JavaScript (depending on our output target option in ts.config).
- Check our code for type errors.

The types in your code cannot affect the JavaScript that TypeScript emits. `Since it’s this JavaScript that gets executed`, this means that your types can’t
affect the way your code runs. <br/>

**_This has some surprising implications and should inform your expectations about what TypeScript can and cannot do for you._**

## We can get JavaScript code even when we have type errors

In languages like Java or C, if we have any error during the “compiling time”, no output is produced. When we are running the `tsc` command to compile our TypeScript code, having an error does not prevent us from getting valid JavaScript code.

For example :

```typescript
// app.ts
function addNums(x: number, y: number): string {
  // TS Error : Type 'number' is not assignable to type 'string'.ts(2322)
  return x + y;
}
```

but when run `tsc app.ts` we get app.js file with valid code, even when we are receiving the error `Type 'number' is not assignable to type 'string'.ts(2322)`

```javascript
// app.js
function addNums(x, y) {
  return x + y;
}
```

This can be quite surprising if you’re coming from a language like C or Java where type checking and output go hand in hand. You can think of all TypeScript errors as
being similar to warnings in those languages: it’s likely that they indicate a problem and are worth investigating, but they won’t stop the build.

### But, Why typescript has this behaviour ?

Code emission in the presence of errors is helpful in practice. If you’re building a web application, you may know that there are problems with a particular part of it. But because TypeScript will still generate code in the presence of errors, you can test the other parts of your application before you fix them.

However, You should aim for zero errors when you commit code, lest you fall into the trap of having to remember what is an expected or unexpected error. If you want to disable output on errors, you can use the [`noEmitOnError`](https://www.typescriptlang.org/tsconfig#noEmitOnError) option in tsconfig.json, or the equivalent in your build tool.

**_So, Typescript is a very powerful language, you have the choice to get a code if you have type errors or not commit it in the presence of type errors._**

## TypeScript types cannot be checked at runtime

See this example :

```typescript
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // TS_Error => 'Rectangle' only refers to a type, but is being used as a value here.ts(2693)
    return shape.width * shape.height;
    // TS_Error => Property 'height' does not exist on type 'Shape'.
  } else {
    return shape.width * shape.width;
  }
}
```

The `instanceof check happens at runtime`, but Rectangle is a type and so it cannot affect the runtime behavior of the code. TypeScript types are `“erasable”`: part of compilation to JavaScript is simply removing all the interfaces, types, and type annotations from your code.

To ascertain the type of shape you’re dealing with, you’ll need some way to reconstruct its type at runtime. and we can solve this problem by the following ways :

- By checking for the presence of a `height` property

```typescript
function calculateArea(shape: Shape) {
  if ("height" in shape) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}
```

Here we check `height` property in shape parameter (which has a value at runtime other than Shape type which is erased at runtime).<br/>
see also [in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in).

<br/>

- Using a property or tag which is available at runtime for the validation

```typescript
interface Square {
  kind: "square";
  width: number;
}

interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === "rectangle") {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}
```

Here, We check for `kind` property that will exist in shape parameter (where it is not optional property inside Square or Rectangle but it has a literal type and here we check by this literal type as `shape.kind === "rectangle"`).

The Shape type here is an example of a “tagged union” which are ubiquitous(common) in TypeScript. and here example of usecase in real project :

**Modeling Redux Actions with Tagged Union Types**

[https://mariusschulz.com/blog/tagged-union-types-in-typescript#modeling-redux-actions-with-tagged-union-types](https://mariusschulz.com/blog/tagged-union-types-in-typescript#modeling-redux-actions-with-tagged-union-types)

<br/>

- Using class keyword

```typescript
class Square {
  constructor(public width: number) {}
}

class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width; // OK
  }
}
```

Here, This works because `class Rectangle introduces both a type and a value`, whereas interface only introduced a type.

## Runtime values are not affected by type operations

See this example :

```typescript
function asNumber(val: number | string): number {
  return val as number;
}
```

when we compile asNumber to javascript code we get

```javascript
function asNumber(val) {
  return val;
}
```

Here, `as number` is type operation ,so it cannot affect the runtime behavior of your code.

To normalize the val you’ll need to check its runtime type and do the conversion using JavaScript constructs:

```typescript
function asNumber(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}
```

**_Since typescript doesn't affect runtime values and types and type operations are erased when you generate JavaScript, they cannot have an effect on runtime performance. TypeScript’s static types are truly zero cost._**

<hr/>

#### Resources

- [https://javascript.plainenglish.io/what-typescript-really-means-for-our-javascript-code-90f3ea7ad8a5](https://javascript.plainenglish.io/what-typescript-really-means-for-our-javascript-code-90f3ea7ad8a5)
- [https://mariusschulz.com/blog/tagged-union-types-in-typescript#modeling-redux-actions-with-tagged-union-types](https://mariusschulz.com/blog/tagged-union-types-in-typescript#modeling-redux-actions-with-tagged-union-types)
