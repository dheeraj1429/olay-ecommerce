import React, { useState, useEffect } from "react";
import * as category from "./UploadProductCategory.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { message } from "antd";
import { uploadProductCategory } from "../../Redux/Actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import {
   productCategoryLoadingFn,
   removeCategoryInfo,
   insertNewCategory,
} from "../../Redux/Actions/appAction";
import ProductCategorysComponent from "../ProductCategorysComponent/ProductCategorysComponent";
import EditProductCategoryComponent from "../EditProductCategoryComponent/EditProductCategoryComponent";

const key = "updatable";

function UploadProductCategory() {
   const [CategoryInfo, setCategoryInfo] = useState({
      categoryName: "",
      categoryDescription: "",
   });
   const dispatch = useDispatch();

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setCategoryInfo({ ...CategoryInfo, [name]: value });
   };

   const productCategory = useSelector((state) => state.admin.productCategory);
   const productCategoryLoading = useSelector((state) => state.admin.productCategoryLoading);
   const editCategory = useSelector((state) => state.admin.editCategory);

   const info = (mes) => {
      message.info(mes);
   };

   const UploadHandler = function () {
      const { categoryName, categoryDescription } = CategoryInfo;

      if (categoryName || categoryDescription) {
         dispatch(uploadProductCategory({ categoryName, categoryDescription }));
         dispatch(productCategoryLoadingFn(true));
         message.loading({
            content: "Loading...",
            key,
         });
      } else {
         info("Please fill the form");
      }
   };

   useEffect(() => {
      if (!!productCategory && productCategory.success) {
         message.success({
            content: productCategory.message,
            key,
            duration: 2,
         });
         const { categoryName, categoryDescription } = CategoryInfo;
         dispatch(removeCategoryInfo(null));
         dispatch(insertNewCategory({ name: categoryName, description: categoryDescription }));
      } else if (!!productCategory && !productCategory.success) {
         info(productCategory.message);
         dispatch(removeCategoryInfo(null));
      }
   }, [productCategory]);

   return (
      <category.div>
         <EditProductCategoryComponent show={editCategory} />
         <DashboardNavbarComponent />
         <category.innerDiv>
            <HeadingComponent
               Heading={"Product Category"}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`}
            />

            <category.flex>
               <category.contentDiv>
                  <ProductCategorysComponent />
               </category.contentDiv>
               <category.contentDiv>
                  <Box
                     component="form"
                     sx={{
                        "& > :not(style)": { mb: 2, width: "100%" },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        id="outlined-basic"
                        name="categoryName"
                        value={CategoryInfo.categoryName}
                        label="Category Name"
                        variant="outlined"
                        onChange={ChangeHandler}
                     />
                     <TextField
                        id="outlined-multiline-static"
                        label="Category Description"
                        multiline
                        name="categoryDescription"
                        value={CategoryInfo.categoryDescription}
                        rows={6}
                        onChange={ChangeHandler}
                     />
                  </Box>
                  <CustombuttonComponent
                     innerText={"Save"}
                     btnCl={"category_upload"}
                     onClick={UploadHandler}
                     isLoading={productCategoryLoading}
                  />
               </category.contentDiv>
            </category.flex>
         </category.innerDiv>
      </category.div>
   );
}

export default UploadProductCategory;
