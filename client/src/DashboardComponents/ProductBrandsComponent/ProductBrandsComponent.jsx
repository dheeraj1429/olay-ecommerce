import React from "react";
import * as brand from "./ProductBrandsComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductBransTableComponent from "../ProductBransTableComponent/ProductBransTableComponent";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import { useSelector } from "react-redux";
import { deleteAllBrand } from "../../Redux/Actions/adminAction";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { FcPaid } from "@react-icons/all-files/fc/FcPaid";
import { FcOk } from "@react-icons/all-files/fc/FcOk";
import { FcIcons8Cup } from "@react-icons/all-files/fc/FcIcons8Cup";

const items = [
   { value: "", Option: "None" },
   { value: "Sort A - Z", Option: "Sort A - Z", icon: <FcAlphabeticalSortingAz /> },
   { value: "Sort Z - A", Option: "Sort Z - A", icon: <FcAlphabeticalSortingZa /> },
   { value: "Sort by order", Option: "Sort by order", icon: <FcPaid /> },
   { value: "Published", Option: "Published", icon: <FcOk /> },
   { value: "Delete all", Option: "Delete all", icon: <FcIcons8Cup /> },
];

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
               items={items}
            />
            <ProductBransTableComponent />
            <TableFooterComponent action={"brands"} state={productBrands} />
         </brand.innerDiv>
      </brand.div>
   );
}

export default ProductBrandsComponent;
