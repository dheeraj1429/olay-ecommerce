import { ADMIN_ACTION_TYPES } from '../ActionTypes/adminActionType';
import { CampareFunction } from '../../Filters/Filters';

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
   newLabelInfo: null,
   newLabelInfoLoading: false,
   allProductLabel: null,
   singleProductLabel: null,
   updateProductLabelInfo: null,
   updateProductLabelLoading: false,
   adminExportHistory: null,
   adminExportHistoryLoading: false,
   exportLoading: false,
   hideEmailBox: false,
   sendMailLoading: false,
   mailInfo: null,
   downloadTemplateLoading: false,
   importCsvLoading: false,
   importCsvInfo: null,
   showProductUploadInfoComponent: false,
   productGenralReport: null,
   productGenralReportLoading: false,
   totalSignInUserReport: null,
   shopSettingRespose: null,
   shopSettingLoading: false,
   shopInformation: null,
   showCreateStoreInfomationComponent: false,
   shopInformationStore: null,
   shopInformationStoreLoading: false,
   allShops: null,
   selectedShopInfo: null,
   updateShopInformation: null,
   blogInfo: null,
   blogInfoLoading: false,
   allBlogs: null,
   fetchBlogLoading: false,
   singleBlogPost: null,
   insertBlogPostCategoriesInfo: null,
   insertBlogPostCategoriesLoading: false,
   insertBlogPostCategoriesError: null,
   blogCategories: null,
   selectedBlogCategory: null,
   allOrders: null,
   userOrderInvoiceLoading: {
      loading: false,
      id: null,
   },
   showOrderPreviewComponent: {
      show: false,
      id: null,
   },
   orderFullInfo: null,
   orderFullInfoLoading: false,
};

const adminReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case ADMIN_ACTION_TYPES.PRODUCT_CATEGORY_INSERT:
         return {
            ...state,
            productCategory: action.payload,
            productCategoryLoading: false,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_CATEGORY_LOADING:
         return {
            ...state,
            productCategoryLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_CATEGORY_INFO:
         return {
            ...state,
            productCategory: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_PRODUCTS_CATEGORYS:
         return {
            ...state,
            productAllCategory: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_CATEGORY:
         return {
            ...state,
            productAllCategory: {
               ...state.productAllCategory,
               allCategory: state.productAllCategory.allCategory.concat(action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.EDIT_CATEGORY:
         return {
            ...state,
            editCategory: action.payload,
         };

      case ADMIN_ACTION_TYPES.SELECTED_EDIT_CATEGORY:
         return {
            ...state,
            selectedCategory: action.payload,
         };

      case ADMIN_ACTION_TYPES.CATEGORY_UPDATE:
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

      case ADMIN_ACTION_TYPES.CATEGORY_UPDATE_LOADING:
         return {
            ...state,
            editCategoryLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_CATEGORY_INFO_UPDATE:
         return {
            ...state,
            updateCategory: null,
         };

      case ADMIN_ACTION_TYPES.DELETE_SELECTED_CATEGORY:
         const filterCategory = state.productAllCategory.allCategory.filter((el) => el._id !== action.payload);
         return {
            ...state,
            productAllCategory: {
               ...state.productAllCategory,
               allCategory: filterCategory,
            },
            editCategory: false,
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_BRAND_LOADING:
         return {
            ...state,
            brandInsertLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_BRAND:
         return {
            ...state,
            brandInsert: action.payload,
            brandInsertLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_NEW_PRODUCT_BRAND_INFO:
         return {
            ...state,
            brandInsert: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_ALL_PRODUCT_BRAND:
         return {
            ...state,
            productBrands: action.payload,
            loadingPagination: false,
         };

      case ADMIN_ACTION_TYPES.LOADING_BRAND_PAGINATION:
         return {
            ...state,
            loadingPagination: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_ONE_PRODUCT_BRAND:
         const checkIsSuccess = function (status) {
            if (status.success) {
               return {
                  ...state.productBrands,
                  totalDocuments: state.productBrands.totalDocuments - 1,
                  brands: state.productBrands.brands.filter((el) => el._id !== action.selectedBrandId),
               };
            } else return state.productBrands;
         };

         return {
            ...state,
            deleteOneBrandProduct: action.payload,
            productBrands: checkIsSuccess(action.payload),
         };

      case ADMIN_ACTION_TYPES.DELETE_SELECTED_BRAND_PRODUCT:
         const setPayload = new Set(action.payload);

         if (action.payload) {
            return {
               ...state,
               productBrands: {
                  ...state.productBrands,
                  brands: state.productBrands.brands.filter((el) => (el._id = !setPayload.has(el._id))),
               },
            };
         } else {
            return {
               ...state,
               deleteSelectedBrand: action.message,
            };
         }

      case ADMIN_ACTION_TYPES.FETCH_SELECTED_BRAND_PRODUCT:
         return {
            ...state,
            selectedBrand: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_SELECTED_PRODUCT_BRAND:
         return {
            ...state,
            selectedBrandEdit: action.payload,
            selectedBrandLoading: false,
         };

      case ADMIN_ACTION_TYPES.UPDATE_EDIT_PRODUCT_BRAND_LOADING:
         return {
            ...state,
            selectedBrandLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_EDIT_PRODUCT_BRAND_INFO:
         return {
            ...state,
            selectedBrandEdit: action.payload,
         };

      case ADMIN_ACTION_TYPES.BULK_ACTIONS:
         // const actionArr = [
         //    { field: 'brands', collection: 'productBrands' },
         //    { field: 'products', collection: 'allProducts' },
         //    { field: 'tags', collection: 'allProductsTags' },
         //    { field: 'allSwatches', collection: 'allProductSwatches' },
         //    { field: 'sizeVariations', collection: 'allSizeVariations' },
         //    { field: 'sales', collection: 'allSales' },
         //    { field: 'allLabels', collection: 'allProductLabel' },
         //    { field: 'posts', collection: 'allBlogs' },
         // ];

         // actionArr.forEach((el) => {
         //    if (el.field === action.payload.filde) {
         //       return {
         //          ...state,
         //          [el.collection]: {
         //             ...state[el.collection],
         //             [el.field]: CampareFunction(action.payload.filter, state[el.collection], el.field),
         //          },
         //       };
         //    }
         // });

         if (action.payload.filde === 'brands') {
            return {
               ...state,
               productBrands: {
                  ...state.productBrands,
                  brands: CampareFunction(action.payload.filter, state.productBrands, 'brands'),
               },
            };
         } else if (action.payload.filde === 'products') {
            console.log(action.payload.filde);

            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: CampareFunction(action.payload.filter, state.allProducts, 'products'),
               },
            };
         } else if (action.payload.filde === 'tags') {
            return {
               ...state,
               allProductsTags: {
                  ...state.allProductsTags,
                  tags: CampareFunction(action.payload.filter, state.allProductsTags, 'tags'),
               },
            };
         } else if (action.payload.filde === 'allSwatches') {
            return {
               ...state,
               allProductSwatches: {
                  ...state.allProductSwatches,
                  allSwatches: CampareFunction(action.payload.filter, state.allProductSwatches, 'allSwatches'),
               },
            };
         } else if (action.payload.filde === 'sizeVariations') {
            return {
               ...state,
               allSizeVariations: {
                  ...state.allSizeVariations,
                  sizeVariations: CampareFunction(action.payload.filter, state.allSizeVariations, 'sizeVariations'),
               },
            };
         } else if (action.payload.filde === 'sales') {
            return {
               ...state,
               allSales: {
                  ...state.allSales,
                  sales: CampareFunction(action.payload.filter, state.allSales, 'sales'),
               },
            };
         } else if (action.payload.filde === 'allLabels') {
            return {
               ...state,
               allProductLabel: {
                  ...state.allProductLabel,
                  allLabels: CampareFunction(action.payload.filter, state.allProductLabel, 'allLabels'),
               },
            };
         } else if (action.payload.filde === 'posts') {
            return {
               ...state,
               allBlogs: {
                  ...state.allBlogs,
                  posts: CampareFunction(action.payload.filter, state.allBlogs, 'posts'),
               },
            };
         }

      case ADMIN_ACTION_TYPES.DELTE_ALL_BRAND:
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

      case ADMIN_ACTION_TYPES.FETCH_PRODUCTS_BRADN_INFO:
         return {
            ...state,
            allProductBrands: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPLOAD_NEW_PRODUCT:
         return {
            ...state,
            uploadProduct: action.payload,
            uploadProductLoading: false,
         };

      case ADMIN_ACTION_TYPES.UPLOAD_PRODUCT_LOADING:
         return {
            ...state,
            uploadProductLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_INFO:
         return {
            ...state,
            uploadProduct: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_UPLODED_PRODUCTS:
         return {
            ...state,
            allProducts: action.payload,
            fetchProductsLoading: false,
         };

      case ADMIN_ACTION_TYPES.FETCH_LOADING_PRODUCTS:
         return {
            ...state,
            fetchProductsLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.SELECTED_ITEMS_LIMIT:
         return {
            ...state,
            selectedItems: state.selectedItems.concat(action.payload),
         };

      case ADMIN_ACTION_TYPES.REMOVE_SELECTED_ITEMS:
         const checkItems = state.selectedItems.filter((el) => el !== action.payload);

         return {
            ...state,
            selectedItems: checkItems,
         };

      case ADMIN_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS:
         return {
            ...state,
            selectedItems: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_ALL_PRODUCTS:
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

      case ADMIN_ACTION_TYPES.REMOVE_ALL_SELECTED_ID:
         return {
            ...state,
            selectedItems: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_SELECTED_PRODUCTS:
         if (action?.productsId) {
            const setPayload = new Set(action.productsId);

            return {
               ...state,
               allProducts: {
                  ...state.allProducts,
                  products: state.allProducts.products.filter((el) => (el._id = !setPayload.has(el._id))),
               },
            };
         } else {
            return {
               ...state,
               deleteSelectedProductsInfo: action.payload,
            };
         }

      case ADMIN_ACTION_TYPES.DELETE_ONE_PRODUCTS:
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

      case ADMIN_ACTION_TYPES.FETCH_SINGLE_PRODUCT:
         return {
            ...state,
            singleProductFetch: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT:
         return {
            ...state,
            productEditInfo: action.payload,
            productEditLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_EDIT_INFO:
         return {
            ...state,
            productEditInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT_LOADING:
         return {
            ...state,
            productEditLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_TAG:
         return {
            ...state,
            insertNewProductTag: action.payload,
            productTagLoding: false,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_TAG_INSERT_LOADING:
         return {
            ...state,
            productTagLoding: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_TAG_INFO:
         return {
            ...state,
            insertNewProductTag: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_PRODUCTS_TAGS:
         return {
            ...state,
            allProductsTags: action.payload,
            fetchProductsTags: false,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_TAGS_LOADING:
         return {
            ...state,
            fetchProductsTags: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_ALL_TAGS:
         return {
            ...state,
            allProductsTags: { ...state.allProductsTags, tags: [] },
         };

      case ADMIN_ACTION_TYPES.DELETE_SELECTED_PRODUCT_TAG:
         return {
            ...state,
            allProductsTags: {
               ...state.allProductsTags,
               tags: state.allProductsTags.tags.filter((el) => el._id !== action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.FETCH_SELECTED_PRODUCT_TAG:
         return {
            ...state,
            selectedProductTag: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_PRODUCT_TAG:
         return {
            ...state,
            editProductEdit: action.payload,
            updateProductTagLoading: false,
         };

      case ADMIN_ACTION_TYPES.EDIT_PRODUCT_TAG_LOADING:
         return {
            ...state,
            updateProductTagLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_TAG_EDTI_INFO:
         return {
            ...state,
            editProductEdit: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_ALL_PRODUCT_TAGS:
         return {
            ...state,
            allTags: action.payload,
         };

      case ADMIN_ACTION_TYPES.STORE_PRODUCT_SWATCHES:
         return {
            ...state,
            productSwatches: action.payload,
            productSwatchesLoading: false,
         };

      case ADMIN_ACTION_TYPES.STORE_PRODUCT_SWATCHES_LOADING:
         return {
            ...state,
            productSwatchesLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_SWATCHES_REMOVE_INFO:
         return {
            ...state,
            productSwatches: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_PRODUCT_SWATCHES:
         return {
            ...state,
            allProductSwatches: action.payload,
            productSwatchesLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVER_ALL_PRODUCT_SWATCHES:
         if (action.payload.success) {
            return {
               ...state,
               allProductSwatches: {
                  ...state.allProductSwatches,
                  allSwatches: [],
               },
            };
         }

      case ADMIN_ACTION_TYPES.FETCH_SINGLE_PRODUCT_SWATCHES:
         return {
            ...state,
            singleProductSwatches: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT_SWATCHES_LOADING:
         return {
            ...state,
            editProductSwatchesLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT_SWATCHES:
         return {
            ...state,
            editProductSwatches: action.payload,
            editProductSwatchesLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_UPDATE_SWATCHES_INFO:
         return {
            ...state,
            editProductSwatches: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_SELECTED_PRODUCT_SWATCHES:
         return {
            ...state,
            allProductSwatches: {
               ...state.allProductSwatches,
               allSwatches: state.allProductSwatches.allSwatches.filter((el) => el._id !== action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.UPLOD_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            productSizeVariationInfo: action.payload,
            productSizeVariationLoading: false,
         };

      case ADMIN_ACTION_TYPES.UPLOD_PRODUCT_SIZE_VARIATION_LOADING:
         return {
            ...state,
            productSizeVariationLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_UPLOD_PRODUCT_SIZE_VARIATION_INFO:
         return {
            ...state,
            productSizeVariationInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_PRODUCTS_SIZE_VARIATIONS:
         return {
            ...state,
            allSizeVariations: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_SINGLE_SIZE_VARIATION:
         return {
            ...state,
            allSizeVariations: {
               ...state.allSizeVariations,
               sizeVariations: state.allSizeVariations.sizeVariations.filter((el) => el._id !== action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.RMEOVE_ALL_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            allSizeVariations: {
               ...state.allSizeVariations,
               sizeVariations: [],
            },
         };

      case ADMIN_ACTION_TYPES.GET_SINGLE_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            singleSizeVariation: action.payload,
         };

      case ADMIN_ACTION_TYPES.EDIT_PRODUCT_SIZE_VARIATION:
         return {
            ...state,
            editSizeVariationInfo: action.payload,
            editSizeVariationLoading: false,
         };

      case ADMIN_ACTION_TYPES.EDIT_PRODUCT_SIZE_VARIATION_LOADING:
         return {
            ...state,
            editSizeVariationLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_EDIT_SIZE_VARIATION_INFO:
         return {
            ...state,
            editSizeVariationInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_PRODUCT_SUB_VARIATION_LOADING:
         return {
            ...state,
            productSubVariationLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_PRODUCT_SUB_VARIATION:
         return {
            ...state,
            productSubVariationInfo: action.payload,
            productSubVariationLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_PRODUCT_SUB_INFO:
         return {
            ...state,
            productSubVariationInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_SINGLE_SUBVARIATION:
         return {
            ...state,
            fetchSingleSubVarition: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SINGLE_SUB_VARIATION:
         return {
            ...state,
            updateSingleSubVariation: action.payload,
            editProductSingleVariationLoading: false,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SINGLE_SUB_VARIATION_LOADING:
         return {
            ...state,
            editProductSingleVariationLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_UPDATE_SINGLE_SUB_VARIATION_INFO:
         return {
            ...state,
            updateSingleSubVariation: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_SINGLE_PRODUCT_SUB_VARIATION_INFO:
         return {
            ...state,
            fetchSingleSubVarition: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_SINGLE_SUB_VARIATION:
         return {
            ...state,
            deleteSubVaritionInfo: action.payload,
            deleteSubVaritionLoading: false,
         };

      case ADMIN_ACTION_TYPES.DELETE_SINGLE_SUB_VARIATION_LOADING:
         return {
            ...state,
            deleteSubVaritionLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_DELTE_SUB_VARIATION_INFO:
         return {
            ...state,
            deleteSubVaritionInfo: null,
         };

      case ADMIN_ACTION_TYPES.STORE_SALE_SELECTED_PRODIUCT_INFO:
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
            selectedFlashSaleProducts: checkProductIsExists(state.selectedFlashSaleProducts, action.payload),
         };

      case ADMIN_ACTION_TYPES.SHOW_FETCH_SALE_COLLECTION_COMPONENT:
         return {
            ...state,
            showFlashSaleComponent: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_FLASHSALE_COLLECTIONS:
         return {
            ...state,
            storeSelectedProductSale: action.payload,
            storeSelectedProductSaleLoading: false,
         };

      case ADMIN_ACTION_TYPES.INSERT_FLASHSALE_COLLECTIONS_LOADING:
         return {
            ...state,
            storeSelectedProductSaleLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_FLASHSALE_COLLECTIONS_INFO:
         return {
            ...state,
            storeSelectedProductSale: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_FLASH_SALE:
         return {
            ...state,
            allSales: action.payload,
            allSaleLoading: false,
         };

      case ADMIN_ACTION_TYPES.DELETE_ALL_FLASH_SALE:
         return {
            ...state,
            allSales: {
               ...state.allSales,
               sales: [],
            },
         };

      case ADMIN_ACTION_TYPES.DELTE_SINGLE_SALE:
         return {
            ...state,
            allSales: {
               ...state.allSales,
               sales: state.allSales.sales.filter((el) => el._id !== action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.GET_ALL_FLASH_SALE_LOADING:
         return {
            ...state,
            allSaleLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_SINGLE_FLASH_SALE:
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
                  dateOfStart: action.payload.sale.dateOfStart,
                  dateOfStartTime: action.payload.sale.dateOfStartTime,
                  dateOfEndTime: action.payload.sale.dateOfEndTime,
                  dateOfend: action.payload.sale.dateOfend,
                  label: action.payload?.sale?.label ? action.payload.sale.label : null,
               },
            },
            selectedFlashSaleProducts: checkFlashSaleExists(),
         };

      case ADMIN_ACTION_TYPES.REMOVE_SINGLE_FLASH_SALE:
         return {
            ...state,
            singleFlashSale: null,
            selectedFlashSaleProducts: [],
         };

      case ADMIN_ACTION_TYPES.UPDATE_SINGLE_FLASH_SALE:
         return {
            ...state,
            updateFlashSale: action.payload,
            updateFlashSaleLoading: false,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SINGLE_FLASH_SALE_LOADING:
         return {
            ...state,
            updateFlashSaleLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_UPDATE_FLASH_SALE_INFO:
         return {
            ...state,
            updateFlashSale: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_FLASH_SALE_PRODUCTS:
         return {
            ...state,
            selectedFlashSaleProducts: state.selectedFlashSaleProducts.filter((el) => el.id !== action.payload),
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_COLOR_LABEL:
         return {
            ...state,
            newLabelInfo: action.payload,
            newLabelInfoLoading: false,
         };

      case ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_COLOR_LABEL_LOADING:
         return {
            ...state,
            newLabelInfoLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVER_INSERT_PRODUCT_LABEL_INFO:
         return {
            ...state,
            newLabelInfo: action.payload,
            updateProductLabelInfo: action.payload,
            singleProductLabel: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_PRODUCT_LABEL:
         return {
            ...state,
            allProductLabel: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_ALL_PRODUCTS_LABELS:
         return {
            ...state,
            allProductLabel: {
               ...state.allProductLabel,
               allLabels: [],
            },
         };

      case ADMIN_ACTION_TYPES.DELETE_SINGLE_PRODUCT_LABEL:
         console.log(action.payload);

         return {
            ...state,
            allProductLabel: {
               ...state.allProductLabel,
               allLabels: state.allProductLabel.allLabels.filter((el) => el._id !== action.payload),
            },
         };

      case ADMIN_ACTION_TYPES.GET_SINGLE_PRODUCT_LABEL:
         return {
            ...state,
            singleProductLabel: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVER_INSERT_PRODUCT_LABEL_INFO:
         return {
            ...state,
            singleProductLabel: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_PRODUCT_LABEL_LOADING:
         return {
            ...state,
            updateProductLabelLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_PRODUCT_LABEL:
         return {
            ...state,
            updateProductLabelInfo: action.payload,
            updateProductLabelLoading: false,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_EXPORT_INFO:
         return {
            ...state,
            adminExportHistory: action.payload,
            adminExportHistoryLoading: false,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_EXPORT_INFO_LOADING:
         return {
            ...state,
            adminExportHistoryLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_SINGLE_EXPORT_PRODUCT_HISTORY:
         return {
            ...state,
            adminExportHistory: {
               ...state.adminExportHistory,
               history: {
                  ...state.adminExportHistory.history,
                  exportsHistory: state.adminExportHistory.history.exportsHistory.filter((el) => el._id !== action.payload),
               },
            },
         };

      case ADMIN_ACTION_TYPES.EXPORT_LOADING:
         return {
            ...state,
            exportLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.HIDE_EMAIL_BOX:
         return {
            ...state,
            hideEmailBox: action.payload,
         };

      case ADMIN_ACTION_TYPES.SEND_MAIL_LOADING:
         return {
            ...state,
            sendMailLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.SEND_MAIL:
         return {
            ...state,
            mailInfo: action.payload,
            sendMailLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_MAIL_INFO:
         return {
            ...state,
            mailInfo: action.payload,
            sendMailLoading: false,
         };

      case ADMIN_ACTION_TYPES.DOWNLOAD_CSV_IMPORT_TEMPLATE:
         return {
            ...state,
            downloadTemplateLoading: false,
         };

      case ADMIN_ACTION_TYPES.DOWNLOAD_CSV_IMPORT_TEMPLATE_LOADING:
         return {
            ...state,
            downloadTemplateLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.IMPORT_CSV_INFO:
         return {
            ...state,
            importCsvLoading: false,
            importCsvInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_CSV_INFO:
         return {
            ...state,
            importCsvInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.IMPORT_CSV_LOADING:
         return {
            ...state,
            importCsvLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.SHOW_PRODUCT_UPLOAD_INFO_COMPONENT:
         return {
            ...state,
            showProductUploadInfoComponent: action.payload,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_GET_GENRNAL_REPORT:
         return {
            ...state,
            productGenralReport: action.payload,
            productGenralReportLoading: false,
         };

      case ADMIN_ACTION_TYPES.PRODUCT_GET_GENRNAL_REPORT_LOADING:
         return {
            ...state,
            productGenralReportLoading: action.payload,
            productGenralReport: null,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_SIGNIN_USERS:
         return {
            ...state,
            totalSignInUserReport: action.payload,
         };

      case ADMIN_ACTION_TYPES.SHOP_INFORMATION:
         return {
            ...state,
            shopSettingRespose: action.payload,
            shopSettingLoading: false,
         };

      case ADMIN_ACTION_TYPES.SHOP_INFORMATION_LOADING:
         return {
            ...state,
            shopSettingLoading: action.payload,
            shopSettingRespose: null,
         };

      case ADMIN_ACTION_TYPES.GET_SHOP_INFORMATION:
         return {
            ...state,
            shopInformation: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SHOP_INFOMATION:
         return {
            ...state,
            shopSettingRespose: action.payload,
            shopSettingLoading: false,
         };

      case ADMIN_ACTION_TYPES.REMOVE_FLASH_SALE_SELECTED_PRODUCTS:
         return {
            ...state,
            selectedFlashSaleProducts: state.selectedFlashSaleProducts.filter((el) => el.id !== action.payload),
         };

      case ADMIN_ACTION_TYPES.SHOW_CREATE_STORE_INFO_COMPONENT:
         return {
            ...state,
            showCreateStoreInfomationComponent: action.payload,
         };

      case ADMIN_ACTION_TYPES.STORE_SHOP_LOCATIOON:
         return {
            ...state,
            shopInformationStore: action.payload,
            shopInformationStoreLoading: false,
            allShops: {
               ...state.allShops,
               allShops: state.allShops.allShops.concat(action.payload.insertedData),
            },
            showCreateStoreInfomationComponent: false,
         };

      case ADMIN_ACTION_TYPES.STORE_SHOP_LOCATIOON_LOADING:
         return {
            ...state,
            shopInformationStoreLoading: action.payload,
            shopInformationStore: null,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_SHOP_LOCATIOON_DATA:
         return {
            ...state,
            allShops: action.payload,
         };

      case ADMIN_ACTION_TYPES.SELECTED_SHOP_INFO:
         return {
            ...state,
            selectedShopInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_SELECTED_SHOP_INFO:
         return {
            ...state,
            selectedShopInfo: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SHOP_INFORMATION:
         if (action.payload.success) {
            return {
               ...state,
               updateShopInformation: action.payload,
               shopInformationStoreLoading: false,
               allShops: {
                  ...state.allShops,
                  allShops: state.allShops.allShops.map((el) => (el._id === action.updatedData._id ? (el = action.updatedData) : el)),
               },
            };
         } else {
            return {
               ...state,
               updateShopInformation: action.payload,
               shopInformationStoreLoading: false,
            };
         }

      case ADMIN_ACTION_TYPES.REMOVER_UPDATE_SHOP_INFO:
         return {
            ...state,
            updateShopInformation: action.payload,
         };

      case ADMIN_ACTION_TYPES.CREATE_NEW_BLOG_POST:
         return {
            ...state,
            blogInfo: action.payload,
            blogInfoLoading: false,
         };

      case ADMIN_ACTION_TYPES.CREATE_NEW_BLOG_POST_LOADING:
         return {
            ...state,
            blogInfoLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVE_BLOG_INFO:
         return {
            ...state,
            blogInfo: action.payload,
            blogInfoLoading: false,
         };

      case ADMIN_ACTION_TYPES.FETCH_BLOG_POSTS:
         return {
            ...state,
            allBlogs: action.payload,
            fetchBlogLoading: false,
         };

      case ADMIN_ACTION_TYPES.FETCH_BLOG_POSTS_LOADING:
         return {
            ...state,
            fetchBlogLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.FETCH_SINGLE_BLOG_POST:
         return {
            ...state,
            singleBlogPost: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_SINGLE_BLOG_POST:
         return {
            ...state,
            blogInfo: action.payload,
            blogInfoLoading: false,
         };

      case ADMIN_ACTION_TYPES.DELETE_SINGLE_BLOG_POST:
         return {
            ...state,
            allBlogs: {
               ...state.allBlogs,
               posts: state.allBlogs.posts.filter((el) => el._id !== action.id),
            },
         };

      case ADMIN_ACTION_TYPES.DELETE_ALL_BLOG_POSTS:
         return {
            ...state,
            allBlogs: {
               ...state.allBlogs,
               posts: [],
            },
         };

      case ADMIN_ACTION_TYPES.INSERT_BLOG_POST_CATEGORIES:
         return {
            ...state,
            insertBlogPostCategoriesInfo: { success: action.payload.success, message: action.payload.message },
            insertBlogPostCategoriesLoading: false,
            insertBlogPostCategoriesError: null,
            blogCategories: {
               ...state.blogCategories,
               categories: state.blogCategories.categories.concat(action.payload.document),
            },
         };

      case ADMIN_ACTION_TYPES.INSERT_BLOG_POST_CATEGORIES_LOADING:
         return {
            ...state,
            insertBlogPostCategoriesLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.INSERT_BLOG_POST_CATEGORIES_ERROR:
         return {
            ...state,
            insertBlogPostCategoriesInfo: null,
            insertBlogPostCategoriesLoading: false,
            insertBlogPostCategoriesError: action.payload,
         };

      case ADMIN_ACTION_TYPES.REMOVER_BLOG_CATEGORIES_INFO:
         return {
            ...state,
            insertBlogPostCategoriesInfo: null,
            insertBlogPostCategoriesLoading: false,
            insertBlogPostCategoriesError: null,
         };

      case ADMIN_ACTION_TYPES.GET_BLOG_CATEGORIES:
         return {
            ...state,
            blogCategories: action.payload,
         };

      case ADMIN_ACTION_TYPES.SELECTED_SINGLE_BLOG_CATEGORIE:
         return {
            ...state,
            selectedBlogCategory: action.payload,
         };

      case ADMIN_ACTION_TYPES.UPDATE_BLOG_CATEGORIE:
         if (action.payload.success) {
            return {
               ...state,
               insertBlogPostCategoriesInfo: action.payload,
               insertBlogPostCategoriesLoading: false,
               blogCategories: {
                  ...state.blogCategories,
                  categories: state.blogCategories.categories.map((el) =>
                     el._id === action.updateCategoryId
                        ? {
                             ...el,
                             name: action.updateData.name,
                             description: action.updateData.description,
                             categorieStatus: action.updateData.categorieStatus,
                             IsDefault: action.updateData.IsDefault,
                             IsFeatured: action.updateData.IsFeatured,
                          }
                        : el
                  ),
               },
            };
         } else if (!action.payload.success) {
            return {
               ...state,
               insertBlogPostCategoriesInfo: action.payload,
               insertBlogPostCategoriesLoading: false,
            };
         }

      case ADMIN_ACTION_TYPES.REMOVER_BLOG_CATEGORIE:
         return {
            ...state,
            blogCategories: {
               ...state.blogCategories,
               categories: state.blogCategories.categories.filter((el) => el._id !== action.removeId),
            },
            selectedBlogCategory: !!state.selectedBlogCategory && state.selectedBlogCategory._id === action.removeId ? null : state.selectedBlogCategory,
         };

      case ADMIN_ACTION_TYPES.GET_ALL_ORDERS:
         return {
            ...state,
            allOrders: action.payload,
         };

      case ADMIN_ACTION_TYPES.DOWNLOAD_ORDER_INVOICE_LOADING:
         return {
            ...state,
            userOrderInvoiceLoading: action.payload,
         };

      case ADMIN_ACTION_TYPES.DELETE_USER_ORDER:
         return {
            ...state,
            allOrders: {
               ...state.allOrders,
               ordersData: state.allOrders.ordersData.filter((el) => el._id._id !== action.orderId),
            },
         };

      case ADMIN_ACTION_TYPES.SHOW_ORDER_PREVIEW:
         return {
            ...state,
            showOrderPreviewComponent: action.payload,
         };

      case ADMIN_ACTION_TYPES.GET_FULL_ORDER_INFO:
         return {
            ...state,
            orderFullInfo: action.payload,
            orderFullInfoLoading: false,
         };

      case ADMIN_ACTION_TYPES.GET_FULL_ORDER_INFO_LOADING:
         return {
            ...state,
            orderFullInfoLoading: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default adminReducer;
