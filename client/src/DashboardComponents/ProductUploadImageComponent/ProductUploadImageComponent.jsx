import React, { useRef } from "react";
import * as prImage from "./ProductUploadImageComponent.style";
import { AiOutlineFileImage } from "@react-icons/all-files/ai/AiOutlineFileImage";

function ProductUploadImageComponent() {
   const image = useRef(null);
   const ClickHandler = function (e) {
      image.current.click();
   };

   return (
      <prImage.main>
         <prImage.flex>
            <prImage.div onClick={ClickHandler}>
               <div className="image_div">
                  {/* <p>Lorem</p> */}
                  <AiOutlineFileImage />
                  <input type="file" ref={(el) => (image.current = el)} />
                  {/* <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" /> */}
               </div>
            </prImage.div>
         </prImage.flex>
      </prImage.main>
   );
}

export default ProductUploadImageComponent;
