import React, { useState, useEffect } from "react";
import * as edit from "./EditProductCategoryInnerComponent.style";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { editProductCategory } from "../../Redux/Actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";

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

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setEditCategory({ ...EditCategory, [name]: value });
   };

   const EditHandler = function (id) {
      console.log(id);
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
   }, [selectedCategory]);

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
               <CustombuttonComponent
                  innerText={"Edit Category"}
                  btnCl={"category_upload"}
                  onClick={() => EditHandler(selectedCategory._id)}
               />
            </>
         ) : null}
      </edit.div>
   );
}

export default EditProductCategoryInnerComponent;
