import React from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import BannerComponent from '../../Components/BannerComponent/BannerComponent';
import ShopHeadingComponent from '../../Components/ShopHeadingComponent/ShopHeadingComponent';
import TrandingProductsComponent from '../../Components/TrandingProductsComponent/TrandingProductsComponent';

function HomePage() {
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
