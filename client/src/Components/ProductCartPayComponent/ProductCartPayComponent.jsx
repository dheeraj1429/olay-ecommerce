import React, { useEffect, useState } from 'react';
import * as styled from './ProductCartPayComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import CartItemsComponent from '../CartItemsComponent/CartItemsComponent';
import { useSelector } from 'react-redux';

const row = [
   { value: 'Image', label: 'Product Image' },
   { value: 'Product', label: 'Product' },
   { value: 'Quntity', label: 'Quntity' },
   { value: 'Total', label: 'Total' },
   { value: 'edit', label: '' },
];

function ProductCartPayComponent() {
   const [CartPrice, setCartPrice] = useState(0);
   const { cartItems } = useSelector((state) => state.index);

   useEffect(() => {
      if (!!cartItems && cartItems.cartItems.length) {
         const priceAr = cartItems.cartItems
            .map((el) => (el.cartItem?.salePrice ? el.cartItem.salePrice * el.qty : el.cartItem.price * el.qty))
            .reduce((acc, crv) => {
               return acc + crv;
            }, 0);
         setCartPrice(priceAr.toFixed(2));
      }
   }, [cartItems]);

   return (
      <styled.div className="d-flex mt-5">
         {!!cartItems && cartItems.success ? (
            <>
               <div className="cart_items">
                  <table>
                     <tr className="light_table_tr">
                        {row.map((el) => (
                           <th key={el.value}>{el.label}</th>
                        ))}
                     </tr>

                     {cartItems.cartItems.map((el) => (
                        <CartItemsComponent key={el._id} data={el} />
                     ))}
                  </table>
               </div>
               <div className="coupon_div">
                  <div className="coupon_form_div">
                     <div className="d-flex align-items-center justify-content-between">
                        <h5>Subtotal</h5>
                        <p>${CartPrice}</p>
                     </div>
                     <hr />
                     <input type="text" placeholder="Coupon code" />

                     <CustombuttonComponent innerText={'Proceed to checkout'} btnCl={'checkout mt-4'} />
                  </div>
               </div>
            </>
         ) : (
            <div className="text-center">
               <p>No cart products</p>
            </div>
         )}
      </styled.div>
   );
}

export default ProductCartPayComponent;
