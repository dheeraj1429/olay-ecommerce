import React from "react";
import * as sale from "./ProductSaleLabelComponent.style";
import VariationSwatchesComponent from "../VariationSwatchesComponent/VariationSwatchesComponent";

function ProductSaleLabelComponent() {
   return (
      <sale.div>
         <VariationSwatchesComponent label={true} />
      </sale.div>
   );
}

export default ProductSaleLabelComponent;
