import React, { useRef, useState, useEffect } from "react";
import * as prImage from "./ProductUploadImageComponent.style";
import { AiOutlineFileImage } from "@react-icons/all-files/ai/AiOutlineFileImage";
import backendConfigData from "../../backendConfig";

function ProductUploadImageComponent({
   Heading,
   name,
   value,
   onChange,
   Clear,
   selectedPrevImage,
   size,
}) {
   const image = useRef(null);
   const [Src, setSrc] = useState("");
   const ClickHandler = function (e) {
      image.current.click();
   };

   const updatePreview = function (input) {
      let file = input.target.files[0];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {
         setSrc(reader.result);
      };
   };

   useEffect(() => {
      if (Clear) {
         setSrc("");
      }
   }, [Clear]);

   return (
      <prImage.main>
         <h4>{Heading}</h4>
         <prImage.flex>
            <prImage.div onClick={ClickHandler} className={size ? "big-image" : null}>
               <div className="image_div">
                  <AiOutlineFileImage />
                  <input
                     type="file"
                     name={name}
                     value={value}
                     onChange={(e) => {
                        onChange(e);
                        updatePreview(e);
                     }}
                     ref={(el) => (image.current = el)}
                  />
                  {!!Src ? (
                     <img src={Src} />
                  ) : !!selectedPrevImage ? (
                     <img
                        crossorigin="anonymous"
                        src={`${backendConfigData.URL}brandImages/${selectedPrevImage}`}
                     />
                  ) : null}
               </div>
            </prImage.div>
         </prImage.flex>
      </prImage.main>
   );
}

export default ProductUploadImageComponent;
