# What is never type ?

- The `never` type represents values which are **_never observed_**. In a return type, this means that the **_function throws an exception_** or **_terminates execution of the program_**.

  - function throw an exception <br/><br/>

  ```typescript
  function throwError(message: string): never {
    throw new Error(message);
  }
  function reject() {
    // return type of this function infer to 'never' type >> function reject(): never
    return throwError("Rejected");
  }
  ```

  - function never returns <br/><br/>

  ```typescript
  function keepProcessing(): never {
    while (true) {
      console.log("I always does something and never ends.");
    }
  }
  ```

- `never` also appears when TypeScript determines there’s **_nothing left in a union_** which called **_"Exhaustive Checks"_**.

- The `never` type is a type that contains no values. Because of this, **_you cannot assign any value to a variable with a never type_**.

```typescript
let variable1: never = null; // Type 'null' is not assignable to type 'never'
let variable2: never = 1; // Type 'number' is not assignable to type 'never'
let variable3: never = "geek"; // Type 'string' is not assignable to type 'never'
let variable4: never = true; // Type 'boolean' is not assignable to type 'never'
```

<hr />

## Some use cases

### Exhaustive Checks

You can call never functions in a never context.

Let's see this example :

```typescript
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }

  // Without a never type we would error :
  // - Not all code paths return a value (strict null checks)
  // - Or Unreachable code detected
  // But because TypeScript understands that `fail` function returns `never`
  // It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
  return fail("Unexhaustive!");
}

function fail(message: string): never {
  throw new Error(message);
}
```

And because `never` is only assignable to another `never` you can use it for compile time exhaustive checks as well. you can use this concept in [**_Discriminated Unions or Tagged Unions_**](https://basarat.gitbook.io/typescript/type-system/discriminated-unions).

<br/>

### Custom NonNullable type alias

There is a type alias built in typescript called `NonNullable<T>` **_which Exclude null and undefined from T_**, we can build a custom one as following

```typescript
type OwnNonNullable<T> = T extends null | undefined ? never : T;

let var1: OwnNonNullable<number | string | null>; // type is >> let var1: string | number

var1 = 5;
var1 = "five";
var1 = null; //TS_Error >> Type 'null' is not assignable to type 'string | number'.ts(2322)
```

<hr/>

## never vs void

As soon as someone tells you that `never` is returned when a function never exits gracefully you intuitively want to think of it as the same as `void`. However, `void` is a Unit. `never` is a falsum(always throws or unreachable).

- A function that doesn't explicitly return a value **_implicitly returns_** the value undefined in JavaScript. Although we typically say that such a function "doesn't return anything", it returns. We usually ignore the return value in these cases. Such a function is inferred to have a `void` return type in TypeScript.

- A function that has a never return type **_never returns_**. It doesn't return undefined, either. The function doesn't have a normal completion, which means it throws an error or never finishes running at all.

Let's see this example :

```typescript
function logger(msg: string): void {
  console.log("msg");
}
```

logger function here is return `void` but, when to return `never`:

```typescript
function logger(msg: string): never {
  // TS_ERROR >> A function returning 'never' cannot have a reachable end point.ts(2534)
  console.log("msg");
}
```

`never` means that the end of the function will never be reached. while `void` can have a reachable end point.

- Another difference `void` is something that can be assigned (without `strictNullChecking`) but `never` can never be assigned to anything other than `never`.

```typescript
let voidVar: void;
let neverVar: never;

voidVar = undefined;
neverVar = undefined; // TS_ERROR >> Type 'undefined' is not assignable to type 'never'.ts(2322)
```

#### Resources

- [https://www.tutorialsteacher.com/typescript/typescript-never](https://www.tutorialsteacher.com/typescript/typescript-never)
- [https://basarat.gitbook.io/typescript/type-system/never](https://basarat.gitbook.io/typescript/type-system/never)
- [https://www.typescripttutorial.net/typescript-tutorial/typescript-never-type/](https://www.typescripttutorial.net/typescript-tutorial/typescript-never-type/)
- [https://stackoverflow.com/questions/42291811/use-of-never-keyword-in-typescript](https://stackoverflow.com/questions/42291811/use-of-never-keyword-in-typescript)
- [https://www.geeksforgeeks.org/explain-the-purpose-of-never-type-in-typescript-2/](https://www.geeksforgeeks.org/explain-the-purpose-of-never-type-in-typescript-2/)
- [https://stackoverflow.com/questions/37910669/what-is-the-difference-between-never-and-void-in-typescript](https://stackoverflow.com/questions/37910669/what-is-the-difference-between-never-and-void-in-typescript)
- [https://mariusschulz.com/blog/the-never-type-in-typescript#the-difference-between-never-and-void](https://mariusschulz.com/blog/the-never-type-in-typescript#the-difference-between-never-and-void)
- [https://stackoverflow.com/questions/53885183/a-function-returning-never-cannot-have-a-reachable-end](https://stackoverflow.com/questions/53885183/a-function-returning-never-cannot-have-a-reachable-end)
