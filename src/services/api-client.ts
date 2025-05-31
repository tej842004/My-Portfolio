import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<T[]>(this.endpoint, config);
    return res.data;
  };

  get = async (id: number | string) => {
    const res = await axiosInstance.get<T>(this.endpoint + "/" + id);
    return res.data;
  };

  post = async (data: T, config?: AxiosRequestConfig) => {
    const res = await axiosInstance.post<T>(this.endpoint, data, config);
    return res.data;
  };
}

export default APIClient;
