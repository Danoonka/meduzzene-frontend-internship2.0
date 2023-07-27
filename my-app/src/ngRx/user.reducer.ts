import {createReducer, on} from '@ngrx/store';
import {setUser, User, userAuthorized, userUnAuthorized} from './user.actions';

export interface UserState {
  isAuthorized: boolean;
  user: User | null;
}


export const initialState: UserState = {
  isAuthorized: false,
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(userAuthorized, (state) => ({...state, isAuthorized: true})),
  on(userUnAuthorized, (state) => ({...state, isAuthorized: false})),
  on(setUser, (state, {user}) => ({...state, user}))
);
