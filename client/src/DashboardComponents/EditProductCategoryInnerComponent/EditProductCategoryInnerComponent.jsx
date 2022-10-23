import React, { useState, useEffect } from 'react';
import * as edit from './EditProductCategoryInnerComponent.style';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { editProductCategory, categoryUpdateLoading, removeCategoryUpdateInfo } from '../../Redux/Actions/adminAppAction';
import { useDispatch, useSelector } from 'react-redux';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { updateProductCategory, deleteSelectedCategory } from '../../Redux/Actions/adminAction';
import { message } from 'antd';
import ProductUploadImageComponent from '../ProductUploadImageComponent/ProductUploadImageComponent';

function EditProductCategoryInnerComponent() {
   const dispatch = useDispatch();
   const [EditCategory, setEditCategory] = useState({
      name: '',
      description: '',
      categoryImage: '',
   });
   const ShowHandler = function () {
      dispatch(editProductCategory(false));
   };

   const { selectedCategory, editCategoryLoading, updateCategory } = useSelector((state) => state.admin);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setEditCategory({ ...EditCategory, [name]: value });
   };

   const info = (mes) => {
      message.info(mes);
   };

   useEffect(() => {
      if (!!selectedCategory && selectedCategory.success) {
         setEditCategory({
            name: selectedCategory && selectedCategory?.category.name,
            description:
               (selectedCategory && !!selectedCategory?.category.description && selectedCategory?.category.description) || '',
            categoryImage:
               selectedCategory && !!selectedCategory?.category.categoryImage ? selectedCategory?.category.categoryImage : '',
         });
      }

      if (!!updateCategory) {
         message.success(updateCategory.message);
         dispatch(removeCategoryUpdateInfo());
      }
   }, [selectedCategory, updateCategory]);

   const EditHandler = function (id) {
      const { name, description, categoryImage } = EditCategory;
      if (!!selectedCategory) {
         if (name !== selectedCategory.name || (description !== selectedCategory?.description && description !== '')) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('CategoryImage', categoryImage);
            formData.append('categoryId', id);

            dispatch(updateProductCategory(formData));
            dispatch(categoryUpdateLoading(true));
         } else {
            info('Older values and new values is the same. No changes!!');
         }
      } else {
         info('No Selected category');
      }
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setEditCategory({ ...EditCategory, categoryImage: data });
   };

   const CategoryDeleteHandler = function () {
      if (selectedCategory) {
         dispatch(
            deleteSelectedCategory({
               id: selectedCategory.category._id,
               name: selectedCategory.category.name,
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
               <HeadingComponent Heading={'Edit Category'} cl="sm_heading" />
               <Box
                  component="form"
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
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

                  <ProductUploadImageComponent
                     selectedPrevImage={EditCategory.categoryImage}
                     filde={'categoryImages'}
                     onChange={ImageGrabHandler}
                  />
               </Box>
               <edit.flex>
                  <CustombuttonComponent
                     innerText={'Edit Category'}
                     btnCl={'category_upload'}
                     onClick={() => EditHandler(selectedCategory.category._id)}
                     isLoading={editCategoryLoading}
                  />

                  <CustombuttonComponent innerText={'Delete'} btnCl={'Delete_btn'} onClick={CategoryDeleteHandler} />
               </edit.flex>
            </>
         ) : null}
      </edit.div>
   );
}

export default React.memo(EditProductCategoryInnerComponent);
