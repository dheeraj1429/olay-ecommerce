import React from "react";
import * as table from "./AllProductTableComponent.style";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import { useSelector } from "react-redux";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";
import AllProductsTableComponent from "../AllProductsTableComponent/AllProductsTableComponent";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { FcPaid } from "@react-icons/all-files/fc/FcPaid";
import { FcOk } from "@react-icons/all-files/fc/FcOk";
import { FcIcons8Cup } from "@react-icons/all-files/fc/FcIcons8Cup";
import { FcHighPriority } from "@react-icons/all-files/fc/FcHighPriority";
import { FcCurrencyExchange } from "@react-icons/all-files/fc/FcCurrencyExchange";
import { deleteAllProducts } from "../../Redux/Actions/adminAction";

const items = [
   { value: "", Option: "None" },
   { value: "Sort A - Z", Option: "Sort A - Z", icon: <FcAlphabeticalSortingAz /> },
   { value: "Sort Z - A", Option: "Sort Z - A", icon: <FcAlphabeticalSortingZa /> },
   // { value: "Sort by order", Option: "Sort by order", icon: <FcPaid /> },
   // { value: "Published", Option: "Published", icon: <FcOk /> },
   { value: "Out of stock", Option: "Out of stock", icon: <FcHighPriority /> },
   // { value: "Sale", Option: "Sale", icon: <FcCurrencyExchange /> },
   { value: "Delete all", Option: "Delete all", icon: <FcIcons8Cup /> },
];

const link = "/dashboard/upload-products";

function AllProductTableComponent() {
   const allProducts = useSelector((state) => state.admin.allProducts);

   return (
      <table.div>
         <ProductSectionFeatureComponent
            state={allProducts}
            pageLink={link}
            field={"products"}
            items={items}
            action={deleteAllProducts}
         />
         <AllProductsTableComponent />
         <TableFooterComponent state={allProducts} action={"products"} />
      </table.div>
   );
}

export default AllProductTableComponent;
