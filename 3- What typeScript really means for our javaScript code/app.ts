// function addNums(x: number, y: number): string {
//   return x + y;
// }

// interface Square {
//   width: number;
// }
// interface Rectangle extends Square {
//   height: number;
// }
// type Shape = Square | Rectangle;

// function calculateArea(shape: Shape) {
//   if (shape instanceof Rectangle) {
//     // TS_Error => 'Rectangle' only refers to a type, but is being used as a value here.ts(2693)
//     return shape.width * shape.height;
//     // TS_Error => Property 'height' does not exist on type 'Shape'.ts(2339)
//   } else {
//     return shape.width * shape.width;
//   }
// }

// function calculateArea(shape: Shape) {
//   if ("height" in shape) {
//     shape; // Type is Rectangle
//     return shape.width * shape.height;
//   } else {
//     shape; // Type is Square
//     return shape.width * shape.width;
//   }
// }

// interface Square {
//   kind: "square";
//   width: number;
// }
// interface Rectangle {
//   kind: "rectangle";
//   height: number;
//   width: number;
// }

// type Shape = Square | Rectangle;
// function calculateArea(shape: Shape) {
//   if (shape.kind === "rectangle") {
//     shape; // Type is Rectangle
//     return shape.width * shape.height;
//   } else {
//     shape; // Type is Square
//     return shape.width * shape.width;
//   }
// }

// class Square {
//   constructor(public width: number) {}
// }
// class Rectangle extends Square {
//   constructor(public width: number, public height: number) {
//     super(width);
//   }
// }
// type Shape = Square | Rectangle;
// function calculateArea(shape: Shape) {
//   if (shape instanceof Rectangle) {
//     shape; // Type is Rectangle
//     return shape.width * shape.height;
//   } else {
//     shape; // Type is Square
//     return shape.width * shape.width; // OK
//   }
// }

// function asNumber(val: number | string): number {
//   return val as number;
// }
function asNumber(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}
