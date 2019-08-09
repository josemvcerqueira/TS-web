import { merge } from "rambda";

export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => this.data[key];

  set(update: T): void {
    this.data = merge(this.data, update);
  }
}
