import React from "react";
import * as tag from "./AllProductTagEditComponent.styled";
import ProductTagsComponent from "../ProductTagsComponent/ProductTagsComponent";

function AllProductTagEditComponent() {
   return (
      <tag.div>
         <ProductTagsComponent />
      </tag.div>
   );
}

export default AllProductTagEditComponent;
