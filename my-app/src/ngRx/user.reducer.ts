import {createReducer, on} from '@ngrx/store';
import {
  PaginationInfoState,
  setPagination,
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


export const initialState: UserState = {
  isAuthorized: false,
  user: null,
  users: [],
  userById: null,
  pagination: null
};

export const userReducer = createReducer(
  initialState,
  on(userAuthorized, (state) => ({...state, isAuthorized: true})),
  on(userUnAuthorized, (state) => ({...state, isAuthorized: false})),
  on(setUser, (state, {user}) => ({...state, user})),
  on(setUserList, (state, {users}) => ({...state, users})),
  on(setUserById, (state, {userById}) => ({...state, userById})),
  on(setPagination, (state, {pagination}) => ({...state, pagination})),
);
