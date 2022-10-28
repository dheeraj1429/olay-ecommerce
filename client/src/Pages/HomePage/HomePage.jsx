import React, { useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import BannerComponent from '../../Components/BannerComponent/BannerComponent';
import ShopHeadingComponent from '../../Components/ShopHeadingComponent/ShopHeadingComponent';
import TrandingProductsComponent from '../../Components/TrandingProductsComponent/TrandingProductsComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getUserWishListProducts } from '../../Redux/Actions/indexActions';

function HomePage() {
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth);

   useEffect(() => {
      if (!!auth && auth?.auth && auth?.auth?.userObject) {
         dispatch(getUserWishListProducts(auth.auth.userObject.token));
      }
   }, [!!auth]);

   return (
      <div>
         <NavbarComponent />
         <BannerComponent
            heading={
               <h1>
                  Oh, <br /> Hello Newness!
               </h1>
            }
            subHeading={
               <p>
                  As rich and unique as the coffee beans it is intended for, this little scoop will make your morning{' '}
                  <br /> ritual a special occasion every day.
               </p>
            }
         />
         <ShopHeadingComponent
            heading={'Deals Of The Day'}
            subHeading={'Mirum est notare quam littera gothica quam nunc putamus parum claram!'}
         />
         <TrandingProductsComponent />
      </div>
   );
}

export default HomePage;
