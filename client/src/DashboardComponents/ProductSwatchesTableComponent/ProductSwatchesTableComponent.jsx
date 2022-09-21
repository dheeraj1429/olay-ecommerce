import React, { useEffect } from "react";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import * as table from "./ProductSwatchesTableComponent.style";
import { getproductSwatches, removeAllProductSwatches } from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { FcIcons8Cup } from "@react-icons/all-files/fc/FcIcons8Cup";
import AllSwatchTableComponent from "../AllSwatchTableComponent/AllSwatchTableComponent";

const link = "/dashboard/variation-swatches/create";

const items = [
   { value: "", Option: "None" },
   { value: "Sort A - Z", Option: "Sort A - Z", icon: <FcAlphabeticalSortingAz /> },
   { value: "Sort Z - A", Option: "Sort Z - A", icon: <FcAlphabeticalSortingZa /> },
   { value: "Delete all", Option: "Delete all", icon: <FcIcons8Cup /> },
];

function ProductSwatchesTableComponent() {
   const dispatch = useDispatch();

   const allProductSwatches = useSelector((state) => state.admin.allProductSwatches);

   useEffect(() => {
      dispatch(getproductSwatches());
   }, []);

   return (
      <table.div>
         <DashboardNavbarComponent />

         <table.spaceDiv>
            <ProductSectionFeatureComponent state={allProductSwatches} pageLink={link} field={"allSwatches"} items={items} action={removeAllProductSwatches} />
            <AllSwatchTableComponent />
         </table.spaceDiv>
      </table.div>
   );
}

export default ProductSwatchesTableComponent;
