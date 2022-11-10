import { AUTH_ACTION_TYPE } from '../ActionTypes/authActionType';

export const setLoginUser = function (data) {
   return {
      type: AUTH_ACTION_TYPE.SET_LOGIN_USER,
      payload: data,
   };
};

export const removeUser = function (data) {
   return {
      type: AUTH_ACTION_TYPE.REMOVE_USER,
      payload: data,
   };
};

export const userLoginLoging = function (data) {
   return {
      type: AUTH_ACTION_TYPE.USER_LOGIN_LODING,
      payload: data,
   };
};

export const userLoginLoadingHandler = function (data) {
   return {
      type: AUTH_ACTION_TYPE.SIGN_IN_USERS_LOADING,
      payload: data,
   };
};

export const logout = function (data) {
   return {
      type: AUTH_ACTION_TYPE.LOG_OUT,
      payload: data,
   };
};

export const removeUserRoll = function (data) {
   return {
      type: AUTH_ACTION_TYPE.REMOVE_USER_ROLL,
      payload: data,
   };
};
