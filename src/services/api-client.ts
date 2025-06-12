import axios, { type AxiosRequestConfig } from "axios";
import authStorage from "../auth/storage";

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface FetchResponse<T> {
  data: T[];
  pagination?: Pagination;
}

const axiosInstance = axios.create({
  baseURL: "https://portfolio-backend-duhc.onrender.com",
  // baseURL: "http://localhost:3000",
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

class APIClient<ResponseType> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<FetchResponse<ResponseType>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  get = async (id: number | string) => {
    const res = await axiosInstance.get<ResponseType>(`${this.endpoint}/${id}`);
    return res.data;
  };

  post = async <RequestType = any>(
    data: RequestType,
    config?: AxiosRequestConfig
  ) => {
    const res = await axiosInstance.post<ResponseType>(
      this.endpoint,
      data,
      config
    );
    return res.data;
  };

  delete = async (id: number | string) => {
    const res = await axiosInstance.delete(`${this.endpoint}/${id}`);
    return res.data;
  };

  deleteImage = async <RequestType = any>(
    data: RequestType,
    config?: AxiosRequestConfig
  ) => {
    const res = await axiosInstance.delete<ResponseType>(this.endpoint, {
      ...config,
      data,
    });
    return res.data;
  };
}

export default APIClient;
