import React, { useState, useEffect } from "react";
import { FcDoNotInsert } from "@react-icons/all-files/fc/FcDoNotInsert";
import { GrFormNextLink } from "@react-icons/all-files/gr/GrFormNextLink";
import { GrFormPreviousLink } from "@react-icons/all-files/gr/GrFormPreviousLink";
import { Popconfirm } from "antd";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import * as table from "./TableFooterComponent.style";
import { useSelector, useDispatch } from "react-redux";
import {
   fetchAllProductBrand,
   deleteMultiSelectedProductBrand,
   deleteSelectedproducts,
   fetchUploadProducts,
   getProductTags,
} from "../../Redux/Actions/adminAction";
import {
   fetchBrandProductLoading,
   removeAllSelectedItems,
   fetchLoadingProducts,
   productTagsFetchLoading,
} from "../../Redux/Actions/appAction";
import { QuestionCircleOutlined } from "@ant-design/icons";

function TableFooterComponent({ action, state }) {
   const selectedItems = useSelector((state) => state.admin.selectedItems);
   const [Limit, setLimit] = useState(0);
   const dispatch = useDispatch();

   const ChnageNext = function () {
      if (Limit >= 0 && Limit < state.totalPages) {
         setLimit((prev) => prev + 1);
         if (action === "brands") {
            dispatch(fetchBrandProductLoading(true));
         } else if (action === "products") {
            dispatch(fetchLoadingProducts(true));
         } else if (action === "tags") {
            dispatch(productTagsFetchLoading(true));
         }
      }
   };

   const ChangePrev = function () {
      setLimit((prev) => prev - 1);
      if (Limit > 0) {
         if (action === "brands") {
            dispatch(fetchBrandProductLoading(true));
         } else if (action === "products") {
            dispatch(fetchLoadingProducts(true));
         } else if (action === "tags") {
            dispatch(productTagsFetchLoading(true));
         }
      }
   };

   const confirm = function () {
      if (action === "brands") {
         dispatch(deleteMultiSelectedProductBrand(selectedItems));
      } else if (action === "products") {
         dispatch(deleteSelectedproducts(selectedItems));
      }
      dispatch(removeAllSelectedItems([]));
   };

   useEffect(() => {
      if (action === "brands") {
         dispatch(fetchAllProductBrand(Limit));
      } else if (action === "products") {
         dispatch(fetchUploadProducts(Limit));
      } else if (action === "tags") {
         dispatch(getProductTags(Limit));
      }
   }, [Limit]);

   return (
      <table.paginationDiv>
         {!!state ? (
            <>
               <div>
                  <p>
                     Showing {state[action].length} of {state.totalDocuments} Results
                  </p>
               </div>
               <div>
                  {!!selectedItems.length ? (
                     <>
                        <Popconfirm
                           title="Delete selected product brands! Are your sure ?"
                           onConfirm={confirm}
                           icon={
                              <QuestionCircleOutlined
                                 style={{
                                    color: "red",
                                 }}
                              />
                           }
                        >
                           <CustombuttonComponent btnCl={"pagination_btn"}>
                              <FcDoNotInsert />
                           </CustombuttonComponent>
                        </Popconfirm>
                     </>
                  ) : null}
               </div>
               <div>
                  <table.flexDiv>
                     <CustombuttonComponent btnCl={Limit <= 0 ? "PrevDisable_btn" : "pagination_btn"} onClick={ChangePrev}>
                        <GrFormPreviousLink />
                     </CustombuttonComponent>

                     <CustombuttonComponent btnCl={Limit >= state.totalPages ? "PrevDisable_btn" : "pagination_btn"} onClick={ChnageNext}>
                        <GrFormNextLink />
                     </CustombuttonComponent>
                  </table.flexDiv>
               </div>
            </>
         ) : null}
      </table.paginationDiv>
   );
}

export default TableFooterComponent;
