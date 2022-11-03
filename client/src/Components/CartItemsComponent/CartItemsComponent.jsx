import React, { useEffect, useState } from 'react';
import ProductIncComponent from '../../HelperComponents/ProductIncComponent/ProductIncComponent';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import backendConfigData from '../../backendConfig';
import { removerProductsFromCart } from '../../Redux/Actions/indexActions';
import { removeCartItemLoadingHandler, qtyPricHandler } from '../../Redux/Actions/indexAppAction';
import { useSelector, useDispatch } from 'react-redux';

function CartItemsComponent({ data }) {
   const [Qty, setQty] = useState(1);

   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);

   const getStateValue = function (value) {
      setQty(value);
      dispatch(qtyPricHandler({ qty: value, productId: data.cartItem._id }));
   };

   const RemoveCartItems = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(removerProductsFromCart(id, token));
         dispatch(removeCartItemLoadingHandler(true, id));
      }
   };

   useEffect(() => {
      if (data?.qty) {
         setQty(data.qty);
      }
   }, [data]);

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
            <ProductIncComponent getValue={getStateValue} qtyValue={Qty} />
         </td>
         <td>
            <h4 className="mb-0">
               {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
               {data.cartItem?.salePrice ? (data.cartItem.salePrice * Qty).toFixed(2) : (data.cartItem.price * Qty).toFixed(2)}
            </h4>
         </td>
         <td>
            <VscClose onClick={() => RemoveCartItems(data.cartItem._id)} />
         </td>
      </tr>
   );
}

export default CartItemsComponent;
