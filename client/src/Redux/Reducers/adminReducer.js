import { ACTION_TYPE } from "../ActionTypes/actionType";
import { CampareFunction } from "../../Filters/Filters";

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
   productBrands: null,
   loadingPagination: false,
   deleteOneBrandProduct: null,
   deleteSelectedBrand: null,
   selectedBrand: null,
   selectedBrandLoading: false,
   selectedBrandEdit: null,
   deleteAllBrands: null,
   allProductBrands: null,
   uploadProduct: null,
   uploadProductLoading: false,
   allProducts: null,
   productFetchLoading: false,
   selectedItems: [],
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
               ...state.productAllCategory,
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

      case ACTION_TYPE.FETCH_ALL_PRODUCT_BRAND:
         return {
            ...state,
            productBrands: action.payload,
            loadingPagination: false,
         };

      case ACTION_TYPE.LOADING_BRAND_PAGINATION:
         return {
            ...state,
            loadingPagination: action.payload,
         };

      case ACTION_TYPE.DELETE_ONE_PRODUCT_BRAND:
         const checkIsSuccess = function (status) {
            if (status.success) {
               return {
                  ...state.productBrands,
                  totalDocuments: state.productBrands.totalDocuments - 1,
                  brands: state.productBrands.brands.filter(
                     (el) => el._id !== action.selectedBrandId
                  ),
               };
            } else return state.productBrands;
         };

         return {
            ...state,
            deleteOneBrandProduct: action.payload,
            productBrands: checkIsSuccess(action.payload),
         };

      case ACTION_TYPE.DELETE_SELECTED_BRAND_PRODUCT:
         const setPayload = new Set(action.payload);

         if (action.payload) {
            return {
               ...state,
               productBrands: {
                  ...state.productBrands,
                  brands: state.productBrands.brands.filter(
                     (el) => (el._id = !setPayload.has(el._id))
                  ),
               },
            };
         } else {
            return {
               ...state,
               deleteSelectedBrand: action.message,
            };
         }

      case ACTION_TYPE.FETCH_SELECTED_BRAND_PRODUCT:
         return {
            ...state,
            selectedBrand: action.payload,
         };

      case ACTION_TYPE.EDIT_SELECTED_PRODUCT_BRAND:
         return {
            ...state,
            selectedBrandEdit: action.payload,
            selectedBrandLoading: false,
         };

      case ACTION_TYPE.UPDATE_EDIT_PRODUCT_BRAND_LOADING:
         return {
            ...state,
            selectedBrandLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_EDIT_PRODUCT_BRAND_INFO:
         return {
            ...state,
            selectedBrandEdit: action.payload,
         };

      case ACTION_TYPE.BULK_ACTIONS:
         if (action.payload.filde === "brands") {
            return {
               ...state,
               productBrands: {
                  ...state.productBrands,
                  brands: CampareFunction(
                     action.payload.filter,
                     state.productBrands,
                     "brands"
                  ),
               },
            };
         } else if (action.payload.filde === "products") {
            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: CampareFunction(
                     action.payload.filter,
                     state.allProducts,
                     "products"
                  ),
               },
            };
         }

      case ACTION_TYPE.DELTE_ALL_BRAND:
         if (action.payload.success) {
            return {
               ...state,
               productBrands: null,
            };
         } else {
            return {
               ...state,
               deleteAllBrands: action.payload,
            };
         }

      case ACTION_TYPE.FETCH_PRODUCTS_BRADN_INFO:
         return {
            ...state,
            allProductBrands: action.payload,
         };

      case ACTION_TYPE.UPLOAD_NEW_PRODUCT:
         return {
            ...state,
            uploadProduct: action.payload,
            uploadProductLoading: false,
         };

      case ACTION_TYPE.UPLOAD_PRODUCT_LOADING:
         return {
            ...state,
            uploadProductLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_INFO:
         return {
            ...state,
            uploadProduct: action.payload,
         };

      case ACTION_TYPE.FETCH_UPLODED_PRODUCTS:
         return {
            ...state,
            allProducts: action.payload,
         };

      case ACTION_TYPE.SELECTED_ITEMS_LIMIT:
         return {
            ...state,
            selectedItems: state.selectedItems.concat(action.payload),
         };

      case ACTION_TYPE.REMOVE_SELECTED_ITEMS:
         const checkItems = state.selectedItems.filter((el) => el !== action.payload);

         return {
            ...state,
            selectedItems: checkItems,
         };

      case ACTION_TYPE.REMOVE_ALL_SELECTED_ITEMS:
         return {
            ...state,
            selectedItems: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default adminReducer;
