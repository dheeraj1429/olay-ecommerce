import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadProducts } from "../../Redux/Actions/adminAction";
import * as list from "./FetchListComponent.style";
import backendConfigData from "../../backendConfig";
import { showFetchSaleComponent, storeSelectedSaleProduct } from "../../Redux/Actions/appAction";
import TableFooterComponent from "../TableFooterComponent/TableFooterComponent";

function FetchListComponent({ show, TargetHandler }) {
   const dispatch = useDispatch();
   const allProducts = useSelector((state) => state.admin.allProducts);

   const StoreHandler = function (el) {
      dispatch(
         storeSelectedSaleProduct({
            productImage: el.productImage,
            name: el.name,
            id: el._id,
         })
      );
      dispatch(showFetchSaleComponent(false));
   };

   useEffect(() => {
      dispatch(fetchUploadProducts(0));
   }, []);

   return (
      <list.div show={show}>
         {!!allProducts && allProducts.success && !!allProducts?.products.length ? (
            <>
               {allProducts.products.map((el) => {
                  return (
                     <div
                        className="productListCard"
                        id={el._id}
                        onClick={() => {
                           StoreHandler(el);
                           TargetHandler(el._id);
                        }}
                     >
                        <list.flex>
                           <div className="ProductImage">
                              <img
                                 crossOrigin="anonoymous"
                                 src={`${backendConfigData.URL}productImagesCompress/${el.productImage}`}
                                 alt=""
                              />
                           </div>
                           <div className="ProductInfo">
                              <p>{el.name}</p>
                           </div>
                        </list.flex>
                     </div>
                  );
               })}
               <list.space>
                  <TableFooterComponent state={allProducts} action={"products"} />
               </list.space>
            </>
         ) : (
            <div className="center-div">No Products</div>
         )}
      </list.div>
   );
}

export default FetchListComponent;
