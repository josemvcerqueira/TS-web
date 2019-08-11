import Model from "./Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import Collection from "./Collection";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new ApiSync<UserProps>(rootUrl),
      new Eventing()
    );
  }

  static buildCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.build(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
