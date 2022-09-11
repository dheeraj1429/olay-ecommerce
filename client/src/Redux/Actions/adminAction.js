import { ACTION_TYPE } from "../ActionTypes/actionType";
import axios from "axios";
import { headers } from "./headers";

export const uploadProductCategory = function (data) {
   return async function (dispatch) {
      try {
         const productCategory = await axios.post("/admin/upload-category", data, headers);

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
         const updateCategory = await axios.patch("/admin/edit-product-category", data, headers);

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
