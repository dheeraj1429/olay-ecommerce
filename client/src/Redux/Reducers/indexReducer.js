import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';

const INITAL_STATE = {
   showCardSideBar: false,
   trandingProducts: null,
   trandingProductsLoading: false,
   trandingProductsError: false,
};

const shopReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case INDEX_ACTION_TYPE.SHOW_AND_HIDE_CART_SIDEBAR:
         return {
            ...state,
            showCardSideBar: action.payload,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS:
         return {
            ...state,
            trandingProducts: action.payload,
            trandingProductsLoading: false,
            trandingProductsError: false,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_ERROR:
         return {
            ...state,
            trandingProducts: null,
            trandingProductsLoading: false,
            trandingProductsError: action.payload,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_LOADING:
         return {
            ...state,
            trandingProductsLoading: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default shopReducer;
