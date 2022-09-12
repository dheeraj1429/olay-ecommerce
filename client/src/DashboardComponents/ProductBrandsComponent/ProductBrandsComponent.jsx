import React from "react";
import * as brand from "./ProductBrandsComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductBransTableComponent from "../ProductBransTableComponent/ProductBransTableComponent";

function ProductBrandsComponent() {
   return (
      <brand.div>
         <DashboardNavbarComponent />
         <brand.innerDiv>
            <ProductBransTableComponent />
         </brand.innerDiv>
      </brand.div>
   );
}

export default ProductBrandsComponent;
