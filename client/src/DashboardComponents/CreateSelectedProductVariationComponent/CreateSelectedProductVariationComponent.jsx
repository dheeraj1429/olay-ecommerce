import React, { useState, useEffect } from "react";
import * as variation from "./CreateSelectedProductVariationComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router";
import { getproductSwatches } from "../../Redux/Actions/adminAction";
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import { insertNewProductVariation } from "../../Redux/Actions/adminAction";

const stock = [
   { value: "in stock", label: "in stock" },
   { value: "out of stock", label: "out of stock" },
];

function CreateSelectedProductVariationComponent() {
   const [VariationInfo, setVariationInfo] = useState({
      name: "",
      sku: "",
      regularPrice: "",
      salePrice: "",
      stokeStatus: "",
      description: "",
      variationImage: "",
      colorSwatches: "",
      weight: "",
      length: "",
      wide: "",
      height: "",
   });

   const params = useParams();
   const dispatch = useDispatch();
   const allProductSwatches = useSelector((state) => state.admin.allProductSwatches);

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
      if (VariationInfo.name && params.id) {
         const formData = new FormData();
         formData.append("selectedProductId", params.id);
         formData.append("name", VariationInfo.name);
         formData.append("sku", VariationInfo.sku);
         formData.append("regularPrice", VariationInfo.regularPrice);
         formData.append("salePrice", VariationInfo.salePrice);
         formData.append("stokeStatus", VariationInfo.stokeStatus);
         formData.append("description", VariationInfo.description);
         formData.append("variationImage", VariationInfo.variationImage);
         formData.append("colorSwatches", VariationInfo.colorSwatches);
         formData.append("weight", VariationInfo.weight);
         formData.append("length", VariationInfo.length);
         formData.append("wide", VariationInfo.wide);
         formData.append("height", VariationInfo.height);

         dispatch(insertNewProductVariation(formData));
      } else {
         info("Product variation name is required!");
      }
   };

   useEffect(() => {
      dispatch(getproductSwatches());
   }, []);

   return (
      <variation.div>
         <DashboardNavbarComponent />

         <variation.spaceDiv>
            <HeadingComponent
               Heading={"Create product variations"}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`}
            />

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
                        label="Variation name"
                        variant="outlined"
                        type={"text"}
                        name="name"
                        value={VariationInfo.name}
                        onChange={changeHandler}
                        helperText="Product variations name for example: color red variation, size xl variation"
                     />
                     <TextField id="outlined-basic" label="SKU" variant="outlined" type={"text"} name="sku" value={VariationInfo.sku} onChange={changeHandler} />
                     <variation.flex>
                        <div className="half-width">
                           <TextField
                              id="outlined-basic"
                              label="Regular Price"
                              variant="outlined"
                              type={"number"}
                              name="regularPrice"
                              value={VariationInfo.regularPrice}
                              onChange={changeHandler}
                           />
                        </div>
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
                     </variation.flex>
                     <variation.flex>
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

                        <div className="half-width">
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Select"
                              helperText="Product variation swatches"
                              name="colorSwatches"
                              value={VariationInfo.colorSwatches}
                              onChange={changeHandler}
                           >
                              {!!allProductSwatches && allProductSwatches.success && allProductSwatches?.allSwatches
                                 ? allProductSwatches.allSwatches.map((option) => (
                                      <MenuItem key={option._id} value={option._id}>
                                         <variation.flexSpace className="flex_items">
                                            {option.name}
                                            <FaCircle
                                               style={{
                                                  fill: `${option.colorCode.hex}`,
                                               }}
                                            />
                                         </variation.flexSpace>
                                      </MenuItem>
                                   ))
                                 : null}
                           </TextField>
                        </div>
                     </variation.flex>

                     <variation.flex>
                        <div className="half-width">
                           <TextField
                              id="outlined-basic"
                              label="Product weight"
                              variant="outlined"
                              type={"number"}
                              name="weight"
                              value={VariationInfo.weight}
                              onChange={changeHandler}
                           />
                        </div>
                        <div className="half-width">
                           <TextField
                              id="outlined-basic"
                              label="Product length"
                              variant="outlined"
                              type={"number"}
                              name="length"
                              value={VariationInfo.length}
                              onChange={changeHandler}
                           />
                        </div>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Product wide" variant="outlined" type={"number"} name="wide" value={VariationInfo.wide} onChange={changeHandler} />
                        </div>
                        <div className="half-width">
                           <TextField
                              id="outlined-basic"
                              label="Product height"
                              variant="outlined"
                              type={"number"}
                              name="height"
                              value={VariationInfo.height}
                              onChange={changeHandler}
                           />
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
                     <ProductUploadImageComponent onChange={ImageGrabHandler} name="variationImage" />
                  </Box>
                  <CustombuttonComponent innerText={"Save"} btnCl={"category_upload"} onClick={SaveVariationHandler} />
               </li>
            </ul>
         </variation.spaceDiv>
      </variation.div>
   );
}

export default CreateSelectedProductVariationComponent;
