import React from "react";
import * as inner from "./ProductCategoryInnerComponent.style";
import { CgFolder } from "@react-icons/all-files/cg/CgFolder";
import { HiOutlineDotsHorizontal } from "@react-icons/all-files/hi/HiOutlineDotsHorizontal";

function ProductCategoryInnerComponent({ CategoryName, description, edit, folder, data }) {
   return (
      <inner.div>
         <inner.flexSpace>
            <div>
               <inner.flex>
                  {folder ? (
                     <>
                        <CgFolder />
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
               {edit ? <p>{edit}</p> : <HiOutlineDotsHorizontal id={data ? data._id : null} />}
            </div>
         </inner.flexSpace>
      </inner.div>
   );
}

export default ProductCategoryInnerComponent;
