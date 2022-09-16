import React, { useEffect, useState } from "react";
import * as upload from "../UploadProductComponent/UploadProductComponent.style";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBrandItemsInfo } from "../../Redux/Actions/adminAction";
import { useParams } from "react-router";

function ProductUploadSecondComponent({
   sugAge,
   state,
   ChangeHandler,
   ImageGrabHandler,
}) {
   const allProductBrands = useSelector((state) => state.admin.allProductBrands);
   const singleProductFetch = useSelector((state) => state.admin.singleProductFetch);

   const dispatch = useDispatch();
   const param = useParams();
   const [Image, setImage] = useState("");

   useEffect(() => {
      dispatch(fetchProductBrandItemsInfo());
   }, []);

   useEffect(() => {
      if (param?.id && !!singleProductFetch && singleProductFetch.success) {
         setImage(singleProductFetch.product.productImage);
      }

      return () => {
         setImage("");
      };
   }, [singleProductFetch]);

   return (
      <div className="padding_div">
         <HeadingComponent cl="sm_heading" Heading={"Product Image"} />
         <ProductUploadImageComponent
            size={"big"}
            onChange={ImageGrabHandler}
            selectedPrevImage={Image}
            filde={"productImages"}
         />
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
                  name="suggestedAge"
                  helperText="Please select the product suggested age"
                  value={state.suggestedAge}
                  onChange={ChangeHandler}
               >
                  {sugAge.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>

               <TextField
                  id="outlined-select-currency"
                  select
                  name="brand"
                  label="Select"
                  helperText="Please select the product brand"
                  value={state.brand}
                  onChange={ChangeHandler}
               >
                  {!!allProductBrands && allProductBrands?.success
                     ? allProductBrands.brands.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                             {option.name}
                          </MenuItem>
                       ))
                     : null}
               </TextField>
            </Box>
         </upload.marginDiv>
      </div>
   );
}

export default ProductUploadSecondComponent;
