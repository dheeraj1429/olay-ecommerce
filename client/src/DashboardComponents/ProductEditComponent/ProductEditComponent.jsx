import React from "react";
import * as edit from "./ProductEditComponent.style";
import UploadProductComponent from "../UploadProductComponent/UploadProductComponent";

function ProductEditComponent() {
   return (
      <edit.div>
         <UploadProductComponent />
      </edit.div>
   );
}

export default ProductEditComponent;
