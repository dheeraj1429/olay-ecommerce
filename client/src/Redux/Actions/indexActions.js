import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';
import axios from 'axios';
import { headers } from '../../headers';
import backendConfigData from '../../backendConfig';

axios.defaults.headers.common['x-api-key'] = backendConfigData.ACCESS_TOKEN;

export const getTrandingProducts = function () {
   return async function (dispatch) {
      try {
         const trandingProducts = await axios.get('/index/get-tranding-products', headers);

         if (trandingProducts && trandingProducts?.data && trandingProducts?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS,
               payload: trandingProducts && trandingProducts?.data,
            });
         } else {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_ERROR,
               payload: trandingProducts && trandingProducts?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getSelectedPrevProduct = function (id) {
   return async function (dispatch) {
      try {
         const productResponse = await axios.get(`/index/get-prev-product/${id}`, headers);
         if (productResponse && productResponse?.data && productResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.SELECTED_PREV_PRODUCT,
               payload: productResponse && productResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const productAddToCart = function (data, img) {
   return async function (dispatch) {
      try {
         const addToCartResponse = await axios.post('/index/add-to-cart-product', data, headers);

         if (addToCartResponse && addToCartResponse?.data && addToCartResponse?.data?.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.ADD_TO_CART,
               payload: addToCartResponse && addToCartResponse?.data,
               img,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserCartProducts = function (token) {
   return async function (dispatch) {
      try {
         const getProductsResponse = await axios.get(`/index/get-cart-products/${token}`);

         if (getProductsResponse && getProductsResponse?.data && getProductsResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_CART_ITEMS,
               payload: getProductsResponse && getProductsResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const removerProductsFromCart = function (id, token) {
   return async function (dispatch) {
      try {
         const cartResponse = await axios.patch(`/index/remove-cart-item?id=${id}&token=${token}`, headers);

         if (cartResponse && cartResponse?.data && cartResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.REMOVER_CART_ITEMS,
               payload: cartResponse && cartResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const addToWishList = function (id, token) {
   return async function (dispatch) {
      const data = {
         id,
         token,
      };
      const wishListResponse = await axios.post('/index/add-to-wish-list', data, headers);

      if (wishListResponse && wishListResponse?.data && wishListResponse?.data.success) {
         dispatch({
            type: INDEX_ACTION_TYPE.ADD_TO_WISH_LIST,
            payload: wishListResponse && wishListResponse?.data,
         });
      }
   };
};

export const getUserWishListProducts = function (token) {
   return async function (dispatch) {
      const wishListResponse = await axios.get(`/index/get-wishlist-products?token=${token}`, headers);

      if (wishListResponse && wishListResponse?.data && wishListResponse?.data.success) {
         dispatch({
            type: INDEX_ACTION_TYPE.GET_WISH_LIST_PRODUCTS,
            payload: wishListResponse && wishListResponse?.data,
         });
      }
   };
};

export const sendNewsLetter = function (data) {
   return async function (dispatch) {
      try {
         const newsLetterResponse = await axios.post('/index/news-letter', data, headers);

         if (newsLetterResponse && newsLetterResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.SEND_NEWS_LETTER,
               payload: newsLetterResponse && newsLetterResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
