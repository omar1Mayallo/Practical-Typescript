# What is `unknown` type and why it's exist while we have `any` type?

From time to time, we come across situations where the type isn't known beforehand or type could be anything.<br/>
Before typescript v3 we would use the `any` type for such types. But this comes with a few tradeoffs, like losing any **_type safety_** provided by Typescript.<br/>
Thus, the problem here is use `any` type .. let's see an example :

```typescript
const x: any = {
  a: "a-value",
  b: "b-value",
};

console.log(x.c); // No Errors
```

There's no error when to use x.c , but why ?<br/>
With `any` type the compiler effectively treats `any` as “please turn off type checking for this thing”. It is similar to putting an [`@ts-ignore`](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check) comment around every usage of the variable, so it causes losing any **_type safety_** provided by Typescript.
<br/><br/>
How the `unknown` type solve this problem ? <br/>
The `unknown` type, when assigned to a variable, means that a variable type is not known. and typescript doesn't allow you to use a variable of `unknown` type unless you either cast the variable to a known type or narrow its type [(Type Narrowing)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).<br/>

thus,<br/>

> `unknown` is the type-safe counterpart of `any`

```typescript
const x: unknown = {
  a: "a-value",
  b: "b-value",
};

console.log(x.c); // TS_ERROR >> 'x' is of type 'unknown'.ts(18046)
```

when to declare x to `unknown` type in above example the x.c throw error `'x' is of type 'unknown'`. so `unknown` type achieve the **_TYPE_SAFETY_** concept other than `any` type.

**_The main difference between `unknown` and `any` is that `unknown` is much less permissive than `any`: we have to do some form of checking before performing most operations on values of type `unknown`, whereas we don't have to do any checks before performing operations on values of type `any`._**

<hr />

## Examples on `unknown` usage

[https://mariusschulz.com/blog/the-unknown-type-in-typescript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)

<hr />

#### Resources

- [https://javascript.plainenglish.io/what-is-the-unknown-type-in-typescript-5ef6c5333b81](https://javascript.plainenglish.io/what-is-the-unknown-type-in-typescript-5ef6c5333b81)
- [https://levelup.gitconnected.com/when-to-use-unknown-and-never-types-in-typescript-6cd4a54b79b7](https://levelup.gitconnected.com/when-to-use-unknown-and-never-types-in-typescript-6cd4a54b79b7)
- [https://www.geeksforgeeks.org/what-is-an-unknown-type-and-when-to-use-it-in-typescript/](https://www.geeksforgeeks.org/what-is-an-unknown-type-and-when-to-use-it-in-typescript/)
- [https://mainawycliffe.dev/blog/typescript-use-unknown-instead-of-any/](https://mainawycliffe.dev/blog/typescript-use-unknown-instead-of-any/)
- [https://medium.com/@vinhle95/the-unknown-type-in-typescript-939ec261294b](https://medium.com/@vinhle95/the-unknown-type-in-typescript-939ec261294b)
- [https://mariusschulz.com/blog/the-unknown-type-in-typescript](https://mariusschulz.com/blog/the-unknown-type-in-typescript)
- [https://itnext.io/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3#4f04](https://itnext.io/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3#4f04)
- [https://betterprogramming.pub/typescript-into-the-unknown-4c19d913cb15](https://betterprogramming.pub/typescript-into-the-unknown-4c19d913cb15)
