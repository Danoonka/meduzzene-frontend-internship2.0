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


export const userAuthorized = createAction('[User] Authorized');
export const userUnAuthorized = createAction('[User] userUnAuthorized');
export const setUser = createAction('[User] Set User', props<{ user: User }>());
