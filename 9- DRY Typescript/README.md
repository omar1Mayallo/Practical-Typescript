# DRY Typescript

The DRY (Don't Repeat Yourself) principle holds significant importance in the programming world. This repository aims to explore various features and methods to implement DRY code in TypeScript effectively. Following these guidelines, developers can reduce redundancy, improve code readability, and enhance maintainability in their TypeScript projects.

## Generics

[**Generics**](https://www.typescriptlang.org/docs/handbook/2/generics.html) in TypeScript allow you to create reusable components that can work with a variety of data types. They provide a way to define type parameters, which are placeholders for specific types that will be determined when the component is used. This flexibility allows you to create more generic and versatile functions and classes that can handle different data types without duplicating code.

**Example 1: Generic Function**

```typescript
// Without Generics
function printArray(arr: number[]): void {
  arr.forEach((item) => console.log(item));
}

// With Generics
function printArray<T>(arr: T[]): void {
  arr.forEach((item) => console.log(item));
}

const numbers: number[] = [1, 2, 3, 4];
const strings: string[] = ["a", "b", "c"];

printArray(numbers); // Output: 1, 2, 3, 4
printArray(strings); // Output: 'a', 'b', 'c'
```

In the non-generic version, the function is explicitly designed to work with an array of numbers. With generics, we can make the function more reusable by accepting arrays of any type.

**Example 2: Generic Class**

```typescript
class Box<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");

console.log(numberBox.getValue()); // Output: 42
console.log(stringBox.getValue()); // Output: 'hello'

numberBox.setValue(100);
stringBox.setValue("world");

console.log(numberBox.getValue()); // Output: 100
console.log(stringBox.getValue()); // Output: 'world'
```

In this example, the `Box` class is generic, which means it can be instantiated with any type. It allows us to create instances that hold numbers, strings, or any other data type without writing separate classes for each type. This promotes code reusability and adheres to the DRY principle.

You can do some limitations to **_Generics_**, See the following article > [Keeping Your TypeScript Code DRY With Generics](https://blog.openreplay.com/keeping-your-typescript-code-dry-with-generics/)

## Apply Types to Entire Function Expressions When Possible

```typescript
// Functions In JS & TS
function rollDice1(sides: number): number {
  /* ... */
} // Statement or Regular
const rollDice2 = function (sides: number): number {
  /* ... */
}; // Expression
const rollDice3 = (sides: number): number => {
  /* ... */
}; // Also expression
```

An advantage of _function expressions_ in TypeScript is that you can apply a type declaration to the entire function at once, rather than specifying the types of the parameters and return type individually.

**Example 1**

```typescript
type DiceRollFn = (sides: number) => number;
const rollDice: DiceRollFn = (sides) => {
  /* ... */
};
```

If you mouse over sides in your editor, you’ll see that TypeScript knows its type is number.

**Example 2**

One is reducing repetition. If you wanted to write several functions for doing arithmetic on numbers, for instance, you could write them like this:

```typescript
// With Regular Function
function add(a: number, b: number) {
  return a + b;
}
function sub(a: number, b: number) {
  return a - b;
}
function mul(a: number, b: number) {
  return a * b;
}
function div(a: number, b: number) {
  return a / b;
}

// With Function Expression
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

This has fewer type annotations than before, and they’re separated away from the function implementations. This makes the logic more apparent. You’ve also gained a check that the return type of all the function expressions is a number.

## Type Operations (Mapped Types, keyof Operator, Indexing Types, ...etc)

TypeScript provides powerful type operations that allow you to manipulate and transform types. Understanding these operations can help you write more generic, reusable code and make your code follow the DRY principle.

### Mapped Types

[**_Mapped Types_**](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) in TypeScript allow you to create new types based on existing ones by applying a transformation to each property. They provide a way to generate new types automatically by iterating over the properties of an existing type and transforming their attributes or values. Mapped types are extremely useful for reducing code duplication and making your code more generic and reusable.

Mapped Types are very useful in Typescript, Most [**_Utility Types_**](https://github.com/omar1Mayallo/Practical-Typescript/tree/main/8-%20Utility%20Types) are built with it.

The general syntax for a mapped type is:

```typescript
{ [Key in Type]: NewType }
```

- `Key`: The variable representing each property key in the existing type.
- `Type`: The existing type you want to transform.
- `NewType`: The new type assigned to each property.

**Example 1: Mapping Enum to String Values**

```typescript
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

type ColorStrings = {[K in Color]: string};

const colorNames: ColorStrings = {
  [Color.Red]: "Red",
  [Color.Green]: "Green",
  [Color.Blue]: "Blue",
};
```

**Example 2: See How Typescript Utility Types Built**

```typescript
type FilterProperties<T, Condition extends keyof T> = {
  [K in keyof T as K extends Condition ? K : never]: T[K];
};
interface Person {
  name: string;
  age: number;
  email: string;
}

type BasicInfo = FilterProperties<Person, "name" | "age">; // {name: string; age: number;}
```

The **_FilterProperties_** mapped type takes an object type T and a Condition representing the property key you want to filter by. It creates a new object with only the properties that match the condition.

### keyof Operator

The [**_keyof operator_**](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) is a powerful feature in TypeScript that allows you to extract and manipulate property names from object types. It provides a way to create more dynamic and type-safe code by working with property keys as values.

**Example 1: Indexing and Mapping Properties**

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

function getConfigValue<T extends keyof Config>(key: T): Config[T] {
  return config[key];
}

const apiURL = getConfigValue("apiUrl"); // Result: 'https://api.example.com'
const timeout = getConfigValue("timeout"); // Result: 5000
```

**Example 2: Mapping Enum to String Values**

```typescript
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

type ColorKeys = keyof typeof Color;
// Result: "Red" | "Green" | "Blue"
```

<hr />

#### Resources

- [https://blog.openreplay.com/keeping-your-typescript-code-dry-with-generics/](https://blog.openreplay.com/keeping-your-typescript-code-dry-with-generics/)
- [https://betterprogramming.pub/11-tips-that-make-you-a-better-typescript-programmer-16893fcf3167](https://betterprogramming.pub/11-tips-that-make-you-a-better-typescript-programmer-16893fcf3167)
- [https://dev.to/joanllenas/dry-typescript-types-1245](https://dev.to/joanllenas/dry-typescript-types-1245)
