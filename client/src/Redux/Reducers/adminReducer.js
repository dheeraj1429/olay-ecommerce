import { ACTION_TYPE } from "../ActionTypes/actionType";

const INITAL_STATE = {
   productCategory: null,
   productCategoryLoading: false,
   productAllCategory: [],
   editCategory: false,
   selectedCategory: null,
   editCategoryLoading: false,
   updateCategory: null,
};

const adminReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case ACTION_TYPE.PRODUCT_CATEGORY_INSERT:
         return {
            ...state,
            productCategory: action.payload,
            productCategoryLoading: false,
         };

      case ACTION_TYPE.PRODUCT_CATEGORY_LOADING:
         return {
            ...state,
            productCategoryLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_CATEGORY_INFO:
         return {
            ...state,
            productCategory: action.payload,
         };

      case ACTION_TYPE.FETCH_PRODUCTS_CATEGORYS:
         return {
            ...state,
            productAllCategory: action.payload,
         };

      case ACTION_TYPE.INSERT_NEW_CATEGORY:
         return {
            ...state,
            productAllCategory: {
               ...state.productAllCategory,
               allCategory: state.productAllCategory.allCategory.concat(action.payload),
            },
         };

      case ACTION_TYPE.EDIT_CATEGORY:
         return {
            ...state,
            editCategory: action.payload,
         };

      case ACTION_TYPE.SELECTED_EDIT_CATEGORY:
         return {
            ...state,
            selectedCategory: action.payload,
         };

      case ACTION_TYPE.CATEGORY_UPDATE:
         return {
            ...state,
            updateCategory: action.payload,
            editCategoryLoading: false,
         };

      case ACTION_TYPE.CATEGORY_UPDATE_LOADING:
         return {
            ...state,
            editCategoryLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_CATEGORY_INFO_UPDATE:
         return {
            ...state,
            updateCategory: null,
         };

      default:
         return {
            ...state,
         };
   }
};

export default adminReducer;
