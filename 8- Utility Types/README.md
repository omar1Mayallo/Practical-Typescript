# TypeScript Utility Types

This README provides an overview of common utility types available in TypeScript. Utility types allow us to perform transformations on types, making our code more concise and DRY (Don't Repeat Yourself).

### Partial\<T\>

Constructs a type with all properties of the given type set to optional.

Example:

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
// Result: { name?: string; age?: number; }
```

### Required\<T\>

Constructs a type with all properties of the given type set to required.

Example:

```typescript
interface PartialUser {
  name?: string;
  age?: number;
}

type RequiredUser = Required<PartialUser>;
// Result: { name: string; age: number; }
```

### Readonly\<T\>

Constructs a type with all properties of the given type set to readonly.

Example:

```typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// Result: { readonly name: string; readonly age: number; }
```

### Record\<K, T\>

Constructs an object type with keys of type `K` mapped to values of type `T`.

Example:

```typescript
type Fruit = "apple" | "banana" | "orange";
type FruitPrices = Record<Fruit, number>;
// Result: { apple: number; banana: number; orange: number; }
```

### Pick\<T, K\>

Constructs a type by picking only the properties from `T` specified by the keys `K`.

Example:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserBasicInfo = Pick<User, "name" | "age">;
// Result: { name: string; age: number; }
```

### Omit\<T, K\>

Constructs a type by omitting the properties from `T` specified by the keys `K`.

Example:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type UserWithoutEmail = Omit<User, "email">;
// Result: { name: string; age: number; }
```

### Exclude\<T, U\>

Constructs a type by excluding from `T` all union members that are assignable to `U`.

Example:

```typescript
type Numbers = 1 | 2 | 3 | 4 | 5;
type OddNumbers = Exclude<Numbers, 2 | 4>;
// Result: 1 | 3 | 5
```

### Extract\<T, U\>

Constructs a type by extracting from `T` all union members that are assignable to `U`.

Example:

```typescript
type Numbers = 1 | 2 | 3 | 4 | 5;
type EvenNumbers = Extract<Numbers, 2 | 4>;
// Result: 2 | 4
```

### NonNullable\<T\>

Constructs a type by excluding `null` and `undefined` from `T`.

Example:

```typescript
type User = {
  name: string;
  age: number | null;
};

type NonNullableUser = NonNullable<User["age"]>;
// Result: number
```

### ReturnType\<T\>

Constructs a type consisting of the return type of a function `T`.

Example:

```typescript
function greet(): string {
  return "Hello, World!";
}

type Greeting = ReturnType<typeof greet>;
// Result: string
```

These utility types in TypeScript provide powerful tools for working with and transforming types, making your code more concise and DRY.
