import React from 'react';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import backendConfigData from '../../backendConfig';
import { removerProductsFromCart } from '../../Redux/Actions/indexActions';
import { removeCartItemLoadingHandler } from '../../Redux/Actions/indexAppAction';
import { useSelector, useDispatch } from 'react-redux';

function CartItemsComponent({ data }) {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);

   const RemoveCartItems = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(removerProductsFromCart(id, token));
         dispatch(removeCartItemLoadingHandler(true, id));
      }
   };

   return (
      <tr>
         <td>
            <div className="product-cart-image-div">
               <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImagesCompress/${data.cartItem.productImage}`} />
            </div>
         </td>
         <td>
            <h5>{data.cartItem.name.length > 130 ? `${data.cartItem.name.slice(130)}...` : data.cartItem.name}</h5>
         </td>
         <td>
            <p className="mb-0">{data.qty}</p>
         </td>
         <td>
            <h4 className="mb-0">
               {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
               {data.cartItem?.salePrice ? data.cartItem.salePrice.toFixed(2) : data.cartItem.price.toFixed(2)}
            </h4>
         </td>
         <td>
            <h4 className="mb-0">
               {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
               {data.cartItem?.salePrice ? (data.cartItem.salePrice * data.qty).toFixed(2) : (data.cartItem.price * data.qty).toFixed(2)}
            </h4>
         </td>
         <td>
            <VscClose onClick={() => RemoveCartItems(data.cartItem._id)} />
         </td>
      </tr>
   );
}

export default React.memo(CartItemsComponent);
