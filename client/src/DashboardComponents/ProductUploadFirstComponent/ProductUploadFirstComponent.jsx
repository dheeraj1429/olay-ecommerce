import React, { useEffect } from "react";
import * as upload from "../UploadProductComponent/UploadProductComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsCategorys } from "../../Redux/Actions/adminAction";

function ProductUploadFirstComponent({ inStock, ChangeHandler, state }) {
   const productAllCategory = useSelector((state) => state.admin.productAllCategory);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProductsCategorys());
   }, []);

   return (
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
               value={state.name}
               onChange={ChangeHandler}
            />
            <upload.flexDiv>
               <div className="space-right">
                  <TextField
                     id="outlined-basic"
                     name="price"
                     type={"number"}
                     label="Product Price"
                     variant="outlined"
                     value={state.price}
                     onChange={ChangeHandler}
                  />
               </div>
               <div>
                  <TextField
                     id="outlined-basic"
                     name="salePrice"
                     type={"number"}
                     label="Product Sale Price"
                     variant="outlined"
                     value={state.salePrice}
                     onChange={ChangeHandler}
                  />
               </div>
            </upload.flexDiv>
            <TextField
               id="outlined-multiline-static"
               label="Product discription"
               multiline
               rows={8}
               name="discription"
               value={state.discription}
               onChange={ChangeHandler}
            />
            <upload.flexDiv>
               <div className="space-right">
                  <TextField
                     id="outlined-select-currency"
                     select
                     label="Select"
                     name="category"
                     helperText="Please select your category"
                     value={state.category}
                     onChange={ChangeHandler}
                  >
                     {!!productAllCategory && productAllCategory?.success
                        ? productAllCategory.allCategory.map((option) => (
                             <MenuItem key={option._id} value={option._id}>
                                {option.name}
                             </MenuItem>
                          ))
                        : null}
                  </TextField>
               </div>

               <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  name="stockStatus"
                  value={state.stockStatus}
                  onChange={ChangeHandler}
                  helperText="Please select the product in stock or not"
               >
                  {inStock.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>
            </upload.flexDiv>

            <upload.flexDiv>
               <div className="space-right">
                  <TextField
                     id="outlined-basic"
                     name="weight"
                     type={"number"}
                     label="Product Weight"
                     variant="outlined"
                     value={state.weight}
                     onChange={ChangeHandler}
                  />
               </div>
               <div>
                  <TextField
                     id="outlined-basic"
                     name="length"
                     type={"number"}
                     label="Product Length"
                     variant="outlined"
                     value={state.length}
                     onChange={ChangeHandler}
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
                     value={state.wide}
                     onChange={ChangeHandler}
                  />
               </div>
               <div>
                  <TextField
                     id="outlined-basic"
                     name="height"
                     type={"number"}
                     label="Product Height"
                     variant="outlined"
                     value={state.height}
                     onChange={ChangeHandler}
                  />
               </div>
            </upload.flexDiv>
         </Box>
      </upload.upload>
   );
}

export default ProductUploadFirstComponent;
