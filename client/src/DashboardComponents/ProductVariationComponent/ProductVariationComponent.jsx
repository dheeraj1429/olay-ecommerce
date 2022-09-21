import React, { useState } from "react";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import * as variation from "./ProductVariationComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ProductVariationDropDownComponent from "../ProductVariationDropDownComponent/ProductVariationDropDownComponent";
import { message } from "antd";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";

function ProductVariationComponent() {
   const [Variations, setVariations] = useState([]);
   const [VariationName, setVariationName] = useState("");
   const [ShowActive, setShowActive] = useState("");

   const info = (msg) => {
      message.info(msg);
   };

   const VariationHandler = function (e) {
      e.preventDefault();
      if (Variations.indexOf(VariationName.toLowerCase()) == -1) {
         setVariations((prevState) => [...prevState, VariationName]);
         setVariationName("");
      } else {
         info("Product Variation is already exists");
      }
   };

   const ChangeHandler = function (e) {
      setVariationName(e.target.value);
   };

   const ActiveHandler = function (e) {
      const id = e.currentTarget.id;
      if (ShowActive == id) {
         setShowActive("");
      } else {
         setShowActive(id);
      }
   };

   const CloseHandler = function (VariantName) {
      const filterState = Variations.filter((el) => el !== VariantName);
      setVariations(filterState);
   };

   return (
      <variation.div>
         <HeadingComponent cl="sm_heading" Heading={"Product variations"} />

         <variation.flex>
            <variation.tabsDiv>
               <Box
                  component="form"
                  sx={{
                     "& > :not(style)": { mb: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={VariationHandler}
               >
                  <TextField
                     id="outlined-basic"
                     onChange={ChangeHandler}
                     value={VariationName}
                     label="Variations"
                     variant="outlined"
                  />
               </Box>
            </variation.tabsDiv>
            <variation.renderDiv>
               <variation.dropDown>
                  {!!Variations.length
                     ? Variations.map((el) => (
                          <div
                             className={
                                ShowActive === el
                                   ? "drop_varient drop_varient_active"
                                   : "drop_varient"
                             }
                             key={el}
                          >
                             <div className="heading_div">
                                <p id={el} onClick={ActiveHandler}>
                                   {el}
                                </p>
                                <VscClose onClick={() => CloseHandler(el)} />
                             </div>
                             <div className="padding-div">
                                <ProductVariationDropDownComponent />
                             </div>
                          </div>
                       ))
                     : null}
               </variation.dropDown>
            </variation.renderDiv>
         </variation.flex>
      </variation.div>
   );
}

export default ProductVariationComponent;
