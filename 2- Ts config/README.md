# What is TS config file (ts.config) ? Why need it ?

- The `tsconfig.json` file is the main configuration file for TypeScript. Similar to how the package.json file in a directory identifies the presence of a Node.js project (or at least node modules), the `tsconfig.json` file identifies the presence of TypeScript files in the project.

- The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The `tsconfig.json` file specifies the root files and the compiler options required to compile the project. <br/><br/>
  We can set these options via :
  - command line <br/><br/>
  ```cmd
  tsc --noImplicitAny app.ts
  ```
  or
  - ts.config file <br/><br/>
  ```json
  {
    "compilerOptions": {
      "noImplicitAny": true
    }
  }
  ```

**_But You should prefer the configuration file. It ensures that your coworkers and tools all know exactly how you plan to use TypeScript. You can create one by running `tsc --init`_**.

<hr/>

## Reference to all ts.config options

- [http://json.schemastore.org/tsconfig](http://json.schemastore.org/tsconfig)
- [https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

<hr/>

## Notes on some ts.config options

### files vs include

The best practice to use both of them is :

- `files` : Specifies an allowlist of files to include in the program. An error occurs if any of the files can’t be found. this is useful when you only have a small number of files and don’t need to use a glob to reference many files. If you need that then use `include`.

```json
{
  "files": ["app.ts", "server.ts"]
}
```

- `include` : Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the tsconfig.json file.

```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

<br/>

### noImplicitAny

In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type. This can cause some errors to be missed, for example:

```typescript
function getSum(a, b) {
  // when "noImplicitAny": false
  // No Error
  return a + b;
}
```

Turning on `noImplicitAny` however TypeScript will issue an error whenever it would have inferred any:

```typescript
function getSum(a, b) {
  // when "noImplicitAny": true (default value)
  // error : Parameter 'a', 'b' implicitly has an 'any' type.
  return a + b;
}
```

These errors can be fixed by explicitly writing type declarations, either : any or a more specific type:

```typescript
function getSum(a: number, b: number) {
  return a + b;
}
```

**_TypeScript is the most helpful when it has type information, so you should be sure to set `noImplicitAny` whenever possible. Once you grow accustomed to all variables having types, TypeScript without `noImplicitAny` feels almost like a different language. <br/><br/> For new projects, you should start with `noImplicitAny` on, so that you write the types as you write your code. This will help TypeScript spot problems, improve the read‐ability of your code, and enhance your development experience. Leaving `noImplicitAny` off is only appropriate if you’re transitioning a project from JavaScript to TypeScript._**

<br/>

### strictNullChecks

`strictNullChecks` controls whether null and undefined are permissible values in every type.

- When `strictNullChecks` is `false`, `null` and `undefined` are effectively ignored by the language. This can lead to unexpected errors at runtime.
- When `strictNullChecks` is `true`, `null` and `undefined` have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

```typescript
const el = document.getElementById("status");
el.textContent = "Ready";
// error : 'el' is possibly 'null'. strictNullChecks: true
```

To solve this error you need to prove to typescript el will non null, can do this by 2 ways :

```typescript
const el = document.getElementById("status");
if (el) {
  el.textContent = "Ready"; // with if statement check el is found
}
// or
el!.textContent = "Ready"; // with assert it non-null with (!)
```

**_`strictNullChecks` is tremendously helpful for catching errors involving null and undefined values, but it does increase the difficulty of using the language. If you’re starting a new project, try setting `strictNullChecks`. But if you’re new to the language or migrating a JavaScript codebase, you may elect to leave it off. You should certainly set `noImplicitAny` before you set `strictNullChecks`.
<br/><br/>
If you choose to work without `strictNullChecks`, keep an eye out for the dreaded “undefined is not an object” runtime error. Every one of these is a reminder that you should consider enabling stricter checking. Changing this setting will only get harder as your project grows, so try not to wait too long before enabling it_**.

<hr/>

#### Resources

- [https://jasonraimondi.com/posts/what-is-a-tsconfig-file-and-why-do-you-need-it/](https://jasonraimondi.com/posts/what-is-a-tsconfig-file-and-why-do-you-need-it/)
