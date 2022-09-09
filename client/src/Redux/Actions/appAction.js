import { ACTION_TYPE } from "../ActionTypes/actionType";

export const setLoginUser = function (data) {
   return {
      type: ACTION_TYPE.SET_LOGIN_USER,
      payload: data,
   };
};

export const removeUser = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_USER,
      payload: data,
   };
};

export const userLoginLoging = function (data) {
   return {
      type: ACTION_TYPE.USER_LOGIN_LODING,
      payload: data,
   };
};

export const productCategoryLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.PRODUCT_CATEGORY_LOADING,
      payload: data,
   };
};

export const removeCategoryInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_CATEGORY_INFO,
      payload: data,
   };
};

export const insertNewCategory = function (data) {
   return {
      type: ACTION_TYPE.INSERT_NEW_CATEGORY,
      payload: data,
   };
};
