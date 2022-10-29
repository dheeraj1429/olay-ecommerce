import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';

export const showAndHideCartSideBar = function (data) {
   return {
      type: INDEX_ACTION_TYPE.SHOW_AND_HIDE_CART_SIDEBAR,
      payload: data,
   };
};

export const trandingProductsLoading = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_LOADING,
      payload: data,
   };
};

export const productPrev = function (data) {
   return {
      type: INDEX_ACTION_TYPE.SHOW_PRODUCT_PREV,
      payload: data,
   };
};

export const loadingPrevSelectedProduct = function (data) {
   return {
      type: INDEX_ACTION_TYPE.SELECTED_PREV_PRODUCT_LOADING,
      payload: data,
   };
};

export const prevSelectedProduct = function () {
   return {
      type: INDEX_ACTION_TYPE.REMOVER_SELECTED_PRODUCT,
   };
};

export const addToCartLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.ADD_TO_CART_LOADING,
      payload: data,
   };
};

export const removeCartItemLoadingHandler = function (data, id) {
   return {
      type: INDEX_ACTION_TYPE.REMOVER_CART_ITEMS_LOADING,
      payload: data,
      productId: id,
   };
};

export const removeShowCartNotification = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_SHOW_CART_ITEM_NOTIFICATION,
      payload: data,
   };
};

export const newsLetterMailLadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.SEND_NEWS_LETTER_LOADING,
      payload: data,
   };
};
