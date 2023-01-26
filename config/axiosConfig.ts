import axios, { AxiosResponse, AxiosError } from "axios";
import { getToken } from "../services/auth";

axios.defaults.baseURL = "http://192.168.1.150:4000";

const onRequest = async (config: any) => {
  let token = "";

  await getToken().then((value) => {
    token = value ? String(value) : "";
  });

  config.headers["Authorization"] = "Bearer " + token;

  return config;
};
const onRequestError = (err: AxiosError): Promise<AxiosError> => {
  return Promise.reject(err);
};
axios.interceptors.request.use(onRequest, onRequestError);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.log("response interceptor ", response);

  return response.data;
};
const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  // console.log("err response interceptor ", err);

  return Promise.reject(err);
};
axios.interceptors.response.use(onResponse, onResponseError);
