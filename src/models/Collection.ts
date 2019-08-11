import axios, { AxiosResponse } from "axios";
import { forEach, append } from "rambda";

import { Eventing } from "./Eventing";

class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const response = await axios.get(this.rootUrl);
    const getDataFrom = forEach((value: K) => {
      this.models = append(this.deserialize(value), this.models);
    });

    getDataFrom(response.data);
    this.trigger("change");
  }
}

export default Collection;
