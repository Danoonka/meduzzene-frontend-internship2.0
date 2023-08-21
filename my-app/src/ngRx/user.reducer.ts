import {createReducer, on} from '@ngrx/store';
import {
    setCompany,
    setCompanyById,
    setCompanyList,
    setCompanyPagination,
    setUserPagination,
    setUser,
    setUserById,
    setUserList,
    userAuthorized,
    userUnAuthorized,
    setInvitesListForUser,
    setInvitesListForCompany,
    setRequestsListForUser,
    setRequestsListForCompany,
    setUsersListForCompany, setCompaniesListForUser, setAdminsListForCompany
} from './user.actions';
import {CompanyById, CompanyForList, CompanyToCreate, PaginationInfoState, User, UserForList} from "../app/types/types";

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

export interface ActionState {
    invitesForUser: CompanyForList[] | [],
    invitesForCompany: UserForList[] | [],
    requestsForUser: CompanyForList[] | [],
    requestsForCompany: UserForList[] | [],
    companiesForUser: CompanyForList[] | [],
    usersForCompany: UserForList[] | []
    adminsForCompany: UserForList[] | []
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

export const initialActionState: ActionState = {
    invitesForUser: [],
    invitesForCompany: [],
    requestsForUser: [],
    requestsForCompany: [],
    companiesForUser: [],
    usersForCompany: [],
    adminsForCompany: []
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


export const actionReducer = createReducer(
    initialActionState,
    on(setInvitesListForUser, (state, {invitesForUser}) => ({...state, invitesForUser})),
    on(setInvitesListForCompany, (state, {invitesForCompany}) => ({...state, invitesForCompany})),
    on(setRequestsListForUser, (state, {requestsForUser}) => ({...state, requestsForUser})),
    on(setRequestsListForCompany, (state, {requestsForCompany}) => ({...state, requestsForCompany})),
    on(setCompaniesListForUser, (state, {companiesForUser}) => ({...state, companiesForUser})),
    on(setUsersListForCompany, (state, {usersForCompany}) => ({...state, usersForCompany})),
    on(setAdminsListForCompany, (state, {adminsForCompany}) => ({...state, adminsForCompany}))
)