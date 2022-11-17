import React from 'react';
import * as styled from './ShowUserCartProductDetailsComponent.style';
import { useSelector } from 'react-redux';
import backendConfigData from '../../backendConfig';

function ShowUserCartProductDetailsComponent() {
   const { cartItems } = useSelector((state) => state.index);
   const { shopInformation } = useSelector((state) => state.admin);

   return (
      <styled.div className="border-start p-5">
         {!!cartItems && cartItems?.success && cartItems?.cartItems[0]?.cartItems.length
            ? cartItems.cartItems[0].cartItems.map((el) => (
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
               {!!cartItems && cartItems?.success && cartItems?.cartItems[0].cartItems.length ? (
                  <strong>
                     {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                     {cartItems.cartItems[0]?.cartItems
                        .map((elm) => (elm.cartItem?.salePrice && !!elm.cartItem.salePrice ? elm.cartItem.salePrice * elm.qty : elm.cartItem.price * elm.qty))
                        .reduce((acc, crv) => acc + crv, 0)}
                  </strong>
               ) : (
                  <strong>00</strong>
               )}
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
               {!!cartItems && cartItems?.success && cartItems?.cartItems.length ? (
                  <strong>
                     {cartItems.cartItems[0]?.cartItems
                        .map((elm) => (elm.cartItem?.salePrice && !!elm.cartItem.salePrice ? elm.cartItem.salePrice * elm.qty : elm.cartItem.price * elm.qty))
                        .reduce((acc, crv) => acc + crv, 0)}
                  </strong>
               ) : (
                  <strong>00</strong>
               )}
            </h4>
         </div>
      </styled.div>
   );
}

export default React.memo(ShowUserCartProductDetailsComponent);
