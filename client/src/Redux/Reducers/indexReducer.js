import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';

const INITAL_STATE = {
   showCardSideBar: false,
};

const shopReducer = function (state = INITAL_STATE, action) {
   switch (action.type) {
      case INDEX_ACTION_TYPE.SHOW_AND_HIDE_CART_SIDEBAR:
         return {
            ...state,
            showCardSideBar: action.payload,
         };

      default:
         return {
            ...state,
         };
   }
};

export default shopReducer;
