import axios from "axios";
import { AxiosResponse } from "axios";

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  async fetch(id: number): Promise<AxiosResponse> {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): Promise<void> {
    const { id } = data;

    if (id) return axios.put(`${this.rootUrl}/${id}`, data);
    else return axios.post(this.rootUrl, data);
  }
}
