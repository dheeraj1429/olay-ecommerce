import React from 'react';
import * as styled from './TrandingProductsComponent.style';
import { useSelector } from 'react-redux';
import ProductCardComponent from '../ProductCardComponent/ProductCardComponent';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import ProductViewComponent from '../ProductViewComponent/ProductViewComponent';
import ProductAddToCartSideNoficationComponent from '../ProductAddToCartSideNoficationComponent/ProductAddToCartSideNoficationComponent';

function TrandingProductsComponent() {
   const { trandingProducts, trandingProductsLoading, showProductPrev } = useSelector((state) => state.index);

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
               <div className="grid_div">
                  {trandingProducts.products.map((el) => (
                     <ProductCardComponent key={el._id} data={el} />
                  ))}
               </div>
            ) : null}
            <div className="center_div">
               <CustombuttonComponent innerText={'See more'} btnCl={'see_more'} />
            </div>
         </div>
      </styled.div>
   );
}

export default TrandingProductsComponent;
