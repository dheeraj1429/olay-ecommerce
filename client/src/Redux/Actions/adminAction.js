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

export const uploadProductCategory = function (data) {
   return async function (dispatch) {
      try {
         const productCategory = await axios.post("/admin/upload-category", data, headers);

         if (productCategory && productCategory?.data) {
            dispatch({
               type: ACTION_TYPE.PRODUCT_CATEGORY_INSERT,
               payload: productCategory && productCategory.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchProductsCategorys = function () {
   return async function (dispatch) {
      try {
         const categorys = await axios.get("/admin/get-all-categorys", headers);

         if (categorys && categorys?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_PRODUCTS_CATEGORYS,
               payload: categorys && categorys?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
