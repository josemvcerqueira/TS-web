import { Sync } from "./Sync";
import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  async fetch(): Promise<void> {
    const id = this.get("id");

    if (typeof id !== "number") throw new Error("Cannot fetch without an id");

    const response = await this.sync.fetch(id);
    this.set(response.data);
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger("save");
    } catch (error) {
      this.trigger("error");
    }
  }
}
