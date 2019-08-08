import axios, { AxiosResponse } from "axios";
import { merge } from "rambda";

import { Eventing } from "./Eventing";

interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export class User {
  constructor(private data: UserProps) {}

  public events: Eventing = new Eventing();

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = merge(this.data, update);
  }

  async fetch(): Promise<void> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3000/users/${this.get("id")}`
    );
    this.set(response.data);
  }

  save(): void {
    const id = this.get("id");

    if (id) axios.put(`http://localhost:3000/users/${id}`, this.data);
    else axios.post(`http://localhost:3000/users/`, this.data);
  }
}
