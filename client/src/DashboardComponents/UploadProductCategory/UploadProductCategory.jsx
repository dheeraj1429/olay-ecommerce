import React, { useState, useEffect } from 'react';
import * as category from './UploadProductCategory.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { message } from 'antd';
import { uploadProductCategory } from '../../Redux/Actions/adminAction';
import { useSelector, useDispatch } from 'react-redux';
import { productCategoryLoadingFn, removeCategoryInfo, insertNewCategory } from '../../Redux/Actions/adminAppAction';
import ProductCategorysComponent from '../ProductCategorysComponent/ProductCategorysComponent';
import EditProductCategoryComponent from '../EditProductCategoryComponent/EditProductCategoryComponent';
import ProductUploadImageComponent from '../ProductUploadImageComponent/ProductUploadImageComponent';

const key = 'updatable';

function UploadProductCategory() {
   const [CategoryInfo, setCategoryInfo] = useState({
      categoryName: '',
      categoryDescription: '',
      CategoryImage: '',
   });

   const dispatch = useDispatch();
   const { productCategory, productCategoryLoading, editCategory } = useSelector((state) => state.admin);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setCategoryInfo({ ...CategoryInfo, [name]: value });
   };

   const info = (mes) => {
      message.info(mes);
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setCategoryInfo({ ...CategoryInfo, CategoryImage: data });
   };

   const UploadHandler = function () {
      const { categoryName, categoryDescription, CategoryImage } = CategoryInfo;

      if (categoryName || categoryDescription) {
         const formData = new FormData();
         formData.append('categoryName', categoryName);
         formData.append('categoryDescription', categoryDescription);
         dispatch(uploadProductCategory(formData));

         if (!!CategoryImage) {
            formData.append('CategoryImage', CategoryImage);
            dispatch(uploadProductCategory(formData));
         }

         dispatch(productCategoryLoadingFn(true));
         message.loading({
            content: 'Loading...',
            key,
         });
      } else {
         info('Please fill the form');
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
         dispatch(
            insertNewCategory({
               name: categoryName,
               description: categoryDescription,
               products: [],
            })
         );
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
               Heading={'Product Category'}
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
                        '& > :not(style)': { mb: 2, width: '100%' },
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

                     <ProductUploadImageComponent selectedPrevImage={CategoryInfo.CategoryImage} onChange={ImageGrabHandler} />
                  </Box>
                  <CustombuttonComponent
                     innerText={'Save'}
                     btnCl={'category_upload'}
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
