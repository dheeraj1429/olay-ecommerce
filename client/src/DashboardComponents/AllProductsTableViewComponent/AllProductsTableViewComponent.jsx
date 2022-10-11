import { Popconfirm } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { selectedItemLimit, removeSelectedItems } from "../../Redux/Actions/appAction";
import * as inner from "./AllProductsTableViewComponent.style";
import { useDispatch } from "react-redux";
import { deleteOneProduct } from "../../Redux/Actions/adminAction";
import { Checkbox } from "antd";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import backendConfigData from "../../backendConfig";
import { BsArrowReturnRight } from "@react-icons/all-files/bs/BsArrowReturnRight";
import { GoPrimitiveDot } from "@react-icons/all-files/go/GoPrimitiveDot";
import * as globalClass from "../../Global.style";

function AllProductsTableViewComponent({ variation, el, id, subVaition }) {
   const location = useLocation();
   const dispatch = useDispatch();

   const confirm = (id, categoryId, brandId) => {
      dispatch(deleteOneProduct(id, categoryId, brandId));
   };

   const onChange = (e, elm) => {
      let id = elm._id;

      if (e.target.checked) {
         dispatch(selectedItemLimit(id));
      } else {
         dispatch(removeSelectedItems(id));
      }
   };

   return (
      <inner.tr className={variation ? "padding_table" : null} variation={variation ? variation : null}>
         {variation ? null : (
            <>
               <inner.td className="checkbox">
                  <Checkbox onChange={(e) => onChange(e, el)} />
               </inner.td>
               <inner.td>
                  <Link to={`/dashboard/product/edit/${el._id}`}>
                     <FiEdit2 />
                  </Link>
               </inner.td>
               <inner.td>
                  <Popconfirm
                     title="Are you sure to delete this product?"
                     onConfirm={() => confirm(el._id, el?.category?._id, el?.brand?._id)}
                     okText="Yes"
                     cancelText="No"
                  >
                     <VscClose />
                  </Popconfirm>
               </inner.td>
            </>
         )}

         {location.pathname == "/dashboard/all-products" ? null : subVaition ? (
            <inner.td
               style={{
                  paddingLeft: "1.5rem",
               }}
            >
               <div className="flex_div">
                  <p>Sub</p>
                  <BsArrowReturnRight />
               </div>
            </inner.td>
         ) : (
            <inner.td>
               <div className="flex_div">
                  <p>Parent</p>
                  <GoPrimitiveDot />
               </div>
            </inner.td>
         )}
         {
            <Link
               to={
                  location.pathname === "/dashboard/all-products"
                     ? location.pathname
                     : !subVaition
                     ? `/dashboard/product/create-variations/${el._id}`
                     : `/dashboard/product/sub-variations/${id}/editSub/${el._id}`
               }
            >
               <inner.td>
                  <div className={variation ? "produvt-variation-image-div" : "product_image_prv"}>
                     <img
                        crossOrigin="anonymous"
                        src={`${backendConfigData.URL}productImagesCompress/${
                           el?.productImage ? el.productImage : el?.variationImage ? el?.variationImage : null
                        }`}
                        alt=""
                     />
                  </div>
               </inner.td>
            </Link>
         }
         <inner.td>
            {el?.name ? el.name.slice(0, 40) : el?.variationName ? el.variationName.slice(0, 40) : null}
         </inner.td>
         <inner.td>{el?.price ? el.price : el?.regularPrice ? el?.regularPrice : null}</inner.td>
         <inner.td>
            {el?.salePrice && !!el.salePrice ? (
               <div className="Sale">{el.salePrice}</div>
            ) : (
               <div className="no_sale">No Sale</div>
            )}
         </inner.td>
         <inner.td></inner.td>
         <inner.td>
            {el?.stockStatus && el.stockStatus ? (
               <div className={el.stockStatus.toLowerCase().split(" ").join("-")}>{el.stockStatus}</div>
            ) : (
               "-"
            )}
         </inner.td>
         <inner.td>{el?.weight ? el.weight : "-"}</inner.td>
         <inner.td>{el?.length ? el.length : "-"}</inner.td>
         <inner.td>{el?.wide ? el.wide : "-"}</inner.td>
         <inner.td>{el?.height ? el.height : "-"}</inner.td>
         <inner.td>{el?.suggestedAge ? el.suggestedAge : "-"}</inner.td>
         <inner.td>{el?.brand ? el.brand.name : <div>-</div>}</inner.td>
         <inner.td>{el?.category ? el.category.name : <div>-</div>}</inner.td>
         <inner.td>
            {el?.createdAt
               ? (function () {
                    const date = String(new Date(el.createdAt)).split("GMT")[0];
                    return <p>{`${date}`}</p>;
                 })()
               : null}
         </inner.td>
         <inner.td>
            {el?.productStatusInfo ? (
               <globalClass.mainDiv>
                  <div className={el.productStatusInfo}> {el.productStatusInfo}</div>
               </globalClass.mainDiv>
            ) : (
               <div>-</div>
            )}
         </inner.td>
      </inner.tr>
   );
}

export default AllProductsTableViewComponent;
