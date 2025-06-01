import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// class APIClient<T> {
//   endpoint: string;

//   constructor(endpoint: string) {
//     this.endpoint = endpoint;
//   }

//   getAll = async (config?: AxiosRequestConfig) => {
//     const res = await axiosInstance.get<T[]>(this.endpoint, config);
//     return res.data;
//   };

//   get = async (id: number | string) => {
//     const res = await axiosInstance.get<T>(this.endpoint + "/" + id);
//     return res.data;
//   };

//   post = async <T = any>(data: T, config?: AxiosRequestConfig) => {
//     const res = await axiosInstance.post<T>(this.endpoint, data, config);
//     return res.data;
//   };
// }

// export default APIClient;

class APIClient<ResponseType> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<ResponseType[]>(this.endpoint, config);
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
