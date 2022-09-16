import React from "react";
import * as tb from "./AllProductsTableComponent.style";
import AllProductTableInnerComponent from "../AllProductTableInnerComponent/AllProductTableInnerComponent";
import { useSelector } from "react-redux";

const row = [
   { elm: "All", value: "All" },
   { elm: "Edit", value: "Edit" },
   { elm: "Delete", value: "Delete" },
   { elm: "Image", value: "Image" },
   { elm: "Name", value: "Name" },
   { elm: "Price", value: "Price" },
   { elm: "Sale Price", value: "Sale Price" },
   { elm: "Category", value: "Category" },
   { elm: "Stock Status", value: "Stock Status" },
   { elm: "Weight", value: "weight" },
   { elm: "Length", value: "Length" },
   { elm: "Wide", value: "Wide" },
   { elm: "Height", value: "Height" },
   { elm: "Suggested Age", value: "Suggested Age" },
   { elm: "Brand", value: "Brand" },
   { elm: "Category", value: "Category" },
   { elm: "CreatedAt", value: "CreatedAt" },
   { elm: "Product status", value: "Product status" },
];

function AllProductsTableComponent() {
   const allProducts = useSelector((state) => state.admin.allProducts);
   const fetchProductsLoading = useSelector((state) => state.admin.fetchProductsLoading);

   return (
      <tb.div>
         {!!allProducts && allProducts.success && !!allProducts?.products.length ? (
            <tb.tableDiv>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>

                  <AllProductTableInnerComponent
                     allProducts={allProducts}
                     isLoading={fetchProductsLoading}
                  />
               </table>
            </tb.tableDiv>
         ) : (
            <div className="center_div">
               <p>No Products</p>
            </div>
         )}
      </tb.div>
   );
}

export default AllProductsTableComponent;
