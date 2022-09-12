import React, { useState, useEffect } from "react";
import * as upload from "./UploadProductComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsCategorys } from "../../Redux/Actions/adminAction";

const sugAge = [
   { value: "18 - 25", label: "18 - 25" },
   { value: "25 - 30", label: "25 - 30" },
   { value: "30 - 35", label: "30 - 35" },
   { value: "35 - 40", label: "35 - 40" },
   { value: "40 - 50", label: "40 - 50" },
];

const inStock = [
   { value: "Out of stock", label: "Out of stock" },
   { value: "On backorder", label: "On backorder" },
];

function UploadProductComponent() {
   const [ProductCategory, setProductCategory] = useState([]);
   const [Product, setProduct] = useState({
      name: "",
      price: "",
      salePrice: "",
      discription: "",
      category: "",
      image: "",
      suggestedAge: "",
      suggestedSkinColor: "",
      stockStatus: "",
      weight: "",
      length: "",
      wide: "",
      height: "",
   });

   const dispatch = useDispatch();
   const productAllCategory = useSelector((state) => state.admin.productAllCategory);

   useEffect(() => {
      dispatch(fetchProductsCategorys());
   }, []);

   useEffect(() => {
      if (!!productAllCategory && productAllCategory.success) {
         setProductCategory(productAllCategory.allCategory);
      }
   }, [productAllCategory]);

   return (
      <upload.div>
         <DashboardNavbarComponent />
         <upload.paddingDiv>
            <HeadingComponent
               Heading={"Upload Product"}
               subHeading={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
               }
            />

            <upload.flex>
               <upload.upload>
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
                        name="name"
                        type={"text"}
                        label="Product Name"
                        variant="outlined"
                     />
                     <upload.flexDiv>
                        <div className="space-right">
                           <TextField
                              id="outlined-basic"
                              name="price"
                              type={"number"}
                              label="Product Price"
                              variant="outlined"
                           />
                        </div>
                        <div>
                           <TextField
                              id="outlined-basic"
                              name="salePrice"
                              type={"number"}
                              label="Product Sale Price"
                              variant="outlined"
                           />
                        </div>
                     </upload.flexDiv>
                     <TextField
                        id="outlined-multiline-static"
                        label="Product discription"
                        multiline
                        rows={5}
                     />
                     <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        helperText="Please select your category"
                     >
                        {ProductCategory.map((option) => (
                           <MenuItem key={option._id} value={option.name}>
                              {option.name}
                           </MenuItem>
                        ))}
                     </TextField>

                     <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        helperText="Please select the product in stock or not"
                     >
                        {inStock.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </TextField>

                     <upload.flexDiv>
                        <div className="space-right">
                           <TextField
                              id="outlined-basic"
                              name="weight"
                              type={"number"}
                              label="Product Weight"
                              variant="outlined"
                           />
                        </div>
                        <div>
                           <TextField
                              id="outlined-basic"
                              name="length"
                              type={"number"}
                              label="Product Length"
                              variant="outlined"
                           />
                        </div>
                     </upload.flexDiv>
                     <upload.flexDiv>
                        <div className="space-right">
                           <TextField
                              id="outlined-basic"
                              name="wide"
                              type={"number"}
                              label="Product Wide"
                              variant="outlined"
                           />
                        </div>
                        <div>
                           <TextField
                              id="outlined-basic"
                              name="height"
                              type={"number"}
                              label="Product Height"
                              variant="outlined"
                           />
                        </div>
                     </upload.flexDiv>
                  </Box>
               </upload.upload>
               <div className="padding_div">
                  <HeadingComponent cl="sm_heading" Heading={"Product Image"} />
                  <ProductUploadImageComponent />
                  <upload.marginDiv>
                     <Box
                        component="form"
                        sx={{
                           "& > :not(style)": { my: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                     >
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Select"
                           helperText="Please selecte the product suggested age"
                        >
                           {sugAge.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.label}
                              </MenuItem>
                           ))}
                        </TextField>
                     </Box>
                  </upload.marginDiv>
               </div>
            </upload.flex>
         </upload.paddingDiv>
      </upload.div>
   );
}

export default UploadProductComponent;
