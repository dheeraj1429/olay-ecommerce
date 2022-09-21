import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import MenuItem from "@mui/material/MenuItem";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";
import * as variation from "./ProductVariationDropDownComponent.style";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { useDispatch } from "react-redux";
import { message } from "antd";

const stock = [
   { value: "in stock", label: "in stock" },
   { value: "out of stock", label: "out of stock" },
];

function ProductVariationDropDownComponent() {
   const [VariationInfo, setVariationInfo] = useState({
      name: "",
      sku: "",
      regularPrice: "",
      salePrice: "",
      stokeStatus: "",
      description: "",
      variationImage: "",
   });

   const dispatch = useDispatch();

   const info = (msg) => {
      message.info(msg);
   };

   const changeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setVariationInfo({ ...VariationInfo, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setVariationInfo({ ...VariationInfo, variationImage: data });
   };

   const SaveVariationHandler = function () {
      // send the from data into the backed server
   };

   return (
      <ul>
         <li>
            <Box
               component="form"
               sx={{
                  "& > :not(style)": { my: 1, width: "100%" },
               }}
               noValidate
               autoComplete="off"
            >
               <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  type={"text"}
                  name="name"
                  value={VariationInfo.name}
                  onChange={changeHandler}
               />
               <TextField
                  id="outlined-basic"
                  label="SKU"
                  variant="outlined"
                  type={"text"}
                  name="sku"
                  value={VariationInfo.sku}
                  onChange={changeHandler}
               />
               <TextField
                  id="outlined-basic"
                  label="Regular Price"
                  variant="outlined"
                  type={"number"}
                  name="regularPrice"
                  value={VariationInfo.regularPrice}
                  onChange={changeHandler}
               />
               <variation.flex>
                  <div className="half-width">
                     <TextField
                        id="outlined-basic"
                        label="Sale Price"
                        variant="outlined"
                        type={"number"}
                        name="salePrice"
                        value={VariationInfo.salePrice}
                        onChange={changeHandler}
                     />
                  </div>
                  <div className="half-width">
                     <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        helperText="Stock status"
                        name="stokeStatus"
                        value={VariationInfo.stokeStatus}
                        onChange={changeHandler}
                     >
                        {stock.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
               </variation.flex>

               <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue=""
                  name="description"
                  value={VariationInfo.description}
                  onChange={changeHandler}
               />
               <HeadingComponent cl="sm_heading" Heading={"Product variations image"} />
               <ProductUploadImageComponent
                  onChange={ImageGrabHandler}
                  name="variationImage"
               />
            </Box>
            <CustombuttonComponent
               innerText={"Save"}
               btnCl={"category_upload"}
               onClick={SaveVariationHandler}
            />
         </li>
      </ul>
   );
}

export default ProductVariationDropDownComponent;
