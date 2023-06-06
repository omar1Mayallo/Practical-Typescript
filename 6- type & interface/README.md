# Type Aliases & Interfaces

It’s important to create dynamic and reusable code. The Don’t-Repeat-Yourself rule or DRY is an important principle to follow when writing code in TypeScript. Using TypeScript aliases and interfaces will help you to accomplish this.

TypeScript provides two ways to create custom types for our data and they include **_Type aliases_** and **_Interfaces_** (You could also use a **_class_**, but that is a JavaScript runtime concept). In this article will discuss the similarities and differences between them, and the best use cases for each.

## Documentation

First , read about the type aliases and interfaces in typescript documentation ([type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) | [interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces))

<hr />

## Similarities

- You can use an [index signature](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures) with both interface and type.

  ```ts
  type TDict = {[key: string]: string};
  interface IDict {
    [key: string]: string;
  }
  ```

<div align="center">__________________________</div><br/>

- Both type aliases and interfaces can be [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html).

  ```ts
  type TPair<T> = {
    first: T;
    second: T;
  };
  interface IPair<T> {
    first: T;
    second: T;
  }
  ```

<div align="center">__________________________</div><br/>

- An interface can **_extend_** a type (with some caveats), and a type can extend an interface.

  ```ts
  type TState = {
    name: string;
    capital: string;
  };

  interface IState {
    name: string;
    capital: string;
  }

  interface IStateWithPop extends TState {
    population: number;
  }

  type TStateWithPop = IState & {population: number};
  ```

  The caveat is that an interface cannot extend a complex type like a union type. If you want to do that, you’ll need to use type and `&`.

<div align="center">__________________________</div><br/>

- A class can **_implement_** either an interface or a **_simple_** type.

  ```ts
  class StateT implements TState {
    name: string = "";
    capital: string = "";
  }

  class StateI implements IState {
    name: string = "";
    capital: string = "";
  }
  ```

<hr />

## Differences

- There are union types but no union interfaces.

  ```ts
  type AorB = "a" | "b";
  ```

<div align="center">__________________________</div><br/>

- It can also more easily express tuple and array types.

  ```ts
  type Pair = [number, number];
  type StringList = string[];
  type NamedNums = [string, ...number[]];
  ```

  You can express something like a tuple using interface:

  ```ts
  interface Tuple {
    0: number;
    1: number;
    length: 2;
  }
  const t: Tuple = [10, 20]; // OK
  ```

  But this is awkward and drops all the tuple methods like `concat` Better to use a type.<br/><br/>

  **_A type is, in general, more capable than an interface. It can be a union, and it can also take advantage of more advanced features like mapped or conditional types._**

<div align="center">__________________________</div><br/>

- The Crucial advantage of interfaces [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces).

  - interface can be reopened to add new properties and expand the definition of the type.
  - type aliases can not be changed after being created.

  ```ts
  interface Vehicle {
  licenceNumber: string
  }

  interface Vehicle {
    type: string
  }

  const vehicle: Vehicle = {licenceNumber: "test", type: "test"}

  //................................//

  // Dublicate identifier error
  type Vehicle {
    licenceNumber: string
  }

  type Vehicle {
    type: string
  }
  ```

<hr />

### Best Practices

- **_Use type aliases for complex types_**

  Type aliases are particularly useful for defining complex types that are used in multiple places. By providing a clear and descriptive name, you enhance code readability and maintainability.

- **_Use interfaces for defining object shapes_**

  Interfaces are generally preferred when defining the shape of an object. Interfaces are more appropriate when you need to implement the same shape across different objects or classes, and when you want to extend or implement them.

- **_Consider personal preference and team conventions_**

  Choosing between type aliases and interfaces often comes down to personal preference and team conventions. It's important to follow consistent patterns and conventions within your project or organization to ensure codebase consistency and ease of collaboration.

<hr />

#### Conclusion

Ultimately, the choice between type aliases and interfaces depends on the specific use case and your personal/team preferences.

💥See what the typescript documentation said about using type vs interface:

> For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. **_If you would like a heuristic, use `interface` until you need to use features from `type`._**

<hr />

#### Resources

- [https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)
- [https://www.digitalocean.com/community/tutorials/typescript-type-alias](https://www.digitalocean.com/community/tutorials/typescript-type-alias)
- [https://medium.com/front-end-weekly/typescript-advanced-types-a0d26614875](https://medium.com/front-end-weekly/typescript-advanced-types-a0d26614875)
- [https://dev.to/toluagboola/type-aliases-vs-interfaces-in-typescript-3ggg](https://dev.to/toluagboola/type-aliases-vs-interfaces-in-typescript-3ggg)
