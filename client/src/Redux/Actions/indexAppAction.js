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
