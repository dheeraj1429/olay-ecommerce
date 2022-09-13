import React, { useEffect, useState, useCallback } from "react";
import * as table from "./ProductBransTableComponent.style";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchAllProductBrand,
   deleteMultiSelectedProductBrand,
} from "../../Redux/Actions/adminAction";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { GrFormNextLink } from "@react-icons/all-files/gr/GrFormNextLink";
import { GrFormPreviousLink } from "@react-icons/all-files/gr/GrFormPreviousLink";
import ProductBrandsTableInnerComponent from "../ProductBrandsTableInnerComponent/ProductBrandsTableInnerComponent";
import { fetchBrandProductLoading } from "../../Redux/Actions/appAction";
import { FcDoNotInsert } from "@react-icons/all-files/fc/FcDoNotInsert";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
   const [AllBrands, setAllBrands] = useState([]);
   const [Limit, setLimit] = useState(0);
   const [SelectedBrand, setSelectedBrand] = useState([]);

   const dispatch = useDispatch();
   const productBrands = useSelector((state) => state.admin.productBrands);
   const loadingPagination = useSelector((state) => state.admin.loadingPagination);

   const ChnageNext = function () {
      if (Limit >= 0 && Limit < productBrands.totalPages) {
         setLimit((prev) => prev + 1);
         dispatch(fetchBrandProductLoading(true));
      }
   };

   const onChange = useCallback(
      (e, elm) => {
         let id = elm._id;
         if (e.target.checked) {
            setSelectedBrand((current) => (!!current?.id ? id : [...current, id]));
         } else {
            setSelectedBrand(SelectedBrand.filter((el) => el !== id));
         }
      },
      [SelectedBrand]
   );

   const ChangePrev = function () {
      if (Limit > 0) {
         setLimit((prev) => prev - 1);
         dispatch(fetchBrandProductLoading(true));
      }
   };

   const confirm = function () {
      dispatch(deleteMultiSelectedProductBrand(SelectedBrand));
      setSelectedBrand([]);
   };

   useEffect(() => {
      dispatch(fetchAllProductBrand(Limit));

      if (!!SelectedBrand.length) {
         setSelectedBrand([]);
      }
   }, [Limit]);

   useEffect(() => {
      dispatch(fetchAllProductBrand(0));
   }, []);

   useEffect(() => {
      if (!!productBrands && productBrands.success) {
         setAllBrands(productBrands.brands);
      }

      if (!!!AllBrands.length) {
         setLimit(0);
         dispatch(fetchAllProductBrand(0));
      }
   }, [productBrands, AllBrands]);

   return (
      <table.div>
         {!!AllBrands.length > 0 ? (
            <div>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>

                  <ProductBrandsTableInnerComponent
                     AllBrands={AllBrands}
                     isLoading={loadingPagination}
                     change={onChange}
                  />
               </table>

               <table.paginationDiv>
                  <div>
                     <p>
                        Showing {productBrands.brands.length} of{" "}
                        {productBrands.totalDocuments} Results
                     </p>
                  </div>
                  <div>
                     {!!SelectedBrand.length ? (
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
                     ) : null}
                  </div>
                  <div>
                     <table.flexDiv>
                        <CustombuttonComponent
                           btnCl={Limit <= 0 ? "PrevDisable_btn" : "pagination_btn"}
                           onClick={ChangePrev}
                        >
                           <GrFormPreviousLink />
                        </CustombuttonComponent>

                        <CustombuttonComponent
                           btnCl={
                              Limit >= productBrands.totalPages
                                 ? "PrevDisable_btn"
                                 : "pagination_btn"
                           }
                           onClick={ChnageNext}
                        >
                           <GrFormNextLink />
                        </CustombuttonComponent>
                     </table.flexDiv>
                  </div>
               </table.paginationDiv>
            </div>
         ) : null}
      </table.div>
   );
}

export default ProductBransTableComponent;
