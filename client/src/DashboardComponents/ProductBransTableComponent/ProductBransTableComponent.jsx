import React, { useEffect, useState } from "react";
import * as table from "./ProductBransTableComponent.style";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductBrand } from "../../Redux/Actions/adminAction";
import backendConfigData from "../../backendConfig";
import { Checkbox } from "antd";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { Popconfirm } from "antd";

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

   const dispatch = useDispatch();
   const productBrands = useSelector((state) => state.admin.productBrands);

   useEffect(() => {
      dispatch(fetchAllProductBrand());
   }, []);

   useEffect(() => {
      if (!!productBrands && productBrands.success) {
         setAllBrands(productBrands.brands);
      }
   }, [productBrands]);

   const confirm = () => {
      console.log("delete");
   };

   return (
      <table.div>
         {!!AllBrands.length > 0 ? (
            <table>
               <tr>
                  {row.map((el) => (
                     <th key={el.elm}>{el.value}</th>
                  ))}
               </tr>
               {AllBrands.map((el) => (
                  <tr>
                     <td>
                        <Checkbox />
                     </td>
                     <td>
                        <table.btnDiv>
                           <CustombuttonComponent btnCl={"table_btn"}>
                              <FiEdit2 />
                           </CustombuttonComponent>
                           <Popconfirm
                              title="Warning! Please only delete your product brand if you no longer want to use it."
                              onConfirm={confirm}
                           >
                              <CustombuttonComponent btnCl={"table_btn"}>
                                 <VscClose />
                              </CustombuttonComponent>
                           </Popconfirm>
                        </table.btnDiv>
                     </td>
                     <td>
                        <div className="icon">
                           {!!el.brandIcon ? (
                              <img
                                 crossorigin="anonymous"
                                 src={
                                    !!el.brandIcon
                                       ? `${backendConfigData.URL}brandImages/${el.brandIcon}`
                                       : null
                                 }
                              />
                           ) : (
                              <div className="brand"></div>
                           )}
                        </div>
                     </td>
                     <td>{el.name}</td>
                     <td>{el.description.slice(0, 100)}</td>
                     <td>
                        <a href={el.website}>{el.website}</a>
                     </td>
                     <td>{el.order}</td>
                     <td>{el.brandStatusInfo}</td>
                  </tr>
               ))}
            </table>
         ) : null}
      </table.div>
   );
}

export default ProductBransTableComponent;
