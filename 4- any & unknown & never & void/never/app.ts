// let variable1: never = null; // Type 'null' is not assignable to type 'never'
// let variable2: never = 1; // Type 'number' is not assignable to type 'never'
// let variable3: never = "geek"; // Type 'string' is not assignable to type 'never'
// let variable4: never = true; // Type 'boolean' is not assignable to type 'never'

// function throwError(message: string): never {
//   throw new Error(message);
// }
// function reject() {
//   // return type of this function infer to 'never' type >> function reject(): never
//   return throwError("Rejected");
// }
// function keepProcessing(): never {
//   while (true) {
//     console.log("I always does something and never ends.");
//   }
// }

// function foo(x: string | number): boolean {
//   if (typeof x === "string") {
//     return true;
//   } else if (typeof x === "number") {
//     return false;
//   }

//   // Without a never type we would error :
//   // - Not all code paths return a value (strict null checks)
//   // - Or Unreachable code detected
//   // But because TypeScript understands that `fail` function returns `never`
//   // It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
//   return fail("Unexhaustive!");
// }

// function fail(message: string): never {
//   throw new Error(message);
// }

// This is builtin NonNullable type
// Exclude null and undefined from T
// let str: NonNullable<string | null>;

// // This is custom OwnNonNullable type
// // Exclude null and undefined from T
// type OwnNonNullable<T> = T extends null | undefined ? never : T;

// let var1: OwnNonNullable<number | string | null>; // type is >> let var1: string | number

// var1 = 5;
// var1 = "five";
// var1 = null; //TS_Error >> Type 'null' is not assignable to type 'string | number'.ts(2322)

// function logger(msg: string): never {
//   console.log("msg");
// }

// let voidVar: void;
// let neverVar: never;

// voidVar = undefined;
// neverVar = undefined; // TS_ERROR >> Type 'undefined' is not assignable to type 'never'.ts(2322)
