import React, { useState, useEffect } from 'react';
import * as styled from './ShowUserCartProductDetailsComponent.style';
import { useSelector } from 'react-redux';
import backendConfigData from '../../backendConfig';

function ShowUserCartProductDetailsComponent() {
   const [SubTotal, setSubTotal] = useState(0);

   const { cartItems } = useSelector((state) => state.index);
   const { shopInformation } = useSelector((state) => state.admin);

   useEffect(() => {
      if (!!cartItems && cartItems?.success) {
         const subTotal = cartItems.cartItems
            .map((el) => (el.cartItem.salePrice && !!el.cartItem.salePrice ? el.cartItem.salePrice * el.qty : el.cartItem.price * el.qty))
            .reduce((acc, crv) => acc + crv, 0)
            .toFixed(2);
         setSubTotal(subTotal);
      }
   }, [cartItems]);

   return (
      <styled.div className="border-start p-5">
         {!!cartItems && cartItems?.success && cartItems?.cartItems.length
            ? cartItems.cartItems.map((el) => (
                 <>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                       <div className="image_with_content_div d-flex align-items-center">
                          <div className="product_image border">
                             <div className="items_show">{el.qty}</div>
                             <img crossorigin="anonymous" className="img-fluid" src={`${backendConfigData.URL}/productImagesCompress/${el.cartItem.productImage}`} />
                          </div>
                          <p className="ms-2 mb-0 productName">{el.cartItem.name.slice(0, 40)}...</p>
                       </div>
                       <strong>
                          {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                          {el.cartItem?.salePrice ? el.cartItem.salePrice.toFixed(2) : el.cartItem.price.toFixed(2)}
                       </strong>
                    </div>
                 </>
              ))
            : null}
         <div className="border-top py-4 sub">
            <div className="d-flex align-items-center justify-content-between">
               <p>Subtotal</p>
               <strong>
                  {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                  {SubTotal}
               </strong>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
               <p>Shipping</p>
               <span>Calculated at next step</span>
            </div>
         </div>

         <div className="border-top py-3 sub d-flex align-items-center justify-content-between">
            <h5 className="mb-0">Total</h5>
            <h4 className="mb-0">
               <span>{!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}</span>
               {SubTotal}
            </h4>
         </div>
      </styled.div>
   );
}

export default React.memo(ShowUserCartProductDetailsComponent);
