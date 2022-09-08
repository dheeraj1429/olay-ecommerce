import { ACTION_TYPE } from "../ActionTypes/actionType";

const INITAL_STATE = {
   auth: null,
};

const authReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case ACTION_TYPE.ADMIN_SIGN_IN:
         return {
            ...state,
            auth: action.payload,
         };

      case ACTION_TYPE.SET_LOGIN_USER:
         return {
            ...state,
            auth: {
               success: true,
               userObject: action.payload,
            },
         };

      default:
         return {
            ...state,
         };
   }
};

export default authReducer;
