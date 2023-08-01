import {createAction, props} from '@ngrx/store';

export interface User {
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_avatar: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
}

export interface UserForList {
  user_id: number;
  user_avatar: string;
  user_firstname: string;
  user_lastname: string;
}

export const initialCurrentUserState: User = {
  user_id: -1,
  user_email: '',
  user_firstname: '',
  user_lastname: '',
  user_avatar: '',
  user_status: '',
  user_city: '',
  user_phone: '',
  user_links: [
    ''
  ]
};

export interface userToEdit {
  user_firstname: string,
  user_lastname: string,
  user_avatar: string | null,
  user_status: string,
  user_city: string,
  user_phone: number
}

export interface PaginationInfoState {
  current_page: number,
  total_page: number,
  total_results: number
}

export interface UserToSignUp {
  user_email: string,
  user_password: string,
  user_firstname: string,
  user_lastname: string

}


export const userAuthorized = createAction('[User] Authorized');
export const userUnAuthorized = createAction('[User] userUnAuthorized');
export const setUser = createAction('[User] Set User', props<{ user: User | null }>());
export const setUserList = createAction('[Users] Set Users List', props<{ users: UserForList[] }>())
export const setUserById = createAction('[User] Set User By Id', props<{ userById: User }>())
export const setPagination = createAction('pagination', props<{ pagination: PaginationInfoState }>())
