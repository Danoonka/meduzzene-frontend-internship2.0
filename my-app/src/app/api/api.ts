import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {environment} from "src/environments/environments";
import {User, userToEdit, UserToSignUp} from "../../ngRx/user.actions";


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


export const SignUp = (user: UserToSignUp) => {
  return instance.post('/users/', {...user})
};

export const pagination = (page?: number, size?: number) => {
  return instance.get(`/users/`, {
    params: {
      page: page,
      page_size: size
    }
  });
};

export const getUserById = (id: number) => {
  return instance.get(`/users/${id}/`);
};

export const updateUserInfo = (id: number, user: userToEdit) => {
  return instance.put(`/users/${id}/`, user);
};

export const updateUserPassword = (id: number, password: string, new_password: string) => {
  return instance.put(`/users/${id}/password`, null, {
    params: {
      user_password: password,
      new_password: new_password,
    },
  });
};


export const deleteUser = (id: number) => {
  return instance.delete(`/users/${id}/`);
};


