import React from "react";
import VariationSwatchesComponent from "../VariationSwatchesComponent/VariationSwatchesComponent";
import * as size from "./ProductSizeVariationComponent.style";

function ProductSizeVariationComponent() {
   return (
      <size.div>
         <VariationSwatchesComponent variation={"size"} />
      </size.div>
   );
}

export default ProductSizeVariationComponent;
