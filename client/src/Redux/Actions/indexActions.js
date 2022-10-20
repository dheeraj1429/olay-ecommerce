import { INDEX_ACTION_TYPE } from '../ActionTypes/indexActionType';
import axios from 'axios';
import { headers } from '../../headers';

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
