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

export const editProductCategory = function (data) {
   return {
      type: ACTION_TYPE.EDIT_CATEGORY,
      payload: data,
   };
};

export const selectedCategory = function (data) {
   return {
      type: ACTION_TYPE.SELECTED_EDIT_CATEGORY,
      payload: data,
   };
};

export const categoryUpdateLoading = function (data) {
   return {
      type: ACTION_TYPE.CATEGORY_UPDATE_LOADING,
      payload: data,
   };
};

export const removeCategoryUpdateInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_CATEGORY_INFO_UPDATE,
      payload: data,
   };
};

export const brandLoading = function (data) {
   return {
      type: ACTION_TYPE.INSERT_NEW_PRODUCT_BRAND_LOADING,
      payload: data,
   };
};

export const removeBrandInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_NEW_PRODUCT_BRAND_INFO,
      payload: data,
   };
};

export const fetchBrandProductLoading = function (data) {
   return {
      type: ACTION_TYPE.LOADING_BRAND_PAGINATION,
      payload: data,
   };
};

export const selectedBrandProduct = function (data) {
   return {
      type: ACTION_TYPE.SELECTED_PRODUCT_BRAND,
      payload: data,
   };
};
