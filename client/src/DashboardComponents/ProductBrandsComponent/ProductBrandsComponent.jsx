import React from "react";
import * as brand from "./ProductBrandsComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductBransTableComponent from "../ProductBransTableComponent/ProductBransTableComponent";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import { useSelector } from "react-redux";
import { deleteAllBrand } from "../../Redux/Actions/adminAction";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";

const link = "/dashboard/upload-product-brand";

function ProductBrandsComponent() {
   const productBrands = useSelector((state) => state.admin.productBrands);

   return (
      <brand.div>
         <DashboardNavbarComponent />
         <brand.innerDiv>
            <ProductSectionFeatureComponent
               state={productBrands}
               pageLink={link}
               field={"brands"}
               action={deleteAllBrand}
            />
            <ProductBransTableComponent />
            <TableFooterComponent action={"brands"} state={productBrands} />
         </brand.innerDiv>
      </brand.div>
   );
}

export default ProductBrandsComponent;
