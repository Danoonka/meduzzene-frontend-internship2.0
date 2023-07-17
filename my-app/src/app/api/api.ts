import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import { Injectable } from '@angular/core';


const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
} as AxiosRequestConfig);

export const healthCheck = () => {
    return instance.get('/')
}
