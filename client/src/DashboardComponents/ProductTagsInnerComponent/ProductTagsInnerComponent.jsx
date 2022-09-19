import React, { useState, useEffect } from "react";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import * as tags from "./ProductTagsInnerComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveNewTag } from "../../Redux/Actions/adminAction";
import {
   removeProductTagInfo,
   productTagLoading,
   editProductTagLoading,
   removeUpdateTagInfo,
} from "../../Redux/Actions/appAction";
import { useParams } from "react-router";
import { fetchSelectedProductTag, editProductTag } from "../../Redux/Actions/adminAction";

const currencies = [
   { value: "Pending", label: "Pending" },
   { value: "Published", label: "Published" },
   { value: "Draft", label: "Draft" },
];

function ProductTagsInnerComponent() {
   const [ProductTags, setProductTags] = useState({
      name: "",
      description: "",
      status: "Draft",
   });

   const dispatch = useDispatch();
   const params = useParams();
   const insertNewProductTag = useSelector((state) => state.admin.insertNewProductTag);
   const productTagLoding = useSelector((state) => state.admin.productTagLoding);
   const selectedProductTag = useSelector((state) => state.admin.selectedProductTag);
   const updateProductTagLoading = useSelector(
      (state) => state.admin.updateProductTagLoading
   );
   const editProductEdit = useSelector((state) => state.admin.editProductEdit);

   const changeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setProductTags({ ...ProductTags, [name]: value });
   };

   const info = (msg) => {
      message.info(msg);
   };

   const SendHandler = function () {
      const { name, description, status } = ProductTags;
      if (name || description) {
         if (name) {
            dispatch(saveNewTag({ name, description, status }));
            dispatch(productTagLoading(true));
         } else {
            info("Product tag name is required");
         }
      } else {
         info("Please fill required filde");
      }
   };

   const ClearHandler = function () {
      setProductTags({
         name: "",
         description: "",
         status: "Draft",
      });
   };

   const updateHandler = function () {
      if (
         ProductTags.name !== selectedProductTag.tag.name ||
         ProductTags.description !== selectedProductTag.tag.description ||
         ProductTags.status !== selectedProductTag.tag.status
      ) {
         dispatch(
            editProductTag({
               id: selectedProductTag.tag._id,
               name: ProductTags.name,
               description: ProductTags.description,
               status: ProductTags.status,
            })
         );
         dispatch(editProductTagLoading(true));
      } else {
         info("Fields values is not changed");
      }
   };

   useEffect(() => {
      if (!!insertNewProductTag) {
         info(insertNewProductTag.message);
         dispatch(removeProductTagInfo(null));
      }
   }, [insertNewProductTag]);

   useEffect(() => {
      if (params?.id && !!selectedProductTag && selectedProductTag.success) {
         setProductTags({
            name: selectedProductTag.tag.name,
            description: selectedProductTag.tag.description,
            status: selectedProductTag.tag.status,
         });
      }
   }, [selectedProductTag]);

   useEffect(() => {
      if (params?.id) {
         dispatch(fetchSelectedProductTag(params.id));
      }
   }, [params?.id]);

   useEffect(() => {
      if (!!editProductEdit) {
         info(editProductEdit.message);
         dispatch(removeUpdateTagInfo(null));
      }
   }, [!!editProductEdit]);

   return (
      <tags.div>
         <HeadingComponent
            Heading={!!selectedProductTag && params?.id ? "Edit tag" : "Product Tags"}
         />
         <tags.spaceDiv>
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
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={ProductTags.name}
                  onChange={changeHandler}
                  required
               />
               <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={8}
                  name="description"
                  value={ProductTags.description}
                  onChange={changeHandler}
               />
               <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={ProductTags.status}
                  name="status"
                  helperText="Please select your currency"
                  onChange={changeHandler}
               >
                  {currencies.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>
            </Box>

            {!!selectedProductTag && params?.id ? (
               <CustombuttonComponent
                  innerText={"Update"}
                  onClick={updateHandler}
                  btnCl={"category_upload"}
                  isLoading={updateProductTagLoading}
               />
            ) : (
               <tags.flex>
                  <div className="pd">
                     <CustombuttonComponent
                        innerText={"Save"}
                        onClick={SendHandler}
                        btnCl={"category_upload"}
                        isLoading={productTagLoding}
                     />
                  </div>
                  <div className="pd">
                     <CustombuttonComponent
                        innerText={"Clear"}
                        onClick={ClearHandler}
                        btnCl={"clear_btn"}
                     />
                  </div>
               </tags.flex>
            )}
         </tags.spaceDiv>
      </tags.div>
   );
}

export default ProductTagsInnerComponent;
