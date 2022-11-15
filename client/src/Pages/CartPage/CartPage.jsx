import React, { useEffect } from 'react';
import * as styled from './CartPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import ProductCartPayComponent from '../../Components/ProductCartPayComponent/ProductCartPayComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomProducts, getUserCartProducts } from '../../Redux/Actions/indexActions';
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent';
import settings from '../../slickConfig';
import Slider from 'react-slick';
import ProductViewComponent from '../../Components/ProductViewComponent/ProductViewComponent';
import ProductAddToCartSideNoficationComponent from '../../Components/ProductAddToCartSideNoficationComponent/ProductAddToCartSideNoficationComponent';
import ShopHeadingComponent from '../../Components/ShopHeadingComponent/ShopHeadingComponent';
import { useNavigate } from 'react-router';
import { getCartItemsLoadingHandler, getRandomProductsLoadingHandler } from '../../Redux/Actions/indexAppAction';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';

function CartPage() {
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { auth } = useSelector((state) => state.auth);
   const { randomProducts, showProductPrev, randomProductsLoading } = useSelector((state) => state.index);

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getRandomProducts());
         dispatch(getUserCartProducts(auth.userObject.token));
         dispatch(getRandomProductsLoadingHandler(true));
         dispatch(getCartItemsLoadingHandler(true));
      } else {
         navigation('/auth/signin');
      }
   }, []);

   return (
      <styled.div>
         <ProductViewComponent show={showProductPrev} />
         <ProductAddToCartSideNoficationComponent />
         <NavbarComponent />
         <div className="text-center mt-3 heading_div">
            <h1>Shopping Bag</h1>
         </div>
         <div className="side_padding_one">
            <ProductCartPayComponent />
         </div>

         <ShopHeadingComponent heading={'You may also like'} subHeading={'Mirum est notare quam littera gothica quam nunc putamus parum claram!'} />

         <div className="side_padding_one">
            {!!randomProductsLoading ? (
               <div className="w-full flex items-center justify-center">
                  <SpnnerComponent blackSpenner={true} />
               </div>
            ) : !!randomProducts && randomProducts.success && randomProducts?.product ? (
               <Slider {...settings}>
                  {randomProducts.product.map((el) => (
                     <ProductCardComponent key={el._id} data={el} />
                  ))}
               </Slider>
            ) : null}
         </div>
      </styled.div>
   );
}

export default CartPage;
