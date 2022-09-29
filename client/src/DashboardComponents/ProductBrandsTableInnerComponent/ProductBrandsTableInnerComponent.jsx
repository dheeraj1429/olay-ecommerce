import React, { useEffect } from "react";
import * as table from "./ProductBrandsTableInnerComponent.style";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { Popconfirm } from "antd";
import backendConfigData from "../../backendConfig";
import { Checkbox } from "antd";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import { deleteOneProductBrand } from "../../Redux/Actions/adminAction";
import { useDispatch } from "react-redux";
import { removeAllSelctedIds, selectedBrandProduct } from "../../Redux/Actions/appAction";
import { Link } from "react-router-dom";
import * as globalClass from "../../Global.style";

function ProductBrandsTableInnerComponent({ AllBrands, change }) {
   const dispatch = useDispatch();

   const confirm = (id) => {
      dispatch(deleteOneProductBrand(id));
   };

   const selectedBrand = function (el) {
      dispatch(selectedBrandProduct(el));
   };

   useEffect(() => {
      return () => {
         dispatch(removeAllSelctedIds([]));
      };
   }, []);

   return (
      <>
         {AllBrands.map((el) => (
            <tr>
               <td>
                  <Checkbox onChange={(e) => change(e, el)} />
               </td>
               <td>
                  <table.btnDiv>
                     <Link to={`/dashboard/product-brands/edit/${el._id}`}>
                        <CustombuttonComponent btnCl={"table_btn"} onClick={() => selectedBrand(el)}>
                           <FiEdit2 />
                        </CustombuttonComponent>
                     </Link>
                     <Popconfirm
                        title="Warning! Please only delete your product brand if you no longer want to use it."
                        onConfirm={() => confirm(el._id)}
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
                           src={!!el.brandIcon ? `${backendConfigData.URL}brandImagesCompress/${el.brandIcon}` : null}
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
               <td>{!!el.order ? el.order : 0}</td>
               <td>
                  <globalClass.mainDiv>
                     <div className={el.brandStatusInfo}>{el.brandStatusInfo}</div>
                  </globalClass.mainDiv>
               </td>
            </tr>
         ))}
      </>
   );
}

export default HocSpnnerComponent(ProductBrandsTableInnerComponent);
