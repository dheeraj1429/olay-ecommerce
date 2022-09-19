import React from "react";
import * as tags from "./AllProductsTagsTableComponent.style";
import { useSelector } from "react-redux";
import AllProductsTagTableInnerComponent from "../AllProductsTagTableInnerComponent/AllProductsTagTableInnerComponent";

const row = [
   { elm: "Edit", value: "Edit" },
   { elm: "Delete", value: "Delete" },
   { elm: "Name", value: "Name" },
   { elm: "Description", value: "Description" },
   { elm: "Status", value: "Status" },
];

function AllProductsTagsTableComponent() {
   const allProductsTags = useSelector((state) => state.admin.allProductsTags);
   const fetchProductsTags = useSelector((state) => state.admin.fetchProductsTags);

   return (
      <tags.div>
         {!!allProductsTags &&
         allProductsTags.success &&
         !!allProductsTags.tags.length ? (
            <tags.tableDiv>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>

                  <AllProductsTagTableInnerComponent
                     allProductsTags={allProductsTags}
                     isLoading={fetchProductsTags}
                  />
               </table>
            </tags.tableDiv>
         ) : (
            <div className="center_div">
               <p>No Tags</p>
            </div>
         )}
      </tags.div>
   );
}

export default AllProductsTagsTableComponent;
