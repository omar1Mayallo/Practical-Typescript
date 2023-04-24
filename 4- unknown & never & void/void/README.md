# What is void type and why it's exist ?

As typescript docs said :

> `void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements, or doesn’t `return` any explicit value from those return statements

In JavaScript, a function that doesn’t return any value will implicitly return the value `undefined`. However, `void` and `undefined` are not the same thing in TypeScript. **but how and why `void` exist while javascript has `undefined` as primitive data type?**.

### void vs undefined

In TypeScript `void` is used to signal a function’s return value is not going to be used. This doesn’t necessarily mean it will be `undefined`.

See this example :

```typescript
const readFileTitle = (src: string, callback: (title: string) => undefined) => {
  // The implementation is not important.
};
```

It’s important to note that the callback return’s type is undefined. Imagine now we’re using this function to retrieve the titles of a series of file:

```typescript
const files = ["./file1.txt", "./file2.txt"];
const titles = [];
for (const file of files) {
  readFileTitle(file, (title) => titles.push(title));
  // TS_ERROR => Type 'number' is not assignable to type 'undefined'.ts(2322)
}
```

In this case, TypeScript will throw a compilation error:

> Type 'number' is not assignable to type 'undefined'.ts(2322)

The error in this case makes sense. we said the callback function return `undefined` but here it's return `number` (`number` result from `[].push`)

to solve this error we should use `void` as return type to callback function as following:

```typescript
const readFileTitle = (src: string, callback: (title: string) => void) => {
  // The implementation is not important.
};
const files = ["./file1.txt", "./file2.txt"];
const titles = [];
for (const file of files) {
  readFileTitle(file, (title) => titles.push(title));
  // No Error
}
```

**_Cause when we say a function returns `undefined`, the only way to make TypeScript happy is to actually return `undefined`. On the other hand, when we use `void` we don’t make any assumption on the function’s return value - we just state that we’re not going to use that value._**

<hr />

## Some use cases of void in real world

[https://betterprogramming.pub/what-is-void-in-typescript-2d21d4936537](https://betterprogramming.pub/what-is-void-in-typescript-2d21d4936537)

<hr />

#### Resources

- [https://www.tutorialsteacher.com/typescript/typescript-void](https://www.tutorialsteacher.com/typescript/typescript-void)
- [https://betterprogramming.pub/what-is-void-in-typescript-2d21d4936537](https://betterprogramming.pub/what-is-void-in-typescript-2d21d4936537)
- [https://learntypescript.dev/03/l3-void](https://learntypescript.dev/03/l3-void)
- [https://brunoscopelliti.com/blog/whats-the-difference-between-undefined-and-void-in-typescript/](https://brunoscopelliti.com/blog/whats-the-difference-between-undefined-and-void-in-typescript/)
- [https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void)
