import { append, forEach, isEmpty } from "rambda";

type callback = () => void;

export class Eventing {
  // if you do not know the key of the {} that's how you do it
  events: { [key: string]: callback[] } = {};

  on = (eventName: string, cb: callback): void => {
    const handlers = this.events[eventName] || [];
    this.events[eventName] = append(cb, handlers);
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (isEmpty(handlers)) return;

    const fireCallbacks = forEach((cb: callback): void => cb());

    fireCallbacks(handlers);
  };
}
