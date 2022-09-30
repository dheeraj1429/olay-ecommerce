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
   deleteAllProductsStatus: null,
   deleteSelectedProductsInfo: [],
   fetchProductsLoading: false,
   productDeleteStatus: null,
   productEditLoading: false,
   singleProductFetch: null,
   productEditInfo: null,
   insertNewProductTag: null,
   productTagLoding: false,
   allProductsTags: null,
   fetchProductsTags: false,
   selectedProductTag: null,
   updateProductTagLoading: false,
   editProductEdit: null,
   allTags: null,
   productSwatches: null,
   productSwatchesLoading: false,
   allProductSwatches: null,
   singleProductSwatches: null,
   editProductSwatchesLoading: false,
   editProductSwatches: null,
   productSizeVariationInfo: null,
   productSizeVariationLoading: false,
   allSizeVariations: null,
   editSizeVariationLoading: false,
   editSizeVariationInfo: null,
   singleSizeVariation: null,
   productSubVariationInfo: null,
   productSubVariationLoading: false,
   fetchSingleSubVarition: null,
   editProductSingleVariationLoading: false,
   updateSingleSubVariation: null,
   deleteSubVaritionInfo: null,
   deleteSubVaritionLoading: false,
   selectedFlashSaleProducts: [],
   showFlashSaleComponent: false,
   storeSelectedProductSale: null,
   storeSelectedProductSaleLoading: false,
   allSales: null,
   allSaleLoading: false,
   singleFlashSale: null,
   updateFlashSale: null,
   updateFlashSaleLoading: false,
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
                  brands: CampareFunction(action.payload.filter, state.productBrands, "brands"),
               },
            };
         } else if (action.payload.filde === "products") {
            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: CampareFunction(action.payload.filter, state.allProducts, "products"),
               },
            };
         } else if (action.payload.filde === "tags") {
            return {
               ...state,
               allProductsTags: {
                  ...state.allProductsTags,
                  tags: CampareFunction(action.payload.filter, state.allProductsTags, "tags"),
               },
            };
         } else if (action.payload.filde === "allSwatches") {
            return {
               ...state,
               allProductSwatches: {
                  ...state.allProductSwatches,
                  allSwatches: CampareFunction(
                     action.payload.filter,
                     state.allProductSwatches,
                     "allSwatches"
                  ),
               },
            };
         } else if (action.payload.filde === "sizeVariations") {
            return {
               ...state,
               allSizeVariations: {
                  ...state.allSizeVariations,
                  sizeVariations: CampareFunction(
                     action.payload.filter,
                     state.allSizeVariations,
                     "sizeVariations"
                  ),
               },
            };
         } else if (action.payload.filde === "sales") {
            return {
               ...state,
               allSales: {
                  ...state.allSales,
                  sales: CampareFunction(action.payload.filter, state.allSales, "sales"),
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
            fetchProductsLoading: false,
         };

      case ACTION_TYPE.FETCH_LOADING_PRODUCTS:
         return {
            ...state,
            fetchProductsLoading: action.payload,
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

      case ACTION_TYPE.DELETE_ALL_PRODUCTS:
         if (action.payload.success) {
            return {
               ...state,
               allProducts: null,
               deleteAllProductsStatus: action.payload,
            };
         } else {
            return {
               ...state,
               deleteAllProductsStatus: action.payload,
            };
         }

      case ACTION_TYPE.REMOVE_ALL_SELECTED_ID:
         return {
            ...state,
            selectedItems: action.payload,
         };

      case ACTION_TYPE.DELETE_SELECTED_PRODUCTS:
         if (action?.productsId) {
            const setPayload = new Set(action.productsId);

            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: state.allProducts.products.filter(
                     (el) => (el._id = !setPayload.has(el._id))
                  ),
               },
            };
         } else {
            return {
               ...state,
               deleteSelectedProductsInfo: action.payload,
            };
         }

      case ACTION_TYPE.DELETE_ONE_PRODUCTS:
         let filterProduct;

         const checkIsDeleteFromDb = function (state, id) {
            filterProduct = state.allProducts.products.filter((el) => el._id !== id);

            return filterProduct;
         };

         if (action?.productsId) {
            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: checkIsDeleteFromDb(state, action.productsId),
               },
            };
         } else {
            return {
               ...state,
               productDeleteStatus: action.payload,
            };
         }

      case ACTION_TYPE.FETCH_SINGLE_PRODUCT:
         return {
            ...state,
            singleProductFetch: action.payload,
         };

      case ACTION_TYPE.EDIT_SINGLE_PRODUCT:
         return {
            ...state,
            productEditInfo: action.payload,
            productEditLoading: false,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_EDIT_INFO:
         return {
            ...state,
            productEditInfo: action.payload,
         };

      case ACTION_TYPE.EDIT_SINGLE_PRODUCT_LOADING:
         return {
            ...state,
            productEditLoading: action.payload,
         };

      case ACTION_TYPE.INSERT_NEW_PRODUCT_TAG:
         return {
            ...state,
            insertNewProductTag: action.payload,
            productTagLoding: false,
         };

      case ACTION_TYPE.PRODUCT_TAG_INSERT_LOADING:
         return {
            ...state,
            productTagLoding: action.payload,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_TAG_INFO:
         return {
            ...state,
            insertNewProductTag: action.payload,
         };

      case ACTION_TYPE.GET_ALL_PRODUCTS_TAGS:
         return {
            ...state,
            allProductsTags: action.payload,
            fetchProductsTags: false,
         };

      case ACTION_TYPE.PRODUCT_TAGS_LOADING:
         return {
            ...state,
            fetchProductsTags: action.payload,
         };

      case ACTION_TYPE.DELETE_ALL_TAGS:
         return {
            ...state,
            allProductsTags: { ...state.allProductsTags, tags: [] },
         };

      case ACTION_TYPE.DELETE_SELECTED_PRODUCT_TAG:
         return {
            ...state,
            allProductsTags: {
               ...state.allProductsTags,
               tags: state.allProductsTags.tags.filter((el) => el._id !== action.payload),
            },
         };

      case ACTION_TYPE.FETCH_SELECTED_PRODUCT_TAG:
         return {
            ...state,
            selectedProductTag: action.payload,
         };

      case ACTION_TYPE.EDIT_PRODUCT_TAG:
         return {
            ...state,
            editProductEdit: action.payload,
            updateProductTagLoading: false,
         };

      case ACTION_TYPE.EDIT_PRODUCT_TAG_LOADING:
         return {
            ...state,
            updateProductTagLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_TAG_EDTI_INFO:
         return {
            ...state,
            editProductEdit: action.payload,
         };

      case ACTION_TYPE.FETCH_ALL_PRODUCT_TAGS:
         return {
            ...state,
            allTags: action.payload,
         };

      case ACTION_TYPE.STORE_PRODUCT_SWATCHES:
         return {
            ...state,
            productSwatches: action.payload,
            productSwatchesLoading: false,
         };

      case ACTION_TYPE.STORE_PRODUCT_SWATCHES_LOADING:
         return {
            ...state,
            productSwatchesLoading: action.payload,
         };

      case ACTION_TYPE.PRODUCT_SWATCHES_REMOVE_INFO:
         return {
            ...state,
            productSwatches: action.payload,
         };

      case ACTION_TYPE.GET_PRODUCT_SWATCHES:
         return {
            ...state,
            allProductSwatches: action.payload,
            productSwatchesLoading: false,
         };

      case ACTION_TYPE.REMOVER_ALL_PRODUCT_SWATCHES:
         if (action.payload.success) {
            return {
               ...state,
               allProductSwatches: {
                  ...state.allProductSwatches,
                  allSwatches: [],
               },
            };
         }

      case ACTION_TYPE.FETCH_SINGLE_PRODUCT_SWATCHES:
         return {
            ...state,
            singleProductSwatches: action.payload,
         };

      case ACTION_TYPE.EDIT_SINGLE_PRODUCT_SWATCHES_LOADING:
         return {
            ...state,
            editProductSwatchesLoading: action.payload,
         };

      case ACTION_TYPE.EDIT_SINGLE_PRODUCT_SWATCHES:
         return {
            ...state,
            editProductSwatches: action.payload,
            editProductSwatchesLoading: false,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_UPDATE_SWATCHES_INFO:
         return {
            ...state,
            editProductSwatches: action.payload,
         };

      case ACTION_TYPE.DELETE_SELECTED_PRODUCT_SWATCHES:
         return {
            ...state,
            allProductSwatches: {
               ...state.allProductSwatches,
               allSwatches: state.allProductSwatches.allSwatches.filter(
                  (el) => el._id !== action.payload
               ),
            },
         };

      case ACTION_TYPE.UPLOD_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            productSizeVariationInfo: action.payload,
            productSizeVariationLoading: false,
         };

      case ACTION_TYPE.UPLOD_PRODUCT_SIZE_VARIATION_LOADING:
         return {
            ...state,
            productSizeVariationLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_UPLOD_PRODUCT_SIZE_VARIATION_INFO:
         return {
            ...state,
            productSizeVariationInfo: action.payload,
         };

      case ACTION_TYPE.GET_ALL_PRODUCTS_SIZE_VARIATIONS:
         return {
            ...state,
            allSizeVariations: action.payload,
         };

      case ACTION_TYPE.REMOVE_SINGLE_SIZE_VARIATION:
         return {
            ...state,
            allSizeVariations: {
               ...state.allSizeVariations,
               sizeVariations: state.allSizeVariations.sizeVariations.filter(
                  (el) => el._id !== action.payload
               ),
            },
         };

      case ACTION_TYPE.RMEOVE_ALL_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            allSizeVariations: {
               ...state.allSizeVariations,
               sizeVariations: [],
            },
         };

      case ACTION_TYPE.GET_SINGLE_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            singleSizeVariation: action.payload,
         };

      case ACTION_TYPE.EDIT_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            editSizeVariationInfo: action.payload,
            editSizeVariationLoading: false,
         };

      case ACTION_TYPE.EDIT_PRODUCT_SIZE_VARIATION_LOADING:
         return {
            ...state,
            editSizeVariationLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_EDIT_SIZE_VARIATION_INFO:
         return {
            ...state,
            editSizeVariationInfo: action.payload,
         };

      case ACTION_TYPE.INSERT_PRODUCT_SUB_VARIATION_LOADING:
         return {
            ...state,
            productSubVariationLoading: action.payload,
         };

      case ACTION_TYPE.INSERT_PRODUCT_SUB_VARIATION:
         return {
            ...state,
            productSubVariationInfo: action.payload,
            productSubVariationLoading: false,
         };

      case ACTION_TYPE.REMOVE_PRODUCT_SUB_INFO:
         return {
            ...state,
            productSubVariationInfo: action.payload,
         };

      case ACTION_TYPE.FETCH_SINGLE_SUBVARIATION:
         return {
            ...state,
            fetchSingleSubVarition: action.payload,
         };

      case ACTION_TYPE.UPDATE_SINGLE_SUB_VARIATION:
         return {
            ...state,
            updateSingleSubVariation: action.payload,
            editProductSingleVariationLoading: false,
         };

      case ACTION_TYPE.UPDATE_SINGLE_SUB_VARIATION_LOADING:
         return {
            ...state,
            editProductSingleVariationLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_UPDATE_SINGLE_SUB_VARIATION_INFO:
         return {
            ...state,
            updateSingleSubVariation: action.payload,
         };

      case ACTION_TYPE.REMOVE_SINGLE_PRODUCT_SUB_VARIATION_INFO:
         return {
            ...state,
            fetchSingleSubVarition: action.payload,
         };

      case ACTION_TYPE.DELETE_SINGLE_SUB_VARIATION:
         return {
            ...state,
            deleteSubVaritionInfo: action.payload,
            deleteSubVaritionLoading: false,
         };

      case ACTION_TYPE.DELETE_SINGLE_SUB_VARIATION_LOADING:
         return {
            ...state,
            deleteSubVaritionLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_DELTE_SUB_VARIATION_INFO:
         return {
            ...state,
            deleteSubVaritionInfo: null,
         };

      case ACTION_TYPE.STORE_SALE_SELECTED_PRODIUCT_INFO:
         const checkProductIsExists = function (state, data) {
            const check = state.find((el) => el.id === data.id);

            if (check) {
               return state;
            } else {
               return state.concat(data);
            }
         };

         return {
            ...state,
            selectedFlashSaleProducts: checkProductIsExists(
               state.selectedFlashSaleProducts,
               action.payload
            ),
         };

      case ACTION_TYPE.SHOW_FETCH_SALE_COLLECTION_COMPONENT:
         return {
            ...state,
            showFlashSaleComponent: action.payload,
         };

      case ACTION_TYPE.INSERT_FLASHSALE_COLLECTIONS:
         return {
            ...state,
            storeSelectedProductSale: action.payload,
            storeSelectedProductSaleLoading: false,
         };

      case ACTION_TYPE.INSERT_FLASHSALE_COLLECTIONS_LOADING:
         return {
            ...state,
            storeSelectedProductSaleLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_FLASHSALE_COLLECTIONS_INFO:
         return {
            ...state,
            storeSelectedProductSale: action.payload,
         };

      case ACTION_TYPE.GET_ALL_FLASH_SALE:
         return {
            ...state,
            allSales: action.payload,
            allSaleLoading: false,
         };

      case ACTION_TYPE.DELETE_ALL_FLASH_SALE:
         return {
            ...state,
            allSales: {
               ...state.allSales,
               sales: [],
            },
         };

      case ACTION_TYPE.DELTE_SINGLE_SALE:
         return {
            ...state,
            allSales: {
               ...state.allSales,
               sales: state.allSales.sales.filter((el) => el._id !== action.payload),
            },
         };

      case ACTION_TYPE.GET_ALL_FLASH_SALE_LOADING:
         return {
            ...state,
            allSaleLoading: action.payload,
         };

      case ACTION_TYPE.FETCH_SINGLE_FLASH_SALE:
         const checkFlashSaleExists = function () {
            let selectedFlashSaleArray = [];

            if (action.payload?.sale?.products && !!action.payload?.sale?.products) {
               action.payload.sale.products.map((el) => {
                  selectedFlashSaleArray.push({
                     productImage: el.productId.productImage,
                     name: el.productId.name,
                     id: el.productId._id,
                     quntity: el.quntity,
                     salePrice: el.salePrice,
                  });
               });
            }

            return selectedFlashSaleArray;
         };

         return {
            ...state,
            singleFlashSale: {
               sale: {
                  name: action.payload.sale.name,
                  statusInfo: action.payload.sale.statusInfo,
                  _id: action.payload.sale._id,
                  dateOfend: action.payload.sale.dateOfend,
               },
            },
            selectedFlashSaleProducts: checkFlashSaleExists(),
         };

      case ACTION_TYPE.REMOVE_SINGLE_FLASH_SALE:
         return {
            ...state,
            singleFlashSale: null,
            selectedFlashSaleProducts: [],
         };

      case ACTION_TYPE.UPDATE_SINGLE_FLASH_SALE:
         return {
            ...state,
            updateFlashSale: action.payload,
            updateFlashSaleLoading: false,
         };

      case ACTION_TYPE.UPDATE_SINGLE_FLASH_SALE_LOADING:
         return {
            ...state,
            updateFlashSaleLoading: action.payload,
         };

      case ACTION_TYPE.REMOVE_UPDATE_FLASH_SALE_INFO:
         return {
            ...state,
            updateFlashSale: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default adminReducer;
