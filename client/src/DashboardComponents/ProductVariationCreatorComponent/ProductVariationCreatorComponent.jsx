import React from 'react';
import * as variation from './ProductVariationCreatorComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import AllProductTableViewComponent from '../AllProductTableViewComponent/AllProductTableViewComponent';

function ProductVariationCreatorComponent() {
   return (
      <variation.div>
         <DashboardNavbarComponent />

         <variation.spaceDiv>
            <HeadingComponent
               Heading={'Create product variations'}
               subHeading={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
               }
            />
            <AllProductTableViewComponent />
         </variation.spaceDiv>
      </variation.div>
   );
}

export default ProductVariationCreatorComponent;
