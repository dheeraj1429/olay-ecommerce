import React, { useEffect } from "react";
import * as tags from "./AllProductsTagsComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import ProductSectionFeatureComponent from "../ProductSectionFeatureComponent/ProductSectionFeatureComponent";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { FcOk } from "@react-icons/all-files/fc/FcOk";
import { FcIcons8Cup } from "@react-icons/all-files/fc/FcIcons8Cup";
import { useDispatch, useSelector } from "react-redux";
import { getProductTags } from "../../Redux/Actions/adminAction";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";
import AllProductsTagsTableComponent from "../AllProductsTagsTableComponent/AllProductsTagsTableComponent";
import { deleteAllTags } from "../../Redux/Actions/adminAction";

const link = "/dashboard/insert/new-product-tags";

const items = [
   { value: "", Option: "None" },
   { value: "Sort A - Z", Option: "Sort A - Z", icon: <FcAlphabeticalSortingAz /> },
   { value: "Sort Z - A", Option: "Sort Z - A", icon: <FcAlphabeticalSortingZa /> },
   { value: "Published", Option: "Published", icon: <FcOk /> },
   { value: "Delete all", Option: "Delete all", icon: <FcIcons8Cup /> },
];

function AllProductsTagsComponent() {
   const dispatch = useDispatch();
   const allProductsTags = useSelector((state) => state.admin.allProductsTags);

   useEffect(() => {
      dispatch(getProductTags(0));
   }, []);

   return (
      <tags.div>
         <DashboardNavbarComponent />
         <tags.spaceDiv>
            <ProductSectionFeatureComponent
               state={allProductsTags}
               pageLink={link}
               field={"tags"}
               items={items}
               action={deleteAllTags}
            />
            <AllProductsTagsTableComponent />
            <TableFooterComponent state={allProductsTags} action={"tags"} />
         </tags.spaceDiv>
      </tags.div>
   );
}

export default AllProductsTagsComponent;
