import React, { useState, useEffect } from "react";
import * as edit from "./EditProductCategoryInnerComponent.style";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
   editProductCategory,
   categoryUpdateLoading,
   removeCategoryUpdateInfo,
} from "../../Redux/Actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import {
   updateProductCategory,
   deleteSelectedCategory,
} from "../../Redux/Actions/adminAction";
import { message } from "antd";

function EditProductCategoryInnerComponent() {
   const dispatch = useDispatch();
   const [EditCategory, setEditCategory] = useState({
      name: "",
      description: "",
   });
   const ShowHandler = function () {
      dispatch(editProductCategory(false));
   };

   const selectedCategory = useSelector((state) => state.admin.selectedCategory);
   const editCategoryLoading = useSelector((state) => state.admin.editCategoryLoading);
   const updateCategory = useSelector((state) => state.admin.updateCategory);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setEditCategory({ ...EditCategory, [name]: value });
   };

   const info = (mes) => {
      message.info(mes);
   };

   useEffect(() => {
      if (!!selectedCategory) {
         setEditCategory({
            name: selectedCategory && selectedCategory?.name,
            description:
               (selectedCategory &&
                  !!selectedCategory?.description &&
                  selectedCategory?.description) ||
               "",
         });
      }

      if (!!updateCategory) {
         message.success(updateCategory.message);
         dispatch(removeCategoryUpdateInfo());
      }
   }, [selectedCategory, updateCategory]);

   const EditHandler = function (id) {
      const { name, description } = EditCategory;
      if (!!selectedCategory) {
         if (
            name !== selectedCategory.name ||
            (description !== selectedCategory?.description && description !== "")
         ) {
            dispatch(updateProductCategory({ categoryId: id, name, description }));
            dispatch(categoryUpdateLoading(true));
         } else {
            info("Older values and new values is the same. No changes!!");
         }
      } else {
         info("No Selected category");
      }
   };

   const CategoryDeleteHandler = function () {
      if (selectedCategory) {
         dispatch(
            deleteSelectedCategory({
               id: selectedCategory._id,
               name: selectedCategory.name,
            })
         );
      }
   };

   return (
      <edit.div>
         {!!selectedCategory ? (
            <>
               <div className="close_btn">
                  <IoIosClose onClick={ShowHandler} />
               </div>
               <HeadingComponent Heading={"Edit Category"} cl="sm_heading" />
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
                     value={EditCategory.name}
                     label="Name"
                     variant="outlined"
                     onChange={ChangeHandler}
                     name="name"
                  />
                  <TextField
                     id="outlined-basic"
                     label="description"
                     variant="outlined"
                     multiline
                     rows={4}
                     value={EditCategory.description}
                     onChange={ChangeHandler}
                     name="description"
                  />
               </Box>
               <edit.flex>
                  <CustombuttonComponent
                     innerText={"Edit Category"}
                     btnCl={"category_upload"}
                     onClick={() => EditHandler(selectedCategory._id)}
                     isLoading={editCategoryLoading}
                  />

                  <CustombuttonComponent
                     innerText={"Delete"}
                     btnCl={"Delete_btn"}
                     onClick={CategoryDeleteHandler}
                  />
               </edit.flex>
            </>
         ) : null}
      </edit.div>
   );
}

export default EditProductCategoryInnerComponent;
