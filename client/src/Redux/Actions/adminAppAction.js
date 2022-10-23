import { ADMIN_ACTION_TYPES } from '../ActionTypes/adminActionType';

export const productCategoryLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.PRODUCT_CATEGORY_LOADING,
      payload: data,
   };
};

export const removeCategoryInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_CATEGORY_INFO,
      payload: data,
   };
};

export const insertNewCategory = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.INSERT_NEW_CATEGORY,
      payload: data,
   };
};

export const editProductCategory = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EDIT_CATEGORY,
      payload: data,
   };
};

export const categoryUpdateLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.CATEGORY_UPDATE_LOADING,
      payload: data,
   };
};

export const removeCategoryUpdateInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_CATEGORY_INFO_UPDATE,
      payload: data,
   };
};

export const brandLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_BRAND_LOADING,
      payload: data,
   };
};

export const removeBrandInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_NEW_PRODUCT_BRAND_INFO,
      payload: data,
   };
};

export const fetchBrandProductLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.LOADING_BRAND_PAGINATION,
      payload: data,
   };
};

export const selectedBrandProduct = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SELECTED_PRODUCT_BRAND,
      payload: data,
   };
};

export const editSelectedBrandLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPDATE_EDIT_PRODUCT_BRAND_LOADING,
      payload: data,
   };
};

export const removeEditBrandInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_EDIT_PRODUCT_BRAND_INFO,
      payload: data,
   };
};

export const bulkAction = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.BULK_ACTIONS,
      payload: data,
   };
};

export const uploadLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPLOAD_PRODUCT_LOADING,
      payload: data,
   };
};

export const removeUploadProductInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_INFO,
      payload: data,
   };
};

export const selectedItemLimit = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SELECTED_ITEMS_LIMIT,
      payload: data,
   };
};

export const removeSelectedItems = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_SELECTED_ITEMS,
      payload: data,
   };
};

export const removeAllSelectedItems = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_ALL_SELECTED_ITEMS,
      payload: data,
   };
};

export const removeAllSelctedIds = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_ALL_SELECTED_ID,
      payload: data,
   };
};

export const fetchLoadingProducts = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.FETCH_LOADING_PRODUCTS,
      payload: data,
   };
};

export const editSingleProductLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT_LOADING,
      payload: data,
   };
};

export const removeEditProductInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_EDIT_INFO,
      payload: data,
   };
};

export const removeProductTagInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_TAG_INFO,
      payload: data,
   };
};

export const productTagLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.PRODUCT_TAG_INSERT_LOADING,
      payload: data,
   };
};

export const productTagsFetchLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.PRODUCT_TAGS_LOADING,
      payload: data,
   };
};

export const editProductTagLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EDIT_PRODUCT_TAG_LOADING,
      payload: data,
   };
};

export const removeUpdateTagInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_TAG_EDTI_INFO,
      payload: data,
   };
};

export const productSwatchesLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.STORE_PRODUCT_SWATCHES_LOADING,
      payload: data,
   };
};

export const removeproductSwatchesInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.PRODUCT_SWATCHES_REMOVE_INFO,
      payload: data,
   };
};

export const editProductSwatchesLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EDIT_SINGLE_PRODUCT_SWATCHES_LOADING,
      payload: data,
   };
};

export const removeUpdateProductSwatchesInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_UPDATE_SWATCHES_INFO,
      payload: data,
   };
};

export const productSizeVariationLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPLOD_PRODUCT_SIZE_VARIATION_LOADING,
      payload: data,
   };
};

export const removeProductSizeVariationInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_UPLOD_PRODUCT_SIZE_VARIATION_INFO,
      payload: data,
   };
};

export const editProductSizeVariationsLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EDIT_PRODUCT_SIZE_VARIATION_LOADING,
      payload: data,
   };
};

export const removeSizeVariationInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_EDIT_SIZE_VARIATION_INFO,
      payload: data,
   };
};

export const insertNewSubVationLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.INSERT_PRODUCT_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeProductSubInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_PRODUCT_SUB_INFO,
      payload: data,
   };
};

export const loadingUpdateSubVariation = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPDATE_SINGLE_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeSubVaritionInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_UPDATE_SINGLE_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const removeProductSubVaritionInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_SINGLE_PRODUCT_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const deleteSubVaritionLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.DELETE_SINGLE_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeDeleteSubVariationInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_DELTE_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const storeSelectedSaleProduct = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.STORE_SALE_SELECTED_PRODIUCT_INFO,
      payload: data,
   };
};

export const showFetchSaleComponent = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SHOW_FETCH_SALE_COLLECTION_COMPONENT,
      payload: data,
   };
};

export const insertNewSaleCollectionLodingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.INSERT_FLASHSALE_COLLECTIONS_LOADING,
      payload: data,
   };
};

export const removeFlashSaleInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_FLASHSALE_COLLECTIONS_INFO,
      payload: data,
   };
};

export const getAllFlashSalesLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.GET_ALL_FLASH_SALE_LOADING,
      payload: data,
   };
};

export const removeSingleFlashSaleData = function () {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_SINGLE_FLASH_SALE,
   };
};

export const loadingUpdateSingleFlashSale = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPDATE_SINGLE_FLASH_SALE_LOADING,
      payload: data,
   };
};

export const removeUpdateFlashSaleInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_UPDATE_FLASH_SALE_INFO,
      payload: data,
   };
};

export const labelLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.INSERT_NEW_PRODUCT_COLOR_LABEL_LOADING,
      payload: data,
   };
};

export const removerProductLabelInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVER_INSERT_PRODUCT_LABEL_INFO,
      payload: data,
   };
};

export const productUploadLabelLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.UPDATE_PRODUCT_LABEL_LOADING,
      payload: data,
   };
};

export const exportHistoryLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.GET_ALL_EXPORT_INFO_LOADING,
      payload: data,
   };
};

export const exportLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.EXPORT_LOADING,
      payload: data,
   };
};

export const hideEmailBoxFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.HIDE_EMAIL_BOX,
      payload: data,
   };
};

export const sendMailLoadingFn = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SEND_MAIL_LOADING,
      payload: data,
   };
};

export const removerMailInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_MAIL_INFO,
      payload: data,
   };
};

export const downloadTemplateLoadingFunction = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.DOWNLOAD_CSV_IMPORT_TEMPLATE_LOADING,
      payload: data,
   };
};

export const insertCsvLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.IMPORT_CSV_LOADING,
      payload: data,
   };
};

export const removerCsvInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_CSV_INFO,
      payload: data,
   };
};

export const showProductInfoCom = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SHOW_PRODUCT_UPLOAD_INFO_COMPONENT,
      payload: data,
   };
};

export const productReportLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.PRODUCT_GET_GENRNAL_REPORT_LOADING,
      payload: data,
   };
};

export const shopInformatonLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SHOP_INFORMATION_LOADING,
      payload: data,
   };
};

export const removeFlashSaleSelectedProducts = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_FLASH_SALE_SELECTED_PRODUCTS,
      payload: data,
   };
};

export const storeShowHideHandler = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SHOW_CREATE_STORE_INFO_COMPONENT,
      payload: data,
   };
};

export const shopInfomationStoreLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.STORE_SHOP_LOCATIOON_LOADING,
      payload: data,
   };
};

export const selectedShopInfoHandler = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.SELECTED_SHOP_INFO,
      payload: data,
   };
};

export const RemoveSelectedShopInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_SELECTED_SHOP_INFO,
      payload: data,
   };
};

export const removeUpdateShopInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVER_UPDATE_SHOP_INFO,
      payload: data,
   };
};

export const createNewBlogPostLoading = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.CREATE_NEW_BLOG_POST_LOADING,
      payload: data,
   };
};

export const removeBlogInsertInfo = function (data) {
   return {
      type: ADMIN_ACTION_TYPES.REMOVE_BLOG_INFO,
      payload: data,
   };
};
