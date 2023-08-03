import {createReducer, on} from '@ngrx/store';
import {
    CompanyById,
    CompanyForList, CompanyToCreate,
    PaginationInfoState, setCompany, setCompanyById, setCompanyList, setCompanyPagination,
    setUserPagination,
    setUser,
    setUserById,
    setUserList,
    User,
    userAuthorized,
    UserForList,
    userUnAuthorized
} from './user.actions';

export interface UserState {
    isAuthorized: boolean;
    user: User | null;
    users: UserForList[] | [];
    userById: User | null;
    pagination: PaginationInfoState | null

}

export interface CompanyState {
    paginationCompany: PaginationInfoState | null;
    companies: CompanyForList[] | [],
    companyById: CompanyById | null,
    company: CompanyToCreate | null
}


export const initialState: UserState = {
    isAuthorized: false,
    user: null,
    users: [],
    userById: null,
    pagination: null,
};

export const initialCompanyState: CompanyState = {
    paginationCompany: null,
    companies: [],
    companyById: null,
    company: null
}


export const userReducer = createReducer(
    initialState,
    on(userAuthorized, (state) => ({...state, isAuthorized: true})),
    on(userUnAuthorized, (state) => ({...state, isAuthorized: false})),
    on(setUser, (state, {user}) => ({...state, user})),
    on(setUserList, (state, {users}) => ({...state, users})),
    on(setUserById, (state, {userById}) => ({...state, userById})),
    on(setUserPagination, (state, {pagination}) => ({...state, pagination})),
);

export const companyReducer = createReducer(
    initialCompanyState,
    on(setCompanyPagination, (state, {paginationCompany}) => ({...state, paginationCompany})),
    on(setCompanyList, (state, {companies}) => ({...state, companies})),
    on(setCompanyById, (state, {companyById}) => ({...state, companyById})),
    on(setCompany, (state, {company}) => ({...state, company}))
)
