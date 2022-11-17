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

export const qtyPricHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.QTY_PRICE_HANDLER,
      payload: data,
   };
};

export const shippingInformationLoading = function (data) {
   return {
      type: INDEX_ACTION_TYPE.STORE_USER_SHIPPING_INFORMATION_LOADING,
      payload: data,
   };
};

export const orderLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.PLACE_USER_ORDER_LOADING,
      payload: data,
   };
};

export const removeUserOrderInformation = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_USER_ORDER_INFORMATION,
      payload: data,
   };
};

export const updateUserProfileLoading = function (data) {
   return {
      type: INDEX_ACTION_TYPE.UPDATE_USER_INFO_LOADING,
      payload: data,
   };
};

export const removeProfileUpdateInfo = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_PROFILE_UPDATE_INFO,
      payload: data,
   };
};

export const saveAddressLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.SAVE_USER_ADDRESS_LOADING,
      payload: data,
   };
};

export const removeAddressInformation = function () {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_SAVE_ADDRESS_INFO,
   };
};

export const removeUserAddressInfo = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_USER_ADDRESS_NOTIFICATION,
      payload: data,
   };
};

export const removeShippingInfo = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_SHIPPING_INFO,
      payload: data,
   };
};

export const userOrdersFetchLoading = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_USER_ALL_ORDERS_LOADING,
      payload: data,
   };
};

export const userOrderLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_SINGLE_ORDER_DETAILS_LOADING,
      payload: data,
   };
};

export const removeSingleOrder = function (data) {
   return {
      type: INDEX_ACTION_TYPE.REMOVE_SINGLE_ORDER_ITEM,
      payload: data,
   };
};

export const getCartItemsLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_CART_ITEMS_LOADING,
      payload: data,
   };
};

export const getRandomProductsLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_RANDOM_PRODUCTS_LOADING,
      payload: data,
   };
};

export const singlePageProductLoadingHandler = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_SINGLE_PRODUCT_LOADING,
      payload: data,
   };
};

export const productVariationLoading = function (data) {
   return {
      type: INDEX_ACTION_TYPE.GET_PRODUCT_VARIATION_DATA_LOADING,
      payload: data,
   };
};
