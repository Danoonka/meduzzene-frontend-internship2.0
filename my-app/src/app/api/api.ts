import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {environment} from "src/environments/environments";


export const instance: AxiosInstance = axios.create({
  baseURL: environment.apiURL,
  timeout: 10000,
} as AxiosRequestConfig);

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


export const healthCheck = () => {
  return instance.get('/')
}

export const logInUser = (email: string, password: string) => {
  return instance.post('/auth/login/', {
    user_email: email,
    user_password: password
  });
};

export const checkAuth = () => {
  return instance.get('/auth/me/');
};

export const SignUp = (email: string, password: string, firstname: string, lastname: string) => {
  return instance.post('/users/', {
    user_email: email,
    user_password: password,
    user_firstname: firstname,
    user_lastname: lastname
  })
};
