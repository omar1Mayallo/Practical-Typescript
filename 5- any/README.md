# What is `any` type and why it exists while typescript built to give types to javascript?

As Effective typeScript book said :

> TypeScript’s type system is _*gradual*_ and _*optional*_: _*gradual*_ because you can add types to your code bit by bit and _*optional*_ because you can disable the type checker whenever you like. The key to these features is the `any` type.

So `any` type gives us more flexibility to use typescript, but .. see this restrict about using `any` from typescript docs :

> ❌ Don’t use `any` as a type unless you are in the process of migrating a JavaScript project to TypeScript. The compiler effectively treats `any` as “please turn off type checking for this thing”. It is similar to putting an `@ts-ignore` comment around every usage of the variable. This can be very helpful when you are first migrating a JavaScript project to TypeScript as you can set the type for stuff you haven’t migrated yet as any, but in a full TypeScript project you are disabling type checking for any parts of your program that use it.<br/><br/>
> In cases where you don’t know what type you want to accept, or when you want to accept anything because you will be blindly passing it through without interacting with it, you can use `unknown`.

**_Type checking is one of the most significant features of TypeScript. It helps to avoid unexpected issues in the application by checking the data assignments and type castings.<br/><br/>
When you use any type, variables will not have a specific data type, and you can assign multiple types of values to the same variable. In addition, the compiler will not perform type-checking on variables defined with any type, and your project will look like a regular JavaScript project.<br/><br/>
So, why does TypeScript provide a data type named anyif it is that bad? There are some specific scenarios where any type can become a lifesaver. As developers, we should be able to identify those situations and apply any type accordingly.<br/><br/>
So the use of `any` should be used with caution and purpose. Therefore, using the `any` type is like buying a high-end computer and throwing away the RAM – it doesn’t help in many cases._**

## `any` type

> IN_PROGRESS

<hr />

#### Resources

- [https://itnext.io/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3#e2c2](https://itnext.io/mastering-typescript-21-best-practices-for-improved-code-quality-2f7615e1fdc3#e2c2)
- [https://www.tutorialsteacher.com/typescript/typescript-any](https://www.tutorialsteacher.com/typescript/typescript-any)
- [https://www.educative.io/answers/what-is-any-type-in-typescript](https://www.educative.io/answers/what-is-any-type-in-typescript)
- [https://www.geeksforgeeks.org/what-is-any-type-and-when-to-use-it-in-typescript/](https://www.geeksforgeeks.org/what-is-any-type-and-when-to-use-it-in-typescript/)
- [https://blog.bitsrc.io/stop-using-any-type-in-typescript-48ebefc8b299](https://blog.bitsrc.io/stop-using-any-type-in-typescript-48ebefc8b299)
