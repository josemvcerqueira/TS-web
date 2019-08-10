import axios, { AxiosResponse } from "axios";
import { forEach, append } from "rambda";

import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";

class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const response = await axios.get(this.rootUrl);
    const getDataFrom = forEach((value: UserProps) => {
      const user = User.build(value);
      this.models = append(user, this.models);
    });

    getDataFrom(response.data);
    this.trigger("change");
  }
}

export default Collection;
