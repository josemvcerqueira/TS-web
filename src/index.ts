import UserForm from "./views/UserForm";
import { User } from "./models/User";

let userForm;

const root = document.querySelector("#root");
const user = User.build({ name: "NAME", age: 20 });

if (root) userForm = new UserForm(root, user);

userForm.render();
