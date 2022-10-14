import { ACTION_TYPE } from '../ActionTypes/actionType';
import axios from 'axios';
import { headers } from './headers';
import FileDownload from 'js-file-download';

export const uploadProductCategory = function (data) {
   return async function (dispatch) {
      try {
         const productCategory = await axios.post('/admin/upload-category', data, headers);

         if (productCategory && productCategory?.data) {
            dispatch({
               type: ACTION_TYPE.PRODUCT_CATEGORY_INSERT,
               payload: productCategory && productCategory.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchProductsCategorys = function () {
   return async function (dispatch) {
      try {
         const categorys = await axios.get('/admin/get-all-categorys', headers);

         if (categorys && categorys?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_PRODUCTS_CATEGORYS,
               payload: categorys && categorys?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateProductCategory = function (data) {
   return async function (dispatch) {
      try {
         const updateCategory = await axios.patch('/admin/edit-product-category', data, headers);

         if (updateCategory && updateCategory?.data && updateCategory?.data?.success) {
            dispatch({
               type: ACTION_TYPE.CATEGORY_UPDATE,
               payload: updateCategory && updateCategory?.data,
               targetId: data.categoryId,
               categoryName: data.name,
               categoryDescription: data.description,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSelectedCategory = function (data) {
   return async function (dispatch) {
      try {
         const deleteCategory = await axios.delete(`/admin/delete-selected-category/${data.name}`, headers);

         if (deleteCategory && deleteCategory?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_CATEGORY,
               payload: data.id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const insertNewProductBrand = function (data) {
   return async function (dispatch) {
      try {
         const brandProduct = await axios.post('/admin/insert-new-product-brand', data, headers);

         if (brandProduct && brandProduct?.data) {
            dispatch({
               type: ACTION_TYPE.INSERT_NEW_PRODUCT_BRAND,
               payload: brandProduct && brandProduct?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchAllProductBrand = function (data) {
   return async function (dispatch) {
      try {
         const fetchBrands = await axios.get(`/admin/get-all-product-brand?page=${data}`, headers);

         if (fetchBrands && fetchBrands?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_ALL_PRODUCT_BRAND,
               payload: fetchBrands && fetchBrands?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteOneProductBrand = function (id) {
   return async function (dispatch) {
      try {
         const deleteOneBrand = await axios.delete(`/admin/delete-one-product-brand/${id}`, headers);

         if (deleteOneBrand && deleteOneBrand?.data && !!deleteOneBrand?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_ONE_PRODUCT_BRAND,
               payload: deleteOneBrand && deleteOneBrand?.data,
               selectedBrandId: id,
            });
         } else {
            dispatch({
               type: ACTION_TYPE.DELETE_ONE_PRODUCT_BRAND,
               payload: deleteOneBrand && deleteOneBrand?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteMultiSelectedProductBrand = function (data) {
   return async function (dispatch) {
      try {
         const deleteSelected = await axios.post('/admin/delete-multi-product-brand', data, headers);

         if (deleteSelected && deleteSelected?.data && deleteSelected?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_BRAND_PRODUCT,
               payload: data,
            });
         } else {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_BRAND_PRODUCT,
               message: deleteSelected && deleteSelected?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchSelectedBrand = function (id) {
   return async function (dispatch) {
      try {
         const getSelectedBrandProduct = await axios.post(`/admin/get-selected-product-brand/${id}`);

         if (getSelectedBrandProduct && getSelectedBrandProduct?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_SELECTED_BRAND_PRODUCT,
               payload: getSelectedBrandProduct && getSelectedBrandProduct?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const editSelectedBrand = function (data) {
   return async function (dispatch) {
      try {
         const updateSelectedBrand = await axios.patch('/admin/update-selected-product-brand', data, headers);

         if (updateSelectedBrand && updateSelectedBrand?.data) {
            dispatch({
               type: ACTION_TYPE.EDIT_SELECTED_PRODUCT_BRAND,
               payload: updateSelectedBrand && updateSelectedBrand?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteAllBrand = function () {
   return async function (dispatch) {
      try {
         const deleteAllBrands = await axios.delete('/admin/delete-all-products-brand', headers);

         if (deleteAllBrands && deleteAllBrands?.data && deleteAllBrands?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELTE_ALL_BRAND,
               payload: deleteAllBrands && deleteAllBrands?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchProductBrandItemsInfo = function () {
   return async function (dispatch) {
      try {
         const brandInfo = await axios.get('/admin/get-all-brands', headers);

         if (brandInfo && brandInfo?.data && brandInfo?.data?.success) {
            dispatch({
               type: ACTION_TYPE.FETCH_PRODUCTS_BRADN_INFO,
               payload: brandInfo && brandInfo?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const uplodNewProduct = function (data) {
   return async function (dispatch) {
      try {
         const uploadProduct = await axios.post('/admin/insert-new-product', data, headers);

         if (uploadProduct && uploadProduct?.data) {
            dispatch({
               type: ACTION_TYPE.UPLOAD_NEW_PRODUCT,
               payload: uploadProduct && uploadProduct?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchUploadProducts = function (page, docItems) {
   return async function (dispatch) {
      try {
         const fetchProducts = await axios.get(
            `/admin/get-upload-products?page=${page}&subVatiaions=${docItems}`,
            headers
         );

         if (fetchProducts && fetchProducts?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_UPLODED_PRODUCTS,
               payload: fetchProducts && fetchProducts?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteAllProducts = function () {
   return async function (dispatch) {
      try {
         const deleteProducts = await axios.delete('/admin/delete-all-products', headers);

         if (deleteProducts && deleteProducts?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_ALL_PRODUCTS,
               payload: deleteProducts && deleteProducts?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSelectedproducts = function (data) {
   return async function (dispatch) {
      try {
         const deleteProducts = await axios.post('/admin/delete-selected-products', data, headers);

         if (deleteProducts && deleteProducts?.data && deleteProducts?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_PRODUCTS,
               payload: deleteProducts && deleteProducts?.data,
               productsId: data,
            });
         } else if (deleteProducts && deleteProducts?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_PRODUCTS,
               payload: deleteProducts && deleteProducts?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteOneProduct = function (id, categoryId, brandId) {
   return async function (dispatch) {
      try {
         const deleteOneProducts = await axios.delete(
            `/admin/delete-one-product?id=${id}&categoryId=${categoryId}&brandId=${brandId}`,
            Headers
         );

         if (deleteOneProducts && deleteOneProducts?.data && deleteOneProducts?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_ONE_PRODUCTS,
               payload: deleteOneProducts && deleteOneProducts?.data,
               productsId: id,
            });
         } else {
            dispatch({
               type: ACTION_TYPE.DELETE_ONE_PRODUCTS,
               payload: deleteOneProducts && deleteOneProducts?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchSingleProduct = function (id) {
   return async function (dispatch) {
      try {
         const singleProduct = await axios.get(`/admin/get-single-product/${id}`, headers);

         if (singleProduct && singleProduct?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_SINGLE_PRODUCT,
               payload: singleProduct && singleProduct?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const editSingleProduct = function (data, id, selectedProductId) {
   return async function (dispatch) {
      try {
         const editSingleProduct = await axios.patch(
            `/admin/eidt-single-product/${id}?selectedProductId=${selectedProductId}`,
            data,
            headers
         );

         if (editSingleProduct && editSingleProduct?.data) {
            dispatch({
               type: ACTION_TYPE.EDIT_SINGLE_PRODUCT,
               payload: editSingleProduct && editSingleProduct?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const saveNewTag = function (data) {
   return async function (dispatch) {
      try {
         const insetTag = await axios.post('/admin/save-new-product-tag', data, headers);

         if (insetTag && insetTag?.data) {
            dispatch({
               type: ACTION_TYPE.INSERT_NEW_PRODUCT_TAG,
               payload: insetTag && insetTag?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getProductTags = function (page) {
   return async function (dispatch) {
      try {
         const getTags = await axios.get(`/admin/get-all-product-tags?page=${page}`);

         if (getTags && getTags?.data && getTags?.data?.success) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_PRODUCTS_TAGS,
               payload: getTags && getTags?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteAllTags = function (data) {
   return async function (dispatch) {
      try {
         const deleteTags = await axios.delete('/admin/delete-all-products-tags', headers);

         if (deleteTags && deleteTags?.data && !!deleteTags?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_ALL_TAGS,
               payload: deleteTags && !!deleteAllTags?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSelectedProductTag = function (id) {
   return async function (dispatch) {
      try {
         const deleteTag = await axios.delete(`/admin/delete-single-product-tags/${id}`, headers);

         if (deleteTag && deleteTag?.data && deleteTag?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_PRODUCT_TAG,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchSelectedProductTag = function (id) {
   return async function (dispatch) {
      try {
         const selectedTag = await axios.get(`/admin/get-selected-product-tag/${id}`, headers);

         if (selectedTag && selectedTag?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_SELECTED_PRODUCT_TAG,
               payload: selectedTag && selectedTag?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const editProductTag = function (data) {
   return async function (dispatch) {
      try {
         const edit = await axios.patch('/admin/update-product-tag', data, headers);

         if (edit && edit?.data) {
            dispatch({
               type: ACTION_TYPE.EDIT_PRODUCT_TAG,
               payload: edit && edit?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchAllProductTags = function () {
   return async function (dispatch) {
      try {
         const allTags = await axios.get('/admin/get-all-product-tags-documents', headers);

         if (allTags && allTags?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_ALL_PRODUCT_TAGS,
               payload: allTags && allTags?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const storeProductSwatches = function (data) {
   return async function (dispatch) {
      try {
         const storeInfo = await axios.post('/admin/insert-new-product-swatches', data, headers);

         if (storeInfo && storeInfo?.data) {
            dispatch({
               type: ACTION_TYPE.STORE_PRODUCT_SWATCHES,
               payload: storeInfo && storeInfo?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getproductSwatches = function () {
   return async function (dispatch) {
      try {
         const productSwatches = await axios.get('/admin/get-products-all-swatchs', headers);

         if (productSwatches && productSwatches?.data) {
            dispatch({
               type: ACTION_TYPE.GET_PRODUCT_SWATCHES,
               payload: productSwatches && productSwatches?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removeAllProductSwatches = function () {
   return async function (dispatch) {
      try {
         const removeSwatches = await axios.delete('/admin/remove-all-color-swatches', headers);

         if (removeSwatches && removeSwatches?.data.success) {
            dispatch({
               type: ACTION_TYPE.REMOVER_ALL_PRODUCT_SWATCHES,
               payload: removeSwatches && removeSwatches?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fetchSingleProductColorSwatches = function (id) {
   return async function (dispatch) {
      try {
         const singleSwatches = await axios.get(`/admin/get-single-product-swatches/${id}`, headers);

         if (singleSwatches && singleSwatches?.data) {
            dispatch({
               type: ACTION_TYPE.FETCH_SINGLE_PRODUCT_SWATCHES,
               payload: singleSwatches && singleSwatches?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const editSingleProductSwatches = function (data) {
   return async function (dispatch) {
      try {
         const editSwatches = await axios.patch('/admin/edit-single-product-swatches', data, headers);

         if (editSwatches && editSwatches?.data) {
            dispatch({
               type: ACTION_TYPE.EDIT_SINGLE_PRODUCT_SWATCHES,
               payload: editSwatches && editSwatches?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removeSelectedProductSwatches = function (id) {
   return async function (dispatch) {
      try {
         const deleteSelectedSwatches = await axios.delete(`/admin/delete-selected-product-swatches/${id}`, headers);

         if (deleteSelectedSwatches && deleteSelectedSwatches?.data && deleteSelectedSwatches?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_PRODUCT_SWATCHES,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateNewSizeVariation = function (data) {
   return async function (dispatch) {
      try {
         const insertProductSizeVarient = await axios.post('/admin/insert-new-product-size-variation', data, headers);

         if (insertProductSizeVarient && insertProductSizeVarient?.data) {
            dispatch({
               type: ACTION_TYPE.UPLOD_PRODUCT_SIZE_VARIATION,
               payload: insertProductSizeVarient && insertProductSizeVarient?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getAllProductSizeVariations = function () {
   return async function (dispatch) {
      try {
         const sizeVariations = await axios.get('/admin/get-all-size-variations', headers);

         if (sizeVariations && sizeVariations?.data) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_PRODUCTS_SIZE_VARIATIONS,
               payload: sizeVariations && sizeVariations?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removeSingleSizeVariations = function (id) {
   return async function (dispatch) {
      try {
         const removeSelectedSize = await axios.delete(`/admin/remove-single-product-size-variation/${id}`, headers);

         if (removeSelectedSize && removeSelectedSize?.data && removeSelectedSize?.data.success) {
            dispatch({
               type: ACTION_TYPE.REMOVE_SINGLE_SIZE_VARIATION,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removeAllProductSizeVaration = function () {
   return async function (dispatch) {
      try {
         const removeAllSizeVariation = await axios.delete('/admin/delete-all-size-varaiton', headers);

         if (removeAllSizeVariation && removeAllSizeVariation?.data && removeAllSizeVariation?.data.success) {
            dispatch({
               type: ACTION_TYPE.RMEOVE_ALL_PRODUCT_SIZE_VARIATION,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getSingleProductSizeVations = function (id) {
   return async function (dispatch) {
      try {
         const getSingleSizeVar = await axios.get(`/admin/get-single-size-variation/${id}`, headers);

         if (getSingleSizeVar && getSingleSizeVar?.data) {
            dispatch({
               type: ACTION_TYPE.GET_SINGLE_PRODUCT_SIZE_VARIATION,
               payload: getSingleSizeVar && getSingleSizeVar?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const editProductSizeVariations = function (data) {
   return async function (dispatch) {
      try {
         const editSizeVariations = await axios.patch('/admin/edit-size-variation', data, headers);

         if (editSizeVariations && editSizeVariations?.data) {
            dispatch({
               type: ACTION_TYPE.EDIT_PRODUCT_SIZE_VARIATION,
               payload: editSizeVariations && editSizeVariations?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const insertProductSubVariation = function (data) {
   return async function (dispatch) {
      try {
         const insertVariation = await axios.post('/admin/insert-new-product-variation', data, headers);

         if (insertVariation && insertVariation?.data && insertVariation?.data.success) {
            dispatch({
               type: ACTION_TYPE.INSERT_PRODUCT_SUB_VARIATION,
               payload: insertVariation && insertVariation?.data,
            });
         } else {
            console.log(insertVariation && insertVariation?.data);
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const fecthSingleSubVariation = function (id, parentProductId) {
   return async function (dispatch) {
      try {
         const singelSubVariation = await axios.get(
            `/admin/get-single-sub-variation?subVariation=${id}&parentProductId=${parentProductId}`,
            headers
         );

         if (singelSubVariation && singelSubVariation?.data && singelSubVariation?.data.success) {
            dispatch({
               type: ACTION_TYPE.FETCH_SINGLE_SUBVARIATION,
               payload: singelSubVariation && singelSubVariation?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateSubVarition = function (data) {
   return async function (dispatch) {
      try {
         const updatedData = await axios.patch('/admin/update-single-sub-varitions', data, headers);

         if (updatedData && updatedData?.data && updatedData?.data.success) {
            dispatch({
               type: ACTION_TYPE.UPDATE_SINGLE_SUB_VARIATION,
               payload: updatedData && updatedData?.data,
            });
         } else {
            console.log(updatedData && updatedData?.data);
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const delteSingleSubVariatoion = function (data) {
   return async function (dispatch) {
      try {
         const deleteSingleVariation = await axios.delete(
            `/admin/delete-single-sub-variaiton?parentId=${data.parentProductId}&subVariationId=${data.subVariationId}`,
            data,
            headers
         );

         if (deleteSingleVariation && deleteSingleVariation?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_SINGLE_SUB_VARIATION,
               payload: deleteSingleVariation && deleteSingleVariation?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const insertNewProductFlashSale = function (data) {
   return async function (dispatch) {
      try {
         const saleResponse = await axios.post('/admin/insert-new-product-flash-sale', data, headers);

         if (saleResponse && saleResponse?.data) {
            dispatch({
               type: ACTION_TYPE.INSERT_FLASHSALE_COLLECTIONS,
               payload: saleResponse && saleResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getAllFlashSales = function (page) {
   return async function (dispatch) {
      try {
         const getAllSales = await axios.get(`/admin/get-all-sales?page=${page}`, headers);

         if (getAllSales && getAllSales?.data) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_FLASH_SALE,
               payload: getAllSales && getAllSales?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteAllFlashSales = function () {
   return async function (dispatch) {
      try {
         const deleteAllSales = await axios.delete('/admin/delete-all-flash-sale', headers);

         if (deleteAllSales && deleteAllSales?.data.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_ALL_FLASH_SALE,
            });
         } else {
            console.log(deleteAllSales?.data);
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSingleFlashSale = function (id) {
   return async function (dispatch) {
      try {
         const deleteSingleSale = await axios.delete(`/admin/delete-single-flash-sale/${id}`, headers);

         if (deleteSingleSale && deleteSingleSale?.data && deleteSingleSale?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELTE_SINGLE_SALE,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getSinlgeFlashSale = function (id) {
   return async function (dispatch) {
      try {
         const singleSale = await axios.get(`/admin/get-sinlge-flash-sale/${id}`, headers);

         if (singleSale && singleSale?.data && singleSale?.data.success) {
            dispatch({
               type: ACTION_TYPE.FETCH_SINGLE_FLASH_SALE,
               payload: singleSale && singleSale?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateSingleFlashSale = function (data) {
   return async function (dispatch) {
      try {
         const updateSale = await axios.patch('/admin/update-single-flash-sale', data, headers);

         if (updateSale && updateSale?.data && updateSale?.data.success) {
            dispatch({
               type: ACTION_TYPE.UPDATE_SINGLE_FLASH_SALE,
               payload: updateSale && updateSale?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removeFlashSaleProducts = function (id, parentSaleId) {
   return async function (dispatch) {
      try {
         const removeSelectedFlashSaleProduct = await axios.delete(
            `/admin/delete-selected-flash-sale-product?productId=${id}&parentSaleId=${parentSaleId}`,
            headers
         );

         if (
            removeSelectedFlashSaleProduct &&
            !!removeSelectedFlashSaleProduct?.data &&
            !!removeSelectedFlashSaleProduct?.data.success
         ) {
            dispatch({
               type: ACTION_TYPE.REMOVE_FLASH_SALE_PRODUCTS,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const insertNewProductColorLable = function (data) {
   return async function (dispatch) {
      try {
         const insertNewColor = await axios.post('/admin/insert-new-product-label', data, headers);

         if (insertNewColor && insertNewColor?.data) {
            dispatch({
               type: ACTION_TYPE.INSERT_NEW_PRODUCT_COLOR_LABEL,
               payload: insertNewColor && insertNewColor?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getAllProductLable = function () {
   return async function (dispatch) {
      try {
         const getAllLabels = await axios.get('/admin/get-all-product-label', headers);

         if (getAllLabels && getAllLabels?.data && getAllLabels?.data?.success) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_PRODUCT_LABEL,
               payload: getAllLabels && getAllLabels?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deletAllProductLabel = function () {
   return async function (dispatch) {
      try {
         const deleteAllLabels = await axios.delete('/admin/delete-all-lables', headers);

         if (deleteAllLabels && deleteAllLabels?.data && deleteAllLabels?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_ALL_PRODUCTS_LABELS,
               payload: deleteAllLabels && deleteAllLabels?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSingleProductlabel = function (id) {
   return async function (dispatch) {
      try {
         const deleteSingleLable = await axios.delete(`/admin/delete-single-product-label/${id}`, headers);

         if (deleteSingleLable && deleteSingleLable?.data && deleteSingleLable?.data.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SINGLE_PRODUCT_LABEL,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getSingleProductLabel = function (id) {
   return async function (dispatch) {
      try {
         const getSingleLabel = await axios.get(`/admin/get-single-product-label/${id}`, headers);

         if (getSingleLabel && getSingleLabel?.data && getSingleLabel?.data.success) {
            dispatch({
               type: ACTION_TYPE.GET_SINGLE_PRODUCT_LABEL,
               payload: getSingleLabel && getSingleLabel?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateProductLabel = function (data) {
   return async function (dispatch) {
      try {
         const updateLabel = await axios.patch('/admin/update-product-label', data, headers);

         if (updateLabel && updateLabel?.data && updateLabel?.data?.success) {
            dispatch({
               type: ACTION_TYPE.UPDATE_PRODUCT_LABEL,
               payload: updateLabel && updateLabel?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const exportProductCsv = function () {
   return async function (dispatch) {
      try {
         const exportProduct = await axios.post(
            '/admin/tools/export/products',
            {
               responseType: 'blob',
            },
            headers
         );

         if (exportProduct && exportProduct?.data) {
            FileDownload(exportProduct?.data, 'product.csv');
            dispatch({
               type: ACTION_TYPE.EXPORT_LOADING,
               payload: false,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getAllExportInfo = function () {
   return async function (dispatch) {
      try {
         const getAllExports = await axios.get('/admin/tools/get-all-exports', headers);

         console.log(getAllExports);

         if (getAllExports && getAllExports?.data && getAllExports?.data?.success) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_EXPORT_INFO,
               payload: getAllExports && getAllExports?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteSingleProductHistory = function (id, fileName) {
   return async function (dispatch) {
      try {
         const deleteProductHistory = await axios.delete(
            `/admin/tools/delete-single-product-history/${id}/${fileName}`,
            headers
         );

         if (deleteProductHistory && deleteProductHistory?.data && deleteProductHistory?.data?.success) {
            dispatch({
               type: ACTION_TYPE.DELETE_SINGLE_EXPORT_PRODUCT_HISTORY,
               payload: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const downloadPrevHistoryFiles = function (fileName) {
   return async function (dispatch) {
      try {
         const download = await axios.get(`/admin/tools/download-prev-history?fileName=${fileName}`, headers);

         if (download && download?.data) {
            FileDownload(download?.data, `${fileName}`);
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const sendHistoryFileWithEmail = function (data) {
   return async function (dispatch) {
      try {
         const sendEmail = await axios.post('/admin/tools/send-history-with-email', data, headers);

         if (sendEmail && sendEmail?.data && sendEmail?.data?.success) {
            dispatch({
               type: ACTION_TYPE.SEND_MAIL,
               payload: sendEmail && sendEmail?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const downloadCsvTemplate = function () {
   return async function (dispatch) {
      try {
         const downloadTemplate = await axios.get('/admin/tools/download-csv-template', headers);

         if (downloadTemplate && downloadTemplate?.data) {
            FileDownload(downloadTemplate?.data, 'template.csv');
            dispatch({
               type: ACTION_TYPE.DOWNLOAD_CSV_IMPORT_TEMPLATE,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const importCsvFile = function (data) {
   return async function (dispatch) {
      try {
         const importData = await axios.post('/admin/tools/import-csv-data', data, headers);

         if (importData && importData?.data && importData?.data.success) {
            dispatch({
               type: ACTION_TYPE.IMPORT_CSV_INFO,
               payload: importData && importData?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getProductGenralReport = function () {
   return async function (dispatch) {
      try {
         const getReport = await axios.get('/index/get-product-genral-report', headers);

         if (getReport && getReport?.data && getReport?.data.success) {
            dispatch({
               type: ACTION_TYPE.PRODUCT_GET_GENRNAL_REPORT,
               payload: getReport && getReport?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getAllSignInUsers = function () {
   return async function (dispatch) {
      try {
         const getUsers = await axios.get('/index/get-signin-users', headers);

         if (getUsers && getUsers?.data && getUsers?.data?.success) {
            dispatch({
               type: ACTION_TYPE.GET_ALL_SIGNIN_USERS,
               payload: getUsers && getUsers?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const ShopSetting = function (data) {
   return async function (dispatch) {
      try {
         const shopSettingReponse = await axios.post('/admin/shop-setting', data, headers);

         if (shopSettingReponse && shopSettingReponse?.data) {
            dispatch({
               type: ACTION_TYPE.SHOP_INFORMATION,
               payload: shopSettingReponse && shopSettingReponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getShopInfromation = function () {
   return async function (dispatch) {
      try {
         const getShopInfo = await axios.get('/admin/get-shop-info', headers);

         if (getShopInfo && getShopInfo?.data && getShopInfo?.data.success) {
            dispatch({
               type: ACTION_TYPE.GET_SHOP_INFORMATION,
               payload: getShopInfo && getShopInfo?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateShopInformation = function (data) {
   return async function (dispatch) {
      try {
         const updateShopInfo = await axios.patch('/admin/update-shop-info', data, headers);

         if (updateShopInfo && updateShopInfo?.data && updateShopInfo?.data.success) {
            dispatch({
               type: ACTION_TYPE.UPDATE_SHOP_INFOMATION,
               payload: updateShopInfo && updateShopInfo?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
