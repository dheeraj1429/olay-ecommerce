import { ACTION_TYPE } from "../ActionTypes/actionType";

export const setLoginUser = function (data) {
   return {
      type: ACTION_TYPE.SET_LOGIN_USER,
      payload: data,
   };
};

export const removeUser = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_USER,
      payload: data,
   };
};

export const userLoginLoging = function (data) {
   return {
      type: ACTION_TYPE.USER_LOGIN_LODING,
      payload: data,
   };
};

export const productCategoryLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.PRODUCT_CATEGORY_LOADING,
      payload: data,
   };
};

export const removeCategoryInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_CATEGORY_INFO,
      payload: data,
   };
};

export const insertNewCategory = function (data) {
   return {
      type: ACTION_TYPE.INSERT_NEW_CATEGORY,
      payload: data,
   };
};

export const editProductCategory = function (data) {
   return {
      type: ACTION_TYPE.EDIT_CATEGORY,
      payload: data,
   };
};

export const selectedCategory = function (data) {
   return {
      type: ACTION_TYPE.SELECTED_EDIT_CATEGORY,
      payload: data,
   };
};

export const categoryUpdateLoading = function (data) {
   return {
      type: ACTION_TYPE.CATEGORY_UPDATE_LOADING,
      payload: data,
   };
};

export const removeCategoryUpdateInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_CATEGORY_INFO_UPDATE,
      payload: data,
   };
};

export const brandLoading = function (data) {
   return {
      type: ACTION_TYPE.INSERT_NEW_PRODUCT_BRAND_LOADING,
      payload: data,
   };
};

export const removeBrandInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_NEW_PRODUCT_BRAND_INFO,
      payload: data,
   };
};

export const fetchBrandProductLoading = function (data) {
   return {
      type: ACTION_TYPE.LOADING_BRAND_PAGINATION,
      payload: data,
   };
};

export const selectedBrandProduct = function (data) {
   return {
      type: ACTION_TYPE.SELECTED_PRODUCT_BRAND,
      payload: data,
   };
};

export const editSelectedBrandLoading = function (data) {
   return {
      type: ACTION_TYPE.UPDATE_EDIT_PRODUCT_BRAND_LOADING,
      payload: data,
   };
};

export const removeEditBrandInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_EDIT_PRODUCT_BRAND_INFO,
      payload: data,
   };
};

export const bulkAction = function (data) {
   return {
      type: ACTION_TYPE.BULK_ACTIONS,
      payload: data,
   };
};

export const uploadLoading = function (data) {
   return {
      type: ACTION_TYPE.UPLOAD_PRODUCT_LOADING,
      payload: data,
   };
};

export const removeUploadProductInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_INFO,
      payload: data,
   };
};

export const selectedItemLimit = function (data) {
   return {
      type: ACTION_TYPE.SELECTED_ITEMS_LIMIT,
      payload: data,
   };
};

export const removeSelectedItems = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_SELECTED_ITEMS,
      payload: data,
   };
};

export const removeAllSelectedItems = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_ALL_SELECTED_ITEMS,
      payload: data,
   };
};

export const removeAllSelctedIds = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_ALL_SELECTED_ID,
      payload: data,
   };
};

export const fetchLoadingProducts = function (data) {
   return {
      type: ACTION_TYPE.FETCH_LOADING_PRODUCTS,
      payload: data,
   };
};

export const editSingleProductLoading = function (data) {
   return {
      type: ACTION_TYPE.EDIT_SINGLE_PRODUCT_LOADING,
      payload: data,
   };
};

export const removeEditProductInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_EDIT_INFO,
      payload: data,
   };
};

export const removeProductTagInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_TAG_INFO,
      payload: data,
   };
};

export const productTagLoading = function (data) {
   return {
      type: ACTION_TYPE.PRODUCT_TAG_INSERT_LOADING,
      payload: data,
   };
};

export const productTagsFetchLoading = function (data) {
   return {
      type: ACTION_TYPE.PRODUCT_TAGS_LOADING,
      payload: data,
   };
};

export const editProductTagLoading = function (data) {
   return {
      type: ACTION_TYPE.EDIT_PRODUCT_TAG_LOADING,
      payload: data,
   };
};

export const removeUpdateTagInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_TAG_EDTI_INFO,
      payload: data,
   };
};

export const productSwatchesLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.STORE_PRODUCT_SWATCHES_LOADING,
      payload: data,
   };
};

export const removeproductSwatchesInfo = function (data) {
   return {
      type: ACTION_TYPE.PRODUCT_SWATCHES_REMOVE_INFO,
      payload: data,
   };
};

export const editProductSwatchesLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.EDIT_SINGLE_PRODUCT_SWATCHES_LOADING,
      payload: data,
   };
};

export const removeUpdateProductSwatchesInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_UPDATE_SWATCHES_INFO,
      payload: data,
   };
};

export const productSizeVariationLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.UPLOD_PRODUCT_SIZE_VARIATION_LOADING,
      payload: data,
   };
};

export const removeProductSizeVariationInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_UPLOD_PRODUCT_SIZE_VARIATION_INFO,
      payload: data,
   };
};

export const editProductSizeVariationsLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.EDIT_PRODUCT_SIZE_VARIATION_LOADING,
      payload: data,
   };
};

export const removeSizeVariationInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_EDIT_SIZE_VARIATION_INFO,
      payload: data,
   };
};

export const insertNewSubVationLoading = function (data) {
   return {
      type: ACTION_TYPE.INSERT_PRODUCT_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeProductSubInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_PRODUCT_SUB_INFO,
      payload: data,
   };
};

export const loadingUpdateSubVariation = function (data) {
   return {
      type: ACTION_TYPE.UPDATE_SINGLE_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeSubVaritionInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_UPDATE_SINGLE_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const removeProductSubVaritionInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_SINGLE_PRODUCT_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const deleteSubVaritionLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.DELETE_SINGLE_SUB_VARIATION_LOADING,
      payload: data,
   };
};

export const removeDeleteSubVariationInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_DELTE_SUB_VARIATION_INFO,
      payload: data,
   };
};

export const storeSelectedSaleProduct = function (data) {
   return {
      type: ACTION_TYPE.STORE_SALE_SELECTED_PRODIUCT_INFO,
      payload: data,
   };
};

export const showFetchSaleComponent = function (data) {
   return {
      type: ACTION_TYPE.SHOW_FETCH_SALE_COLLECTION_COMPONENT,
      payload: data,
   };
};

export const insertNewSaleCollectionLodingFn = function (data) {
   return {
      type: ACTION_TYPE.INSERT_FLASHSALE_COLLECTIONS_LOADING,
      payload: data,
   };
};

export const removeFlashSaleInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_FLASHSALE_COLLECTIONS_INFO,
      payload: data,
   };
};

export const getAllFlashSalesLoading = function (data) {
   return {
      type: ACTION_TYPE.GET_ALL_FLASH_SALE_LOADING,
      payload: data,
   };
};

export const removeSingleFlashSaleData = function () {
   return {
      type: ACTION_TYPE.REMOVE_SINGLE_FLASH_SALE,
   };
};

export const loadingUpdateSingleFlashSale = function (data) {
   return {
      type: ACTION_TYPE.UPDATE_SINGLE_FLASH_SALE_LOADING,
      payload: data,
   };
};

export const removeUpdateFlashSaleInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_UPDATE_FLASH_SALE_INFO,
      payload: data,
   };
};

export const labelLoading = function (data) {
   return {
      type: ACTION_TYPE.INSERT_NEW_PRODUCT_COLOR_LABEL_LOADING,
      payload: data,
   };
};

export const removerProductLabelInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVER_INSERT_PRODUCT_LABEL_INFO,
      payload: data,
   };
};

export const productUploadLabelLoading = function (data) {
   return {
      type: ACTION_TYPE.UPDATE_PRODUCT_LABEL_LOADING,
      payload: data,
   };
};

export const exportHistoryLoading = function (data) {
   return {
      type: ACTION_TYPE.GET_ALL_EXPORT_INFO_LOADING,
      payload: data,
   };
};

export const exportLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.EXPORT_LOADING,
      payload: data,
   };
};

export const hideEmailBoxFn = function (data) {
   return {
      type: ACTION_TYPE.HIDE_EMAIL_BOX,
      payload: data,
   };
};

export const sendMailLoadingFn = function (data) {
   return {
      type: ACTION_TYPE.SEND_MAIL_LOADING,
      payload: data,
   };
};

export const removerMailInfo = function (data) {
   return {
      type: ACTION_TYPE.REMOVE_MAIL_INFO,
      payload: data,
   };
};
