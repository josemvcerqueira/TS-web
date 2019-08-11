import Collection from "./models/Collection";
import { User, UserProps } from "./models/User";
import UserList from "./views/UserList";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.build(json);
  }
);

users.on("change", () => {
  const root = document.querySelector("#root");

  if (root) {
    const userList = new UserList(root, users);
    userList.render();
  }
});

users.fetch();
