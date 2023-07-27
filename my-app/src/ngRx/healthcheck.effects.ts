import {checkAuth, healthCheck, logInUser, SignUp} from "src/app/api/api"
import {Store} from '@ngrx/store';
import {setUser} from "./user.actions";


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

export const SignUpEffects = async (email: string, password: string, firstname: string, lastname: string) => {
  return await SignUp(email, password, firstname, lastname)
    .then(() => {
      return true
    })
    .catch(function (error) {
      console.log(error)
      return false;
    });
}
