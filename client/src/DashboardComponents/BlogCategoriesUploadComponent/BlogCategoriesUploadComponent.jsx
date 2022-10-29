import React, { useState, useEffect } from 'react';
import * as styled from './BlogCategoriesUploadComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { insertBlogPostCategories, getBlogCategories } from '../../Redux/Actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { insertBlogCategorisLoadingHandler, removerBlogCategoriInfo } from '../../Redux/Actions/adminAppAction';
import { message } from 'antd';

const Status = [
   { value: 'Published', label: 'Published' },
   { value: 'Draft', label: 'Draft' },
   { value: 'Pending', label: 'Pending' },
];

function BlogCategoriesUploadComponent() {
   const [Categorie, setCategorie] = useState({
      name: '',
      parent: '',
      description: '',
      categorieStatus: 'Draft',
      IsDefault: false,
      IsFeatured: false,
   });
   const [Parent, setParent] = useState([]);

   const dispatch = useDispatch();
   const { insertBlogPostCategoriesLoading, insertBlogPostCategoriesInfo } = useSelector((state) => state.admin);

   const changeHandler = function (e, target = undefined) {
      const name = e.target.name;

      if (target === 'checkBox') {
         setCategorie({ ...Categorie, [name]: e.target.checked });
      } else {
         const value = e.target.value;
         setCategorie({ ...Categorie, [name]: value });
      }
   };

   const sendHandler = function () {
      if (Categorie.name) {
         dispatch(insertBlogPostCategories(Categorie));
         dispatch(insertBlogCategorisLoadingHandler(true));
      } else {
         message.info('categorie name is required');
      }
   };

   useEffect(() => {
      if (!!insertBlogPostCategoriesInfo && insertBlogPostCategoriesInfo?.success) {
         message.success(insertBlogPostCategoriesInfo.message);
      }
      if (!!insertBlogPostCategoriesInfo && !insertBlogPostCategoriesInfo?.success) {
         message.info(insertBlogPostCategoriesInfo.message);
      }
   }, [insertBlogPostCategoriesInfo]);

   useEffect(() => {
      dispatch(getBlogCategories());

      return () => {
         dispatch(removerBlogCategoriInfo());
      };
   }, []);

   return (
      <styled.div>
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
               name="name"
               onChange={(e) => changeHandler(e)}
               value={Categorie.name}
               label="Name"
               variant="outlined"
            />

            <TextField
               id="outlined-select-currency"
               select
               label="parent"
               value={Parent}
               name="Parent"
               onChange={(e) => changeHandler(e)}
               helperText="parent categorie"
            >
               {Parent.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                     {option.label}
                  </MenuItem>
               ))}
            </TextField>
            <TextField
               id="outlined-multiline-static"
               onChange={(e) => changeHandler(e)}
               label="Description"
               name="description"
               multiline
               rows={6}
               value={Categorie.description}
            />
            <div className="flex">
               <Checkbox
                  checked={Categorie.IsDefault}
                  name="IsDefault"
                  onChange={(event) => changeHandler(event, 'checkBox')}
               />
               <p>Is default?</p>
            </div>
            <TextField
               id="outlined-select-currency"
               select
               label="parent"
               value={Categorie.categorieStatus}
               name="categorieStatus"
               onChange={changeHandler}
               helperText="Categorie status"
            >
               {Status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                     {option.label}
                  </MenuItem>
               ))}
            </TextField>
            <div className="flex">
               <Checkbox
                  checked={Categorie.IsFeatured}
                  name="IsFeatured"
                  onChange={(event) => changeHandler(event, 'checkBox')}
               />
               <p>Is featured?</p>
            </div>
         </Box>
         <CustombuttonComponent
            isLoading={insertBlogPostCategoriesLoading}
            onClick={sendHandler}
            innerText={'Save'}
            btnCl={'category_upload'}
         />
      </styled.div>
   );
}

export default BlogCategoriesUploadComponent;
