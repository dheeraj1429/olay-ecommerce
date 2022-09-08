import { ACTION_TYPE } from "../ActionTypes/actionType";
import axios from "axios";
import { headers } from "./headers";

export const adminSignIn = function (data) {
   return async function (dispatch) {
      try {
         const adminSignInInfo = await axios.post("/admin/admin-sign-in", data, headers);

         if (adminSignInInfo && adminSignInInfo.data) {
            dispatch({
               type: ACTION_TYPE.ADMIN_SIGN_IN,
               payload: adminSignInInfo && adminSignInInfo.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
