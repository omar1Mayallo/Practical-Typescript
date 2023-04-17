// function getSum(a, b) {
//   return a + b;
// }

function getSum(a: number, b: number) {
  return a + b;
}

declare const loggedInUsername: string;

const users = [
  {name: "Oby", age: 12},
  {name: "Heera", age: 32},
];
const loggedInUser = users.find((u) => u.name === loggedInUsername);

// typescript don't know if loggedInUser will be founded in users array or not

// if (loggedInUser) {
//   console.log(loggedInUser.age);
// }
// or
console.log(loggedInUser!.age);

const el = document.getElementById("status");
if (el) {
  el.textContent = "Ready"; // with if statement check el is found
}
// or
el!.textContent = "Ready"; // with assert it non-null with (!)
