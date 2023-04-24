// function logger(msg: string): undefined {
//   console.log(msg);
//   return;
// }
// function logger(msg: string): void {
//   console.log(msg);
// }

// let newVar: void;
// newVar = undefined;
// // newVar = "str" ;

// const readFileTitle = (src: string, callback: (title: string) => undefined) => {
//   // The implementation is not important.
// };
// const files = ["./file1.txt", "./file2.txt"];
// const titles = [];
// for (const file of files) {
//   readFileTitle(file, (title) => titles.push(title));
//   // Type 'number' is not assignable to type 'undefined'.ts(2322)
// }
const readFileTitle = (src: string, callback: (title: string) => void) => {
  // The implementation is not important.
};
const files = ["./file1.txt", "./file2.txt"];
const titles = [];
for (const file of files) {
  readFileTitle(file, (title) => titles.push(title));
  //No Error
}
