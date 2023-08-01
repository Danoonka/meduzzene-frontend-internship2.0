import {
    checkAuth, createCompany, deleteCompany,
    deleteUser, getCompanyById,
    getUserById,
    healthCheck,
    logInUser,
    pagination, paginationForCompanies,
    SignUp, updateCompany,
    updateUserInfo, updateUserPassword
} from "src/app/api/api"
import {Store} from '@ngrx/store';
import {
    CompanyToCreate, setCompany,
    setCompanyById,
    setCompanyList,
    setCompanyPagination,
    setPagination,
    setUser,
    setUserById,
    setUserList,
    User,
    userToEdit,
    UserToSignUp
} from "./user.actions"


export const healthcheckEffects = () => {
    return healthCheck()
        .then(res => {
            console.log(res)
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const logInUserEffects = async (email: string, password: string) => {
    return await logInUser(email, password)
        .then(res => {
            localStorage.setItem('accessToken', res.data.result.access_token);
            return true;
        })
        .catch(function (error) {
            console.log(error)
            return false;
        });
}

export const checkAuthEffects = async (store: Store) => {
    console.log("in effect")
    return await checkAuth()
        .then((res) => {
            store.dispatch(setUser({user: res.data.result}));
            return true
        })
        .catch(function (error) {
            localStorage.removeItem('accessToken')
            console.log(error)
            return false
        });
}

export const SignUpEffects = async (user: UserToSignUp) => {
    return await SignUp(user)
        .then(() => {
            return true
        })
        .catch(function (error) {
            console.log(error)
            return false;
        });
}


export const paginationForUserListEffects = async (store: Store, page?: number, size?: number) => {
    return await pagination(page, size)
        .then(res => {
            store.dispatch(setUserList({users: res.data.result.users}));
            store.dispatch(setPagination({pagination: res.data.pagination}));
            return res.data;
        })
        .catch(function (error) {
            console.log(error)
        });
}


export const getUserByIdEffects = async (id: number, store: Store) => {
    return await getUserById(id)
        .then(res => {
            store.dispatch(setUserById({userById: res.data.result}))
            return res.data
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const updateUserInfoEffects = async (id: number, user: userToEdit, store: Store) => {
    return await updateUserInfo(id, user)
        .then((res) => {
            store.dispatch(setUser({user: res.data.result}))
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const updateUserPasswordEffects = async (id: number, password: string, new_password: string, store: Store) => {
    return await updateUserPassword(id, password, new_password)
        .then((res) => {
            store.dispatch(setUser({user: res.data.result}))
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const deleteUserEffects = async (id: number) => {
    return await deleteUser(id)
        .catch(function (error) {
            console.log(error)
        })
}

export const paginationForCompanyList =  async (store: Store, page?: number, size?: number) => {
    return await paginationForCompanies(page, size)
        .then(res => {
            console.log(res)
            store.dispatch(setCompanyList({companies: res.data.result.companies}));
            store.dispatch(setCompanyPagination({paginationCompany: res.data.pagination}));
            return res.data;
        })
        .catch(function (error) {
            console.log(error)
        });
}

export const getCompanyByIdEffects = async (id: number, store: Store) => {
    return await getCompanyById(id)
        .then(res => {
            store.dispatch(setCompanyById({companyById: res.data.result}))
            return res.data
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const CreateCompany = async (company: CompanyToCreate, store: Store) => {
    console.log(company)
    return await createCompany(company)
        .then((res) => {
            return true
        })
        .catch(function (error) {
            console.log(error)
            return false;
        });
}

export const updateCompanyInfoEffects = async (id: number, company: CompanyToCreate, store: Store) => {
    return await updateCompany(id, company)
        .then((res) => {
            store.dispatch(setCompany({company: res.data.result}))
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const deleteCompanyEffects = async (id: number) => {
    return await deleteCompany(id)
        .catch(function (error) {
            console.log(error)
        })
}