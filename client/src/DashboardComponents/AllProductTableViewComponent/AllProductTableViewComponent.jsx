import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadProducts } from "../../Redux/Actions/adminAction";
import * as product from "./AllProductTableViewComponent.style";
import AllProductTableInnerComponent from "../AllProductTableInnerComponent/AllProductTableInnerComponent";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";

const subVatiaions = 1;

function AllProductTableViewComponent() {
   const dispatch = useDispatch();
   const allProducts = useSelector((state) => state.admin.allProducts);
   const fetchProductsLoading = useSelector((state) => state.admin.fetchProductsLoading);

   useEffect(() => {
      dispatch(fetchUploadProducts(0, subVatiaions));
   }, []);

   return (
      <product.div>
         <p>10 request products</p>

         <product.tableView>
            <table>
               {!!allProducts && allProducts.success && !!allProducts?.products.length ? (
                  <AllProductTableInnerComponent
                     allProducts={allProducts}
                     variation={true}
                     isLoading={fetchProductsLoading}
                  />
               ) : (
                  <div className="center-div">
                     <p>No Products</p>
                  </div>
               )}
            </table>
         </product.tableView>
         <TableFooterComponent state={allProducts} action={"products"} />
      </product.div>
   );
}

export default AllProductTableViewComponent;
