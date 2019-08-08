import { merge, append } from "rambda";

interface UserProps {
  name?: string;
  age?: number;
}

type callback = () => void;

export class User {
  // if you do not know the key of the {} that's how you do it
  events: { [key: string]: callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = merge(this.data, update);
  }

  on(eventName: string, cb: callback): void {
    const handlers = this.events[eventName] || [];
    this.events[eventName] = append(cb, handlers);
  }
}
