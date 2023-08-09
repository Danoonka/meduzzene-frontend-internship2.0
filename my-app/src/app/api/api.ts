import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {environment} from "src/environments/environments";
import {CompanyToCreate, userToEdit, UserToSignUp} from "../../ngRx/user.actions";


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

export const paginationForUsers = (page?: number, size?: number) => {
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

export const paginationForCompanies = (page?: number, size?: number) => {
    return instance.get(`/company/`, {
        params: {
            page: page,
            page_size: size
        }
    });
};

export const getCompanyById = (id: number) => {
    return instance.get(`/company/${id}/`);
};

export const createCompany = (company: CompanyToCreate) => {
    return instance.post('/company', {...company})
}

export const updateCompany = (id: number, company: CompanyToCreate) => {
    return instance.put(`/company/${id}/`, company)
}

export const deleteCompany = (id: number) => {
    return instance.delete(`/company/${id}/`);
}

export const inviteUser = (user_id: number, company_id: number) => {
    return instance.post(`/actions/invite-user/${company_id}/user/${user_id}/`)
}

export const declineAction = (action_id: number) => {
    return instance.delete(`/actions/decline-action/${action_id}/`)
}

export const acceptInvite = (action_id: number) => {
    return instance.put(`/actions/accept-invite/${action_id}/`)
}

export const sendRequest = (user_id: number, company_id: number) => {
    return instance.post(`/actions/request-company/${company_id}/user/${user_id}/`)
}

export const acceptRequest = (action_id: number) => {
    return instance.put(`/actions/accept-request/${action_id}/`)
}

export const getInvitesListForUser = (user_id: number) => {
    return instance.get(`/actions/user-invites-list/${user_id}`)
}

export const getInvitesListForCompany = (company_id: number) => {
    return instance.get(`/actions/company-invites-list/${company_id}/`)
}

export const getRequestListForUser = (user_id: number) => {
    return instance.get(`/actions/user-request-list/${user_id}`)
}

export const getRequestListForCompany = (company_id: number) => {
    return instance.get(`/actions/company-request-list/${company_id}`)
}

export const getAllUserCompanies = (user_id: number) => {
    return instance.get(`/actions/user-companies-list/${user_id}`)
}

export const getAllCompanyMembers = (company_id: number) => {
    return instance.get(`/actions/company-users-list/${company_id}`)
}

export const createAdmin = (action_id: number) => {
    return instance.post(`/actions/add-admin-role/${action_id}`)
}

export const deleteAdmin = (action_id: number)=>{
    return instance.put(`/actions/delete_admin/${action_id}`)
}

export const getAllAdmins = (company_id: number) => {
    return instance.get(`/actions/get-all-admins/company/${company_id}`)
}


