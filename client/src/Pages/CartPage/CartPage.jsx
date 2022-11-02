import React, { useEffect } from 'react';
import * as styled from './CartPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import ProductCartPayComponent from '../../Components/ProductCartPayComponent/ProductCartPayComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartProducts } from '../../Redux/Actions/indexActions';

function CartPage() {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(getUserCartProducts(auth.userObject.token));
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="text-center mt-3 heading_div">
            <h1>Shopping Bag</h1>
         </div>
         <div className="side_padding_one">
            <ProductCartPayComponent />
         </div>
      </styled.div>
   );
}

export default CartPage;
