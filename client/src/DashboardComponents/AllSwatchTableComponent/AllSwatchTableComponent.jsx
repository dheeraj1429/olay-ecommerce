import React from "react";
import * as tableCm from "./AllSwatchTableComponent.style";
import { useSelector } from "react-redux";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { removeSelectedProductSwatches } from "../../Redux/Actions/adminAction";
import { useDispatch } from "react-redux";

const row = [
   { elm: "Edit", value: "Edit" },
   { elm: "Delete", value: "Delete" },
   { elm: "Color", value: "Color" },
   { elm: "Name", value: "Name" },
   { elm: "Slug", value: "Slug" },
   { elm: "Description", value: "Description" },
];

function AllSwatchTableComponent() {
   const allProductSwatches = useSelector((state) => state.admin.allProductSwatches);

   const dispatch = useDispatch();

   const confirm = (id) => {
      dispatch(removeSelectedProductSwatches(id));
   };

   return (
      <tableCm.div>
         {!!allProductSwatches && allProductSwatches.success && !!allProductSwatches.allSwatches.length ? (
            <tableCm.tableDiv>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>
                  {allProductSwatches.allSwatches.map((el) => (
                     <tr>
                        <td>
                           <Link to={`/dashboard/variation-swatches/${el._id}`}>
                              <FiEdit2 />
                           </Link>
                        </td>
                        <td>
                           <Popconfirm title="Are you sure to delete this product swatches" onConfirm={() => confirm(el._id)} okText="Yes" cancelText="No">
                              <VscClose />
                           </Popconfirm>
                        </td>
                        <td>
                           <div
                              className="Color-prv_div"
                              style={{
                                 backgroundColor: `${el.colorCode.hex}`,
                              }}
                           ></div>
                        </td>
                        <td>
                           <p>{el.name}</p>
                        </td>
                        <td>
                           <p>{el.slug}</p>
                        </td>
                        <td>
                           <p>{el.description}</p>
                        </td>
                     </tr>
                  ))}
               </table>
            </tableCm.tableDiv>
         ) : (
            <div className="center_div">
               <p>No Color Swatches</p>
            </div>
         )}
      </tableCm.div>
   );
}

export default HocSpnnerComponent(AllSwatchTableComponent);
