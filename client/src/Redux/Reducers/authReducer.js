import { AUTH_ACTION_TYPE } from '../ActionTypes/authActionType';

const INITAL_STATE = {
   auth: null,
   isLoading: false,
   userRoll: null,
};

const authReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case AUTH_ACTION_TYPE.ADMIN_SIGN_IN:
         return {
            ...state,
            auth: action.payload,
            isLoading: false,
            userRoll: action.payload?.userObject?.isAdmin ? action.payload.userObject.isAdmin : null,
         };

      case AUTH_ACTION_TYPE.REMOVE_USER_ROLL:
         return {
            ...state,
            userRoll: action.payload,
         };

      case AUTH_ACTION_TYPE.SET_LOGIN_USER:
         return {
            ...state,
            auth: {
               success: true,
               userObject: action.payload,
            },
         };

      case AUTH_ACTION_TYPE.REMOVE_USER:
         return {
            ...state,
            auth: action.payload,
         };

      case AUTH_ACTION_TYPE.USER_LOGIN_LODING:
         return {
            ...state,
            isLoading: action.payload,
         };

      case AUTH_ACTION_TYPE.SIGN_IN_USERS:
         return {
            ...state,
            auth: action.payload,
            isLoading: false,
         };

      case AUTH_ACTION_TYPE.SIGN_IN_USERS_LOADING:
         return {
            ...state,
            isLoading: action.payload,
         };

      case AUTH_ACTION_TYPE.AUTH_UPDATE_USER:
         return {
            ...state,
            auth: {
               ...state.auth,
               userObject: action.payload,
            },
         };

      case AUTH_ACTION_TYPE.LOG_OUT:
         return {
            ...state,
            auth: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default authReducer;
