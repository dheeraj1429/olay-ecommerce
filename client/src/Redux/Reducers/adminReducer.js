import { ACTION_TYPE } from "../ActionTypes/actionType";

const INITAL_STATE = {
   productCategory: null,
   productCategoryLoading: false,
   productAllCategory: [],
   editCategory: false,
   selectedCategory: null,
   editCategoryLoading: false,
   updateCategory: null,
   brandInsert: null,
   brandInsertLoading: false,
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
         const findUpdateCategory = state.productAllCategory.allCategory.map((el) =>
            el._id === action.targetId
               ? {
                    ...el,
                    name: action.categoryName,
                    description: action.categoryDescription,
                 }
               : el
         );

         return {
            ...state,
            updateCategory: action.payload,
            editCategoryLoading: false,
            productAllCategory: {
               success: true,
               allCategory: findUpdateCategory,
            },
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

      case ACTION_TYPE.DELETE_SELECTED_CATEGORY:
         const filterCategory = state.productAllCategory.allCategory.filter(
            (el) => el._id !== action.payload
         );
         return {
            ...state,
            productAllCategory: {
               success: true,
               allCategory: filterCategory,
            },
            editCategory: false,
         };

      case ACTION_TYPE.INSERT_NEW_PRODUCT_BRAND_LOADING:
         return {
            ...state,
            brandInsertLoading: action.payload,
         };

      case ACTION_TYPE.INSERT_NEW_PRODUCT_BRAND:
         return {
            ...state,
            brandInsert: action.payload,
            brandInsertLoading: false,
         };

      case ACTION_TYPE.REMOVE_NEW_PRODUCT_BRAND_INFO:
         return {
            ...state,
            brandInsert: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default adminReducer;
