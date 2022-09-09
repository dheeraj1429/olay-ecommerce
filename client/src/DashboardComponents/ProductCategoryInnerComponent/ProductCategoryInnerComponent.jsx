import React, { useState } from "react";
import * as inner from "./ProductCategoryInnerComponent.style";
import { HiOutlineDotsHorizontal } from "@react-icons/all-files/hi/HiOutlineDotsHorizontal";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { editProductCategory, selectedCategory } from "../../Redux/Actions/appAction";
import { BiSitemap } from "@react-icons/all-files/bi/BiSitemap";

function ProductCategoryInnerComponent({ CategoryName, description, edit, folder, data }) {
   const [open, setOpen] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);
   const dispatch = useDispatch();
   const showPopconfirm = () => {
      setOpen(true);
   };

   const handleOk = () => {
      setConfirmLoading(true);
      setOpen(false);
      setConfirmLoading(false);
      dispatch(editProductCategory(true));
      dispatch(selectedCategory(data));
   };

   const handleCancel = () => {
      console.log("Clicked cancel button");
      setOpen(false);
   };

   return (
      <inner.div>
         <inner.flexSpace>
            <div>
               <inner.flex>
                  {folder ? (
                     <>
                        <div className="img_div">
                           <BiSitemap />
                        </div>
                        <div>
                           <h4>{CategoryName}</h4>
                           {!!description ? <p className="margin_heading">{description}</p> : null}
                        </div>
                     </>
                  ) : (
                     <div>
                        <h4>{CategoryName}</h4>
                     </div>
                  )}
               </inner.flex>
            </div>
            <div className="Edit">
               {edit ? (
                  <p>{edit}</p>
               ) : (
                  <Popconfirm
                     title="Edit product category"
                     open={open}
                     onConfirm={handleOk}
                     okButtonProps={{
                        loading: confirmLoading,
                     }}
                     onCancel={handleCancel}
                  >
                     <HiOutlineDotsHorizontal
                        id={data ? data._id : null}
                        onClick={showPopconfirm}
                     />
                  </Popconfirm>
               )}
            </div>
         </inner.flexSpace>
      </inner.div>
   );
}

export default ProductCategoryInnerComponent;
