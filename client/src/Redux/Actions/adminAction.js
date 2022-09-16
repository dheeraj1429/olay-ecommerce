import { ACTION_TYPE } from "../ActionTypes/actionType";
import axios from "axios";
import { headers } from "./headers";

export const uploadProductCategory = function (data) {
   return async function (dispatch) {
      try {
         const productCategory = await axios.post(
            "/admin/upload-category",
            data,
            headers
         );

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
         const categorys = await axios.get("/admin/get-all-categorys", headers);

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
         const updateCategory = await axios.patch(
            "/admin/edit-product-category",
            data,
            headers
         );

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
         const deleteCategory = await axios.delete(
            `/admin/delete-selected-category/${data}`,
            headers
         );

         if (deleteCategory && deleteCategory?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_SELECTED_CATEGORY,
               payload: data,
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
         const brandProduct = await axios.post(
            "/admin/insert-new-product-brand",
            data,
            headers
         );

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
         const fetchBrands = await axios.get(
            `/admin/get-all-product-brand?page=${data}`,
            headers
         );

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
         const deleteOneBrand = await axios.delete(
            `/admin/delete-one-product-brand/${id}`,
            headers
         );

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
         const deleteSelected = await axios.post(
            "/admin/delete-multi-product-brand",
            data,
            headers
         );

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
         const getSelectedBrandProduct = await axios.post(
            `/admin/get-selected-product-brand/${id}`
         );

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
         const updateSelectedBrand = await axios.patch(
            "/admin/update-selected-product-brand",
            data,
            headers
         );

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
         const deleteAllBrands = await axios.delete(
            "/admin/delete-all-products-brand",
            headers
         );

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

// export const fetchProductBrandItems = function (items) {
//    return async function (dispatch) {
//       try {
//          const fetchProductsItems = await axios.post(
//             `/admin/fetch-product-brands-items/${items}`,
//             headers
//          );

//          console.log(fetchProductsItems);
//       } catch (err) {
//          console.log(err);
//       }
//    };
// };

export const fetchProductBrandItemsInfo = function () {
   return async function (dispatch) {
      try {
         const brandInfo = await axios.get("/admin/get-all-brands", headers);

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
         const uploadProduct = await axios.post(
            "/admin/insert-new-product",
            data,
            headers
         );

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

export const fetchUploadProducts = function (page) {
   return async function (dispatch) {
      try {
         const fetchProducts = await axios.get(
            `/admin/get-upload-products?page=${page}`,
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
         const deleteProducts = await axios.delete("/admin/delete-all-products", headers);

         if (deleteAllProducts && deleteAllProducts?.data) {
            dispatch({
               type: ACTION_TYPE.DELETE_ALL_PRODUCTS,
               payload: deleteAllProducts && deleteAllProducts?.data,
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
         const deleteProducts = await axios.post(
            "/admin/delete-selected-products",
            data,
            headers
         );

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
