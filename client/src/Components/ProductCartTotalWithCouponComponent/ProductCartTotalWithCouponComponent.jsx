import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import * as styled from './ProductCartTotalWithCouponComponent.style';
import { useNavigate } from 'react-router';

function ProductCartTotalWithCouponComponent() {
   const [CartPrice, setCartPrice] = useState(0);
   const navigator = useNavigate();

   const { shopInformation } = useSelector((state) => state.admin);
   const { cartItems } = useSelector((state) => state.index);

   const checkOutHandler = function () {
      if (!!cartItems && cartItems.success && cartItems.cartItems.length) {
         navigator('/checkout');
      } else {
         navigator('/');
      }
   };

   useEffect(() => {
      if (!!cartItems && cartItems.cartItems.length) {
         console.log(cartItems.cartItems);

         const priceAr = cartItems.cartItems[0].cartItems
            .map((el) => (el.cartItem?.salePrice && !!el.cartItem.salePrice ? el.cartItem.salePrice * el.qty : el.cartItem.price * el.qty))
            .reduce((acc, crv) => {
               return acc + crv;
            }, 0);
         setCartPrice(priceAr.toFixed(2));
      }
   }, [cartItems]);

   return (
      <styled.div>
         <div className="coupon_div">
            <div className="coupon_form_div">
               <div className="d-flex align-items-center justify-content-between">
                  <h5>Subtotal</h5>
                  <p>
                     {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                     {CartPrice}
                  </p>
               </div>
               <hr />
               <input type="text" placeholder="Coupon code" />

               <CustombuttonComponent innerText={'Proceed to checkout'} onClick={checkOutHandler} btnCl={'checkout mt-4'} />
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(ProductCartTotalWithCouponComponent);
