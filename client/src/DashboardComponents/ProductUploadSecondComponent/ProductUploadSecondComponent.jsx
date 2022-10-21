import React, { useEffect, useState } from 'react';
import * as upload from '../UploadProductComponent/UploadProductComponent.style';
import ProductUploadImageComponent from '../ProductUploadImageComponent/ProductUploadImageComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductTags, fetchProductBrandItemsInfo } from '../../Redux/Actions/adminAction';
import { useParams } from 'react-router';

function ProductUploadSecondComponent({ sugAge, state, ChangeHandler, ImageGrabHandler }) {
   const param = useParams();
   const [Image, setImage] = useState('');

   const allProductBrands = useSelector((state) => state.admin.allProductBrands);
   const singleProductFetch = useSelector((state) => state.admin.singleProductFetch);
   // const allTags = useSelector((state) => state.admin.allTags);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProductBrandItemsInfo());
      dispatch(fetchAllProductTags());
   }, []);

   useEffect(() => {
      if (param?.id && !!singleProductFetch && singleProductFetch.success) {
         setImage(singleProductFetch.product.productImage);
      }

      return () => {
         setImage('');
      };
   }, [singleProductFetch]);

   return (
      <div className="padding_div">
         <upload.flexDiv>
            <div>
               <HeadingComponent cl="sm_heading" Heading={'Product Image'} />
               <ProductUploadImageComponent
                  size={'big'}
                  onChange={ImageGrabHandler}
                  selectedPrevImage={Image}
                  filde={'productImages'}
               />
            </div>
            {/* <div>
               <HeadingComponent cl="sm_heading" Heading={"Product Tags"} />
               <ProductTagsContainerComponent />
            </div> */}
         </upload.flexDiv>
         <upload.marginDiv>
            <Box
               component="form"
               sx={{
                  '& > :not(style)': { my: 1, width: '100%' },
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
               {/* <Autocomplete
                  multiple
                  limitTags={5}
                  id="multiple-limit-tags"
                  options={
                     !!allTags && allTags?.success && allTags?.allTags
                        ? allTags.allTags
                        : []
                  }
                  getOptionLabel={(option) => option.name}
                  defaultValue={
                     !!allTags && allTags?.success && allTags?.allTags
                        ? allTags.allTags[0]
                        : []
                  }
                  onChange={(event, value) => TagHandler(value)}
                  renderInput={(params) => (
                     <TextField {...params} label="Tags" placeholder="Favorites" />
                  )}
                  sx={{ width: "500px" }}
               /> */}
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

export default React.memo(ProductUploadSecondComponent);
