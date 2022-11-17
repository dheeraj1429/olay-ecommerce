import React, { useState, useEffect } from 'react';
import * as variation from './CreateSelectedProductVariationComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import { Box, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ProductUploadImageComponent from '../ProductUploadImageComponent/ProductUploadImageComponent';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAllProductSizeVariations, getproductSwatches, insertProductSubVariation, fecthSingleSubVariation, updateSubVarition, delteSingleSubVariatoion } from '../../Redux/Actions/adminAction';
import { FaCircle } from '@react-icons/all-files/fa/FaCircle';
import {
   insertNewSubVationLoading,
   removeProductSubInfo,
   loadingUpdateSubVariation,
   removeSubVaritionInfo,
   removeProductSubVaritionInfo,
   deleteSubVaritionLoadingFn,
   removeDeleteSubVariationInfo,
} from '../../Redux/Actions/adminAppAction';
import { useLocation } from 'react-router';
import { message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router';

const stock = [
   { value: 'in stock', label: 'in stock' },
   { value: 'out of stock', label: 'out of stock' },
];

function CreateSelectedProductVariationComponent() {
   const [VariationInfo, setVariationInfo] = useState({
      name: '',
      sku: '',
      price: '',
      salePrice: '',
      stokeStatus: '',
      discription: '',
      productImage: '',
      colorSwatches: '',
      weight: '',
      length: '',
      wide: '',
      height: '',
      size: '',
   });

   const params = useParams();
   const dispatch = useDispatch();
   const location = useLocation();
   const navigation = useNavigate();

   const {
      allProductSwatches,
      allSizeVariations,
      productSubVariationLoading,
      productSubVariationInfo,
      fetchSingleSubVarition,
      editProductSingleVariationLoading,
      updateSingleSubVariation,
      deleteSubVaritionInfo,
      deleteSubVaritionLoading,
   } = useSelector((state) => state.admin);

   const info = (msg) => {
      message.info(msg);
   };

   const changeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setVariationInfo({ ...VariationInfo, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setVariationInfo({ ...VariationInfo, productImage: data });
   };

   const createFormData = function (id = undefined, parentTargetProduct = undefined) {
      const formData = new FormData();
      formData.append('selectedProductId', params.id);
      formData.append('variationName', VariationInfo.name);
      formData.append('sku', VariationInfo.sku);
      formData.append('price', VariationInfo.price);
      formData.append('salePrice', VariationInfo.salePrice);
      formData.append('stokeStatus', VariationInfo.stokeStatus);
      formData.append('discription', VariationInfo.discription);
      formData.append('productImage', VariationInfo.productImage);
      formData.append('colorSwatches', VariationInfo.colorSwatches);
      formData.append('weight', VariationInfo.weight);
      formData.append('length', VariationInfo.length);
      formData.append('wide', VariationInfo.wide);
      formData.append('height', VariationInfo.height);
      formData.append('size', VariationInfo.size);

      if (!!id) {
         formData.append('subVaritionId', id);
      }

      if (!!parentTargetProduct) {
         formData.append('parentProductId', parentTargetProduct);
      }

      return formData;
   };

   const SaveVariationHandler = function () {
      if (VariationInfo.name && params.id) {
         if (VariationInfo.colorSwatches) {
            const formData = createFormData();
            dispatch(insertProductSubVariation(formData));
            dispatch(insertNewSubVationLoading(true));
         } else {
            info('Product also required color varition.');
         }
      } else {
         info('Product variation name is required!');
      }
   };

   const getIdFunction = function () {
      const locationAr = location.pathname.split('/');

      let secondLast = locationAr[locationAr.length - 2],
         parentProductId = locationAr[4],
         last = locationAr[locationAr.length - 1];

      return {
         secondLast,
         parentProductId,
         last,
      };
   };

   const updateHandler = function () {
      const { parentProductId } = getIdFunction();

      const formData = createFormData(fetchSingleSubVarition.subVariation?.variations[0]._id, parentProductId);

      dispatch(loadingUpdateSubVariation(true));
      dispatch(updateSubVarition(formData));
   };

   const DeleteHandler = () => {
      const { parentProductId, last } = getIdFunction();
      dispatch(delteSingleSubVariatoion({ parentProductId, subVariationId: last }));
      dispatch(deleteSubVaritionLoadingFn(true));
   };

   useEffect(() => {
      const { secondLast, parentProductId, last } = getIdFunction();

      if (secondLast === 'editSub') {
         dispatch(fecthSingleSubVariation(last, parentProductId));
      }

      dispatch(getproductSwatches());
      dispatch(getAllProductSizeVariations());

      return () => {
         dispatch(removeProductSubInfo(null));

         if (secondLast === 'editSub') {
            dispatch(removeSubVaritionInfo(null));
            dispatch(removeProductSubVaritionInfo(null));
         }
      };
   }, []);

   useEffect(() => {
      if (!!productSubVariationInfo && productSubVariationInfo.success) {
         message.success(productSubVariationInfo.message);
      }
   }, [productSubVariationInfo]);

   useEffect(() => {
      if (!!fetchSingleSubVarition && fetchSingleSubVarition?.success && fetchSingleSubVarition?.subVariation) {
         let subVariation = fetchSingleSubVarition.subVariation?.variations[0];
         console.log(subVariation);

         setVariationInfo({
            name: subVariation.name,
            sku: subVariation.sku,
            price: !!subVariation.price ? subVariation.price : '',
            salePrice: !!subVariation?.salePrice ? subVariation.salePrice : '',
            stokeStatus: subVariation?.stokeStatus,
            discription: subVariation?.discription,
            productImage: subVariation.productImage,
            colorSwatches: subVariation?.colorSwatches?._id,
            weight: subVariation?.weight ? subVariation.weight : '',
            length: subVariation?.length ? subVariation.length : '',
            wide: subVariation?.wide ? subVariation.wide : '',
            height: subVariation?.height ? subVariation.height : '',
            size: subVariation?.size ? subVariation?.size._id : '',
         });
      }
   }, [fetchSingleSubVarition]);

   useEffect(() => {
      if (!!updateSingleSubVariation) {
         info(updateSingleSubVariation.message);
      }
   }, [updateSingleSubVariation]);

   useEffect(() => {
      if (!!deleteSubVaritionInfo) {
         info(deleteSubVaritionInfo.message);

         if (deleteSubVaritionInfo.success) {
            navigation('/dashboard/product-variation');
            dispatch(removeDeleteSubVariationInfo(true));
         }
      }
   }, [deleteSubVaritionInfo]);

   return (
      <variation.div>
         <DashboardNavbarComponent />

         <variation.spaceDiv>
            <HeadingComponent
               Heading={!!fetchSingleSubVarition && fetchSingleSubVarition?.success && fetchSingleSubVarition?.subVariation ? 'Edit Product sub varition' : 'Create product variations'}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`}
            />

            <ul>
               <li>
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
                        label="Variation name"
                        variant="outlined"
                        type={'text'}
                        name="name"
                        value={VariationInfo.name}
                        onChange={changeHandler}
                        helperText="Product variations name for example: color red variation, size xl variation"
                     />
                     <TextField id="outlined-basic" label="SKU" variant="outlined" type={'text'} name="sku" value={VariationInfo.sku} onChange={changeHandler} />
                     <variation.flex>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Regular Price" variant="outlined" type={'number'} name="price" value={VariationInfo.price} onChange={changeHandler} />
                        </div>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Sale Price" variant="outlined" type={'number'} name="salePrice" value={VariationInfo.salePrice} onChange={changeHandler} />
                        </div>
                     </variation.flex>
                     <variation.flex>
                        <div className="half-width">
                           <TextField id="outlined-select-currency" select label="Select" helperText="Stock status" name="stokeStatus" value={VariationInfo.stokeStatus} onChange={changeHandler}>
                              {stock.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </div>
                        {/* <div className="half-width">
                           <TextField id="outlined-select-currency" select label="Select" helperText="Product size variation" name="size" value={VariationInfo.size} onChange={changeHandler}>
                              {!!allSizeVariations && allSizeVariations.success && allSizeVariations?.sizeVariations
                                 ? allSizeVariations.sizeVariations.map((option) => (
                                      <MenuItem key={option._id} value={option._id}>
                                         {option.name}
                                      </MenuItem>
                                   ))
                                 : null}
                           </TextField>
                        </div> */}
                        <div className="half-width">
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Select"
                              helperText="Product variation swatches"
                              name="colorSwatches"
                              value={VariationInfo.colorSwatches}
                              onChange={changeHandler}
                           >
                              {!!allProductSwatches && allProductSwatches.success && allProductSwatches?.allSwatches
                                 ? allProductSwatches.allSwatches.map((option) => (
                                      <MenuItem key={option._id} value={option._id}>
                                         <variation.flexSpace className="flex_items">
                                            {option.name}
                                            <FaCircle
                                               style={{
                                                  fill: `${option.colorCode.hex}`,
                                               }}
                                            />
                                         </variation.flexSpace>
                                      </MenuItem>
                                   ))
                                 : null}
                           </TextField>
                        </div>
                     </variation.flex>
                     <variation.flex>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Product weight" variant="outlined" type={'number'} name="weight" value={VariationInfo.weight} onChange={changeHandler} />
                        </div>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Product length" variant="outlined" type={'number'} name="length" value={VariationInfo.length} onChange={changeHandler} />
                        </div>
                     </variation.flex>
                     <variation.flex>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Product wide" variant="outlined" type={'number'} name="wide" value={VariationInfo.wide} onChange={changeHandler} />
                        </div>
                        <div className="half-width">
                           <TextField id="outlined-basic" label="Product height" variant="outlined" type={'number'} name="height" value={VariationInfo.height} onChange={changeHandler} />
                        </div>
                     </variation.flex>
                     <TextField id="outlined-multiline-static" label="Description" multiline rows={4} defaultValue="" name="discription" value={VariationInfo.discription} onChange={changeHandler} />
                     <HeadingComponent cl="sm_heading" Heading={'Product variations image'} />
                     <ProductUploadImageComponent
                        selectedPrevImage={!!VariationInfo?.productImage ? VariationInfo?.productImage : null}
                        filde="productImages"
                        onChange={ImageGrabHandler}
                        name="variationImage"
                     />
                  </Box>
                  {!!fetchSingleSubVarition && fetchSingleSubVarition?.success && fetchSingleSubVarition?.subVariation ? (
                     <variation.flex>
                        <CustombuttonComponent innerText={'Update'} btnCl={'category_upload'} onClick={updateHandler} isLoading={editProductSingleVariationLoading} />

                        <Popconfirm title="Are you sure to delete this sub variation ?" onConfirm={DeleteHandler} okText="Yes" cancelText="No">
                           <CustombuttonComponent innerText={'Delete'} btnCl={'Delete_btn'} isLoading={deleteSubVaritionLoading} />
                        </Popconfirm>
                     </variation.flex>
                  ) : (
                     <CustombuttonComponent innerText={'Save'} btnCl={'category_upload'} onClick={SaveVariationHandler} isLoading={productSubVariationLoading} />
                  )}
               </li>
            </ul>
         </variation.spaceDiv>
      </variation.div>
   );
}

export default CreateSelectedProductVariationComponent;
