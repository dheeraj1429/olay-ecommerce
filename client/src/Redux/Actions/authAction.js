import { AUTH_ACTION_TYPE } from '../ActionTypes/authActionType';
import axios from 'axios';
import { headers } from '../../headers';

export const userLoginIn = function (data) {
   return async function (dispatch) {
      try {
         const adminSignInInfo = await axios.post('/auth/admin-sign-in', data, headers);

         if (adminSignInInfo && adminSignInInfo.data) {
            dispatch({
               type: AUTH_ACTION_TYPE.ADMIN_SIGN_IN,
               payload: adminSignInInfo && adminSignInInfo.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const signInUsers = function (data) {
   return async function (dispatch) {
      try {
         const signInResponse = await axios.post('/auth/signin', data, headers);

         if (signInResponse && signInResponse?.data && signInResponse?.data.success) {
            dispatch({
               type: AUTH_ACTION_TYPE.SIGN_IN_USERS,
               payload: signInResponse && signInResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
