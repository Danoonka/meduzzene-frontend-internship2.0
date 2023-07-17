import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environments";


const instance: AxiosInstance = axios.create({
  baseURL: environment.apiURL,
  timeout: 10000,
} as AxiosRequestConfig);

export const healthCheck = () => {
    return instance.get('/')
}
