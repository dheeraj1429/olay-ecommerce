import React from "react";
import * as tags from "./ProductTagsComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductTagsInnerComponent from "../ProductTagsInnerComponent/ProductTagsInnerComponent";

function ProductTagsComponent() {
   return (
      <tags.div>
         <DashboardNavbarComponent />
         <tags.mainDiv>
            <ProductTagsInnerComponent />
         </tags.mainDiv>
      </tags.div>
   );
}

export default ProductTagsComponent;
