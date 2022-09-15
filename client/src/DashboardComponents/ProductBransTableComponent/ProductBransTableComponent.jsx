import React, { useEffect } from "react";
import * as table from "./ProductBransTableComponent.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductBrand } from "../../Redux/Actions/adminAction";
import ProductBrandsTableInnerComponent from "../ProductBrandsTableInnerComponent/ProductBrandsTableInnerComponent";
import { selectedItemLimit, removeSelectedItems } from "../../Redux/Actions/appAction";

const row = [
   { elm: "all", value: "All" },
   { elm: "edit", value: "Edit" },
   { elm: "brandIcon", value: "Icon" },
   { elm: "Name", value: "Name" },
   { elm: "Description", value: "Description" },
   { elm: "Website", value: "Website" },
   { elm: "Order", value: "Order" },
   { elm: "BrandStatusInfo", value: "Brand status" },
];

function ProductBransTableComponent() {
   const dispatch = useDispatch();
   const productBrands = useSelector((state) => state.admin.productBrands);
   const loadingPagination = useSelector((state) => state.admin.loadingPagination);

   useEffect(() => {
      dispatch(fetchAllProductBrand(0));
   }, []);

   const onChange = (e, elm) => {
      let id = elm._id;

      if (e.target.checked) {
         dispatch(selectedItemLimit(id));
      } else {
         dispatch(removeSelectedItems(id));
      }
   };

   return (
      <table.div>
         {!!productBrands && !!productBrands.brands.length > 0 ? (
            <div>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>

                  <ProductBrandsTableInnerComponent
                     AllBrands={productBrands.brands}
                     isLoading={loadingPagination}
                     change={onChange}
                  />
               </table>
            </div>
         ) : null}
      </table.div>
   );
}

export default ProductBransTableComponent;
