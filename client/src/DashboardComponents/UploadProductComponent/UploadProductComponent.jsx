import React, { useState } from "react";
import * as upload from "./UploadProductComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";

const currencies = [
   { value: "Makeup", label: "Makeup" },
   { value: "Skin care", label: "Skin care" },
   { value: "Hair care", label: "Hair care" },
   { value: "Luxury beauty", label: "Luxury beauty" },
   { value: "Men's grooming", label: "Men's grooming" },
   { value: "Luxury stores", label: "Luxury stores" },
];

const sugAge = [
   { value: "18 - 25", label: "18 - 25" },
   { value: "25 - 30", label: "25 - 30" },
   { value: "30 - 35", label: "30 - 35" },
   { value: "35 - 40", label: "35 - 40" },
   { value: "40 - 50", label: "40 - 50" },
];

function UploadProductComponent() {
   const [currency, setCurrency] = useState("EUR");

   const [Product, setProduct] = useState({
      name: "",
      price: "",
      discription: "",
      category: "",
      image: "",
      suggestedAge: "",
      suggestedSkinColor: "",
   });

   const handleChange = (event) => {
      setCurrency(event.target.value);
   };

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
                     <TextField
                        id="outlined-basic"
                        name="price"
                        type={"number"}
                        label="Product Price"
                        variant="outlined"
                     />
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
                        value={currency}
                        onChange={handleChange}
                        helperText="Please select your category"
                     >
                        {currencies.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </TextField>
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
                           onChange={handleChange}
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
