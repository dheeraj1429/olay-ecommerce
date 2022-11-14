import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';
import axios from 'axios';
import { headers } from '../../headers';
import backendConfigData from '../../backendConfig';
import { AUTH_ACTION_TYPE } from '../ActionTypes/authActionType';

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

// when the user click the preview icons to show some details about product.
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

// product add to cart function
export const productAddToCart = function (data, img) {
   return async function (dispatch) {
      try {
         const addToCartResponse = await axios.post(`/index/add-to-cart-product/${data.token}`, data, headers);

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

// show all user product from the carts
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

// remove cart products when the user click on the close button.
export const removerProductsFromCart = function (id, token) {
   return async function (dispatch) {
      try {
         const cartResponse = await axios.patch(`/index/remove-cart-item/${token}?id=${id}&token=${token}`, headers);

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

// add to wishlist feature
export const addToWishList = function (id, token) {
   return async function (dispatch) {
      const data = {
         id,
         token,
      };
      const wishListResponse = await axios.post(`/index/add-to-wish-list/${token}`, data, headers);

      if (wishListResponse && wishListResponse?.data && wishListResponse?.data.success) {
         dispatch({
            type: INDEX_ACTION_TYPE.ADD_TO_WISH_LIST,
            payload: wishListResponse && wishListResponse?.data,
         });
      }
   };
};

// grab al the user wishlist products
export const getUserWishListProducts = function (token) {
   return async function (dispatch) {
      const wishListResponse = await axios.get(`/index/get-wishlist-products/${token}?token=${token}`, headers);

      if (wishListResponse && wishListResponse?.data && wishListResponse?.data.success) {
         dispatch({
            type: INDEX_ACTION_TYPE.GET_WISH_LIST_PRODUCTS,
            payload: wishListResponse && wishListResponse?.data,
         });
      }
   };
};

// send subscription mail with news letter.
export const sendNewsLetter = function (data) {
   return async function (dispatch) {
      try {
         const newsLetterResponse = await axios.post(`/index/news-letter/${data.token}`, data, headers);

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

// get the single products
export const getSingleProduct = function (id) {
   return async function (dispatch) {
      try {
         const productResponse = await axios.get(`/index/get-single_product/${id}`);
         if (productResponse && productResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_SINGLE_PRODUCT,
               payload: productResponse && productResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getRandomProducts = function () {
   return async function (dispatch) {
      try {
         const response = await axios.get('/index/get-random-products', headers);

         if (response && response?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_RANDOM_PRODUCTS,
               payload: response && response?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const storeUserShippingInformation = function (data, token) {
   return async function (dispatch) {
      try {
         const shippingResponse = await axios.post(`/index/user-shipping-infomation/${token}`, data, headers);

         if (shippingResponse && shippingResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.STORE_USER_SHIPPING_INFORMATION,
               payload: shippingResponse && shippingResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserAddressDetails = function (token, addressInfo) {
   return async function (dispatch) {
      try {
         const userResponse = await axios.get(`/index/get-login-user-address-info/${token}/${addressInfo}`, headers);
         if (userResponse && userResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_USER_INFORMATION,
               payload: userResponse && userResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const orderPlaceByCashOnDelivery = function (data, token) {
   return async function (dispatch) {
      try {
         const orderResponse = await axios.post(`/index/place-user-cash-on-delivery/${token}`, data, headers);
         if (orderResponse && orderResponse?.data && orderResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.PLACE_USER_ORDER,
               payload: orderResponse && orderResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserData = function (token) {
   return async function (dispatch) {
      try {
         const userResponse = await axios.get(`/index/get-user-data/${token}`, headers);

         if (userResponse && userResponse?.data && userResponse?.data?.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_USER_DATA,
               payload: userResponse && userResponse?.data,
            });
         } else {
            console.log(userResponse);
         }
      } catch (err) {
         console.log(err);
      }
   };
};

// when user update the profile with my account page.
export const updateUserData = function (data) {
   return async function (dispatch) {
      try {
         const userUpdateResponse = await axios.patch(`/index/update-user-info/${data.token}`, data, headers);

         console.log(userUpdateResponse);

         if (userUpdateResponse && userUpdateResponse?.data && userUpdateResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.UPDATE_USER_INFO,
               payload: {
                  success: userUpdateResponse && userUpdateResponse?.data?.success,
                  message: userUpdateResponse && userUpdateResponse?.data?.message,
               },
            });
            dispatch({
               type: AUTH_ACTION_TYPE.AUTH_UPDATE_USER,
               payload: userUpdateResponse && userUpdateResponse?.data && userUpdateResponse?.data?.user,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const insertUserAddress = function (data) {
   return async function (dispatch) {
      try {
         const addressResponse = await axios.post(`/index/insert-new-address/${data.token}`, data, headers);

         if (addressResponse && addressResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.SAVE_USER_ADDRESS,
               payload: addressResponse && addressResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserAddress = function (token) {
   return async function (dispatch) {
      try {
         const addressRespose = await axios.get(`/index/get-user-address/${token}`, headers);

         if (addressRespose && addressRespose?.data && addressRespose?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_USER_ADDRESS,
               payload: addressRespose && addressRespose?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteUserAddress = function (id, token) {
   return async function (dispatch) {
      try {
         const userAddressDeleteResponse = await axios.delete(`/index/delete-user-address/${token}/${id}`, headers);

         if (userAddressDeleteResponse && userAddressDeleteResponse?.data && userAddressDeleteResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.DELETE_USER_ADDRESS,
               payload: userAddressDeleteResponse && userAddressDeleteResponse?.data,
               deletedId: id,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserSingleAddress = function (data) {
   return async function (dispatch) {
      try {
         const addressResponse = await axios.get(`/index/get-user-address/${data.token}/${data.id}`, headers);

         if (addressResponse && addressResponse?.data) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_USER_SINGLE_ADDRESS,
               payload: addressResponse && addressResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const updateUserAddress = function (data, token) {
   return async function (dispatch) {
      try {
         const updateResponse = await axios.patch(`/index/update-user-address/${token}`, data, headers);
         if (updateResponse && updateResponse?.data && updateResponse?.data?.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.UPDATE_USER_SINGLE_ADDRESS,
               payload: updateResponse && updateResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserAllOrders = function (token) {
   return async function (dispatch) {
      try {
         const orderResponse = await axios.get(`/index/get-user-order-info/${token}`);

         if (orderResponse && orderResponse?.data && orderResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_USER_ALL_ORDERS,
               payload: orderResponse && orderResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const getUserSingleOrderDetails = function (token, id) {
   return async function (dispatch) {
      try {
         const orderResponse = await axios.get(`/index/get-user-single-order-info/${token}/${id}`, headers);
         if (orderResponse && orderResponse?.data && orderResponse?.data.success) {
            dispatch({
               type: INDEX_ACTION_TYPE.GET_SINGLE_ORDER_DETAILS,
               payload: orderResponse && orderResponse?.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
