import { ACTION_TYPE } from "../ActionTypes/actionType";

export const setLoginUser = function (data) {
   return {
      type: ACTION_TYPE.SET_LOGIN_USER,
      payload: data,
   };
};
