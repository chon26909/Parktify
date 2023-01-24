import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../services/auth";

axios.defaults.baseURL = "http://192.168.1.150:4000";

const onRequest = async (config: any) => {
  config.headers!.Authorization = "Bearer " + getToken();

  console.log("config ", config);

  return config;
};
const onRequestError = (err: AxiosError): Promise<AxiosError> => {
  return Promise.reject(err);
};
axios.interceptors.request.use(onRequest, onRequestError);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log("response interceptor ", response);

  return response.data;
};
const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  console.log("err response interceptor ", err);

  return Promise.reject(err);
};
axios.interceptors.response.use(onResponse, onResponseError);
