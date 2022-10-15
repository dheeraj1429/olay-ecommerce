import React from 'react';
import backendConfigData from '../../backendConfig';
import * as sale from './SaleSelectedProductComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { Popconfirm } from 'antd';
import { removeFlashSaleProducts } from '../../Redux/Actions/adminAction';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { removeFlashSaleSelectedProducts } from '../../Redux/Actions/appAction';

function SaleSelectedProductComponent({ data, onChange, state, callBack }) {
   const dispatch = useDispatch();

   const params = useParams();

   const confirm = (id, parentSaleId) => {
      if (params.id) {
         dispatch(removeFlashSaleProducts(id, parentSaleId));
      } else {
         callBack(id);
         dispatch(removeFlashSaleSelectedProducts(id));
      }
   };

   return (
      <>
         <div className="main">
            <sale.flex>
               <div className="closeButton_div">
                  <Popconfirm
                     title={` ${
                        params.id
                           ? 'Are you sure you want to delete the flash sale products ?.'
                           : "if you delete the product from the sale. it's remove from the flash sale. You don't need to update the Flash sale. Are you sure ?"
                     } `}
                     onConfirm={() => confirm(data.id, params.id)}
                     okText="Yes"
                     cancelText="No"
                  >
                     <VscClose />
                  </Popconfirm>
               </div>
               <div className="ProductimageView">
                  <img
                     crossOrigin="anonoymous"
                     src={`${backendConfigData.URL}productImagesCompress/${data.productImage}`}
                     alt=""
                  />
               </div>
               <div>
                  <p>{data.name}</p>
               </div>
            </sale.flex>

            <sale.spaceDiv>
               <Box
                  component="form"
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <sale.fullView>
                     <div className="flex">
                        <TextField
                           id="outlined-basic"
                           onChange={(e) => onChange(e, data.id)}
                           name="salePrice"
                           label="Sale Price"
                           type={'number'}
                           value={state.selectedProduct[data.id].salePrice}
                           variant="outlined"
                        />
                        <sale.spaceDivleft>
                           <TextField
                              id="outlined-basic"
                              onChange={(e) => onChange(e, data.id)}
                              name="quntity"
                              label="quntity"
                              type={'number'}
                              variant="outlined"
                              value={state.selectedProduct[data.id].quntity}
                           />
                        </sale.spaceDivleft>
                     </div>
                  </sale.fullView>
               </Box>
            </sale.spaceDiv>
         </div>
      </>
   );
}

export default SaleSelectedProductComponent;
