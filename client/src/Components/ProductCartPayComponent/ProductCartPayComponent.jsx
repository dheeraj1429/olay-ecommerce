import React from 'react';
import * as styled from './ProductCartPayComponent.style';
import CartItemsComponent from '../CartItemsComponent/CartItemsComponent';
import { useSelector } from 'react-redux';
import ProductCartTotalWithCouponComponent from '../ProductCartTotalWithCouponComponent/ProductCartTotalWithCouponComponent';

const row = [
   { value: 'Image', label: 'Product Image' },
   { value: 'Product', label: 'Product' },
   { value: 'Quntity', label: 'Quntity' },
   { value: 'Price', label: 'Price' },
   { value: 'Total', label: 'Total' },
   { value: 'edit', label: '' },
];

function ProductCartPayComponent() {
   const { cartItems } = useSelector((state) => state.index);

   return (
      <styled.div className="d-flex mt-5">
         {!!cartItems && cartItems.success && cartItems.cartItems.length ? (
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
               <ProductCartTotalWithCouponComponent />
            </>
         ) : (
            <div className="w-full text-center border p-3 rounded-lg">
               <p className=" text-2xl mb-0">No cart products</p>
            </div>
         )}
      </styled.div>
   );
}

export default React.memo(ProductCartPayComponent);
