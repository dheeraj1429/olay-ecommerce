import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';

const INITAL_STATE = {
   showCardSideBar: false,
   trandingProducts: null,
   trandingProductsLoading: false,
   trandingProductsError: false,
   showProductPrev: false,
   selectedPrevProduct: null,
   selectedPrevProductLoading: false,
   selectedPrevProductError: null,
   addToCartInfo: null,
   addToCartLoading: false,
   cartProductAddedImage: null,
   cartItems: null,
};

const shopReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case INDEX_ACTION_TYPE.SHOW_AND_HIDE_CART_SIDEBAR:
         return {
            ...state,
            showCardSideBar: action.payload,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS:
         return {
            ...state,
            trandingProducts: action.payload,
            trandingProductsLoading: false,
            trandingProductsError: false,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_ERROR:
         return {
            ...state,
            trandingProducts: null,
            trandingProductsLoading: false,
            trandingProductsError: action.payload,
         };

      case INDEX_ACTION_TYPE.GET_TRANDING_PRODUCTS_LOADING:
         return {
            ...state,
            trandingProductsLoading: action.payload,
         };

      case INDEX_ACTION_TYPE.SHOW_PRODUCT_PREV:
         return {
            ...state,
            showProductPrev: action.payload,
         };

      case INDEX_ACTION_TYPE.SELECTED_PREV_PRODUCT:
         return {
            ...state,
            selectedPrevProduct: action.payload,
            selectedPrevProductLoading: false,
            selectedPrevProductError: null,
         };

      case INDEX_ACTION_TYPE.SELECTED_PREV_PRODUCT_LOADING:
         return {
            ...state,
            selectedPrevProductLoading: action.payload,
            selectedPrevProductError: null,
         };

      case INDEX_ACTION_TYPE.REMOVER_SELECTED_PRODUCT:
         return {
            ...state,
            selectedPrevProductLoading: false,
            selectedPrevProductError: null,
            selectedPrevProduct: null,
         };

      case INDEX_ACTION_TYPE.ADD_TO_CART:
         const checkProductIsExistsInCart = function () {
            const exist = state.cartItems.cartItems.find(
               (el) => el.cartItem._id === action.payload.insertedProduct._id
            );

            if (exist) {
               return state.cartItems.cartItems.map((el) =>
                  el.cartItem._id === action.payload.insertedProduct._id
                     ? { ...el, qty: el.qty + action.payload.insertProductQuntity }
                     : el
               );
            } else {
               return state.cartItems.cartItems.concat(
                  Object.assign({
                     cartItem: action.payload.insertedProduct,
                     qty: action.payload.insertProductQuntity,
                  })
               );
            }
         };

         if (action.payload.success) {
            return {
               ...state,
               addToCartInfo: action.payload,
               addToCartLoading: false,
               cartProductAddedImage: action.img,
               cartItems: {
                  ...state.cartItems,
                  cartItems: checkProductIsExistsInCart(),
               },
            };
         } else {
            return {
               ...state,
               addToCartInfo: action.payload,
               addToCartLoading: false,
            };
         }

      case INDEX_ACTION_TYPE.ADD_TO_CART_LOADING:
         return {
            ...state,
            addToCartLoading: action.payload,
         };

      case INDEX_ACTION_TYPE.REMOVE_SHOW_CART_ITEM_NOTIFICATION:
         return {
            ...state,
            cartProductAddedImage: action.payload,
         };

      case INDEX_ACTION_TYPE.GET_CART_ITEMS:
         return {
            ...state,
            cartItems: action.payload,
         };

      case INDEX_ACTION_TYPE.REMOVER_CART_ITEMS:
         return {
            ...state,
            cartItems: {
               ...state.cartItems,
               cartItems: state.cartItems.cartItems.filter((el) => el.cartItem._id !== action.payload.removeProductId),
            },
         };

      default:
         return {
            ...state,
         };
   }
};

export default shopReducer;
