import { User } from "./models/User";

const user = new User({ name: "Jose", age: 28 });

user.on("change", () => {});
user.on("change", () => {});
user.on("click", () => {});

console.log(user);
