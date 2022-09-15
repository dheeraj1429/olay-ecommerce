import React from "react";
import * as table from "./AllProductTableComponent.style";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import { useSelector } from "react-redux";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";
const link = "/";

function AllProductTableComponent() {
   const allProducts = useSelector((state) => state.admin.allProducts);

   return (
      <table.div>
         <ProductSectionFeatureComponent
            state={allProducts}
            pageLink={link}
            field={"products"}
         />
         <TableFooterComponent state={allProducts} action={"products"} />
      </table.div>
   );
}

export default AllProductTableComponent;
