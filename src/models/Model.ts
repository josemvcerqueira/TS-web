import { AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<AxiosResponse>;
  save(data: T): Promise<void>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface hasId {
  id?: number;
}

class Model<T extends hasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
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

export default Model;
