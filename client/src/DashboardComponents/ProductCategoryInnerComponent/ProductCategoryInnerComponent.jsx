import React, { useState } from "react";
import * as inner from "./ProductCategoryInnerComponent.style";
import { HiOutlineDotsHorizontal } from "@react-icons/all-files/hi/HiOutlineDotsHorizontal";
import { Popconfirm } from "antd";

function ProductCategoryInnerComponent({ CategoryName, description, edit, folder, data }) {
   const [open, setOpen] = useState(false);
   const [confirmLoading, setConfirmLoading] = useState(false);

   const showPopconfirm = () => {
      setOpen(true);
   };

   const handleOk = () => {
      setConfirmLoading(true);
      setOpen(false);
      setConfirmLoading(false);
      // eidt
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
                        <img src="/images/category.png" />
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
