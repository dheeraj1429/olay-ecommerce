import React from "react";
import * as edit from "./ProductBrandEditComponent.style";
import ProductBrandUploadComponent from "../ProductBrandUploadComponent/ProductBrandUploadComponent";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function ProductBrandEditComponent() {
   const { id } = useParams();
   const selectedBrand = useSelector((state) => state.admin.selectedBrand);

   return (
      <edit.div>
         <ProductBrandUploadComponent param={id} selectedBrand={selectedBrand} />
      </edit.div>
   );
}

export default ProductBrandEditComponent;
