import React from 'react';
import * as styled from './TrandingProductsComponent.style';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import ProductViewComponent from '../ProductViewComponent/ProductViewComponent';
import ProductAddToCartSideNoficationComponent from '../ProductAddToCartSideNoficationComponent/ProductAddToCartSideNoficationComponent';

function TrandingProductsComponent() {
   const { trandingProducts, trandingProductsLoading, showProductPrev } = useSelector((state) => state.index);

   const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   return (
      <styled.div>
         <ProductViewComponent show={showProductPrev} />
         <ProductAddToCartSideNoficationComponent />
         <div className="side_padding_one">
            {!!trandingProducts && trandingProductsLoading ? (
               <div className="center_div">
                  <SpnnerComponent blackSpenner={true} />
               </div>
            ) : null}
            {!!trandingProducts && trandingProducts.success && trandingProducts?.products ? (
               <Slider {...settings}>
                  {trandingProducts.products.map((el) => (
                     <ProductCardComponent key={el._id} data={el} />
                  ))}
               </Slider>
            ) : null}
            <div className="center_div">
               <CustombuttonComponent innerText={'See more'} btnCl={'see_more'} />
            </div>
         </div>
      </styled.div>
   );
}

export default TrandingProductsComponent;
