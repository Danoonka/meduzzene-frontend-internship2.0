import {createAction, props} from '@ngrx/store';
import {CompanyById, CompanyForList, CompanyToCreate, PaginationInfoState, User, UserForList} from "../app/types/types";


export const userAuthorized = createAction('[User] Authorized');
export const userUnAuthorized = createAction('[User] userUnAuthorized');
export const setUser = createAction('[User] Set User', props<{ user: User | null }>());
export const setUserList = createAction('[Users] Set Users List', props<{ users: UserForList[] }>())
export const setUserById = createAction('[User] Set User By Id', props<{ userById: User }>())
export const setUserPagination = createAction('pagination', props<{ pagination: PaginationInfoState }>())

export const setCompanyPagination =
    createAction('paginationForUsers for company', props<{ paginationCompany: PaginationInfoState }>())
export const setCompanyList =
    createAction('[Companies] Set Companies List', props<{ companies: CompanyForList[] }>())
export const setCompanyById = createAction('[Company] Set Company By Id', props<{ companyById: CompanyById }>())
export const setCompany = createAction('[Company] Set Company', props<{ company: CompanyToCreate | null }>());

export const setInvitesListForUser =
    createAction('[Actions] set invites for user', props<{ invitesForUser: CompanyForList[] }>())
export const setInvitesListForCompany =
    createAction('[Actions] set invites for company', props<{ invitesForCompany: UserForList[] }>())
export const setRequestsListForUser =
    createAction('[Actions] set requests for user', props<{ requestsForUser: CompanyForList[] }>())
export const setRequestsListForCompany =
    createAction('[Actions] set requests for company', props<{ requestsForCompany: UserForList[] }>())
export const setCompaniesListForUser =
    createAction('[Actions] set companies for user', props<{ companiesForUser: CompanyForList[] }>())
export const setUsersListForCompany =
    createAction('[Actions] set users for company', props<{ usersForCompany: UserForList[] }>())
export const setAdminsListForCompany =
    createAction('[Actions] set admins for company', props<{ adminsForCompany: UserForList[] }>())



