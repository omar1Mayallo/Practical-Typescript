// const x: any = {
//   a: "a-value",
//   b: "b-value",
// };

// console.log(x.c); // No Errors

// const x: unknown = {
//   a: "a-value",
//   b: "b-value",
// };

// console.log(x.c); // TS_ERROR >> 'x' is of type 'unknown'.ts(18046)

// let value: unknown;

// value = true; // OK
// value = 42; // OK
// value = "Hello World"; // OK
// value = []; // OK
// value = {}; // OK
// value = Math.random; // OK
// value = null; // OK
// value = undefined; // OK
// value = new TypeError(); // OK
// value = Symbol("type"); // OK
