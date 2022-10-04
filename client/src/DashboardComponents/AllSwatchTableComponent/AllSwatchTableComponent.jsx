import React from "react";
import * as tableCm from "./AllSwatchTableComponent.style";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { removeSelectedProductSwatches, removeSingleSizeVariations, deleteSingleProductlabel } from "../../Redux/Actions/adminAction";
import { useDispatch } from "react-redux";

function AllSwatchTableComponent({ variation, row, field, color, dataTarget }) {
   const dispatch = useDispatch();

   const confirm = (id) => {
      if (field === "allSwatches") {
         dispatch(removeSelectedProductSwatches(id));
      } else if (field === "sizeVariations") {
         dispatch(removeSingleSizeVariations(id));
      } else if (field === "allLabels") {
         dispatch(deleteSingleProductlabel(id));
      }
   };

   return (
      <tableCm.div>
         {!!variation && variation.success && !!variation[field].length ? (
            <tableCm.tableDiv>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>
                  {variation[field].map((el) => (
                     <tr>
                        <td>
                           <Link to={`/dashboard/${field}/${el._id}`}>
                              <FiEdit2 />
                           </Link>
                        </td>
                        <td>
                           <Popconfirm
                              title={`Are you sure to delete this product ${
                                 field == "allSwatches" ? "swatches" : field === "allLabels" ? "sale" : "size"
                              } variation`}
                              onConfirm={() => confirm(el._id)}
                              okText="Yes"
                              cancelText="No"
                           >
                              <VscClose />
                           </Popconfirm>
                        </td>
                        {color ? (
                           <td>
                              <div
                                 className="Color-prv_div"
                                 style={{
                                    backgroundColor: `${el.colorCode.hex}`,
                                 }}
                              ></div>
                           </td>
                        ) : null}
                        {color ? null : (
                           <td
                              style={{
                                 width: "3%",
                              }}
                           >
                              {el?.createdAt
                                 ? (function () {
                                      const date = String(new Date(el.createdAt)).split("GMT")[0];
                                      return <p>{`${date}`}</p>;
                                   })()
                                 : null}
                           </td>
                        )}

                        <td>
                           <p>{el.name}</p>
                        </td>
                        <td>
                           <p>{el.slug}</p>
                        </td>
                        <td>
                           <p>{el.description.slice(0, 70)}</p>
                        </td>
                     </tr>
                  ))}
               </table>
            </tableCm.tableDiv>
         ) : (
            <div className="center_div">
               <p>No {`${color && !dataTarget ? "color swatches" : dataTarget ? "Product label" : "size variations"}`}</p>
            </div>
         )}
      </tableCm.div>
   );
}

export default HocSpnnerComponent(AllSwatchTableComponent);
