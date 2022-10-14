import React, { useEffect, useState } from 'react';
import * as styled from './ShopInfomationComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../Components/HeadingComponent/HeadingComponent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { UnitOfHeigthAr, UnitOfWeight, ThousandsSeparator, positionData } from './DropDownData';
import Box from '@mui/material/Box';
import CustombuttonComponent from '../../Components/CustombuttonComponent/CustombuttonComponent';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getShopInfromation, ShopSetting, updateShopInformation } from '../../Redux/Actions/adminAction';
import { shopInformatonLoading } from '../../Redux/Actions/appAction';

function ShopInfomationComponent() {
   const [ShopInfo, setShopInfo] = useState({
      name: '',
      countryCode: '',
      phone: '',
      address: '',
      state: '',
      city: '',
      VATNumber: '',
      startWith: '',
      endWith: '',
      unitOfWeigth: '',
      unitOfHeigth: '',
      thousandsSeparator: '',
      decimalSeparator: '',
      currencyName: '',
      currencyNumberdecimals: '',
      currencySymbol: '',
      currencyPosition: '',
   });

   const dispatch = useDispatch();
   const { shopSettingLoading, shopSettingRespose, shopInformation } = useSelector((state) => state.admin);

   const ChangeHandler = function (e) {
      const { name, value } = e.target;
      setShopInfo({ ...ShopInfo, [name]: value });
   };

   const sendHandler = function (update) {
      if (
         !!ShopInfo.name &&
         !!ShopInfo.countryCode &&
         !!ShopInfo.phone &&
         !!ShopInfo.address &&
         !!ShopInfo.state &&
         !!ShopInfo.city &&
         !!ShopInfo.VATNumber
      ) {
         if (ShopInfo.phone.length === 10) {
            if (update) {
               dispatch(updateShopInformation(Object.assign(ShopInfo, { _id: shopInformation.shop[0]._id })));
               dispatch(shopInformatonLoading(true));
            } else {
               dispatch(shopInformatonLoading(true));
               dispatch(ShopSetting(ShopInfo));
            }
         } else {
            message.info('Phone number almost 10 long');
         }
      } else {
         message.info('Shop information is required!');
      }
   };

   useEffect(() => {
      if (!!shopSettingRespose) {
         if (shopSettingRespose.success) {
            message.success(shopSettingRespose.message);
         } else if (!shopSettingRespose.success) {
            message.info(shopSettingRespose.message);
         }
      }
   }, [shopSettingRespose]);

   useEffect(() => {
      dispatch(getShopInfromation());

      return () => {
         dispatch(shopInformatonLoading(false));
      };
   }, []);

   useEffect(() => {
      if (!!shopInformation && shopInformation.success && shopInformation?.shop.length) {
         setShopInfo({ ...shopInformation.shop[0] });
      }
   }, [shopInformation]);

   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <div className="Info">
               <HeadingComponent
                  Heading={'Basic information'}
                  subHeading={
                     'This address will appear on your invoice and will be used to calculate your shipping price.'
                  }
               />
               <styled.formDiv>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <TextField
                        onChange={(e) => ChangeHandler(e)}
                        value={ShopInfo.name}
                        id="outlined-basic"
                        required
                        name="name"
                        type={'text'}
                        label="Shop name"
                        variant="outlined"
                     />
                     <styled.flexDiv>
                        <styled.smDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.countryCode}
                              id="outlined-basic"
                              required={true}
                              name="countryCode"
                              type={'number'}
                              label="Country code"
                              variant="outlined"
                              helperText="Note: Please enter valied code"
                           />
                        </styled.smDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.phone}
                              id="outlined-basic"
                              name="phone"
                              type={'number'}
                              label="Phone number"
                              variant="outlined"
                              helperText=" "
                           />
                        </styled.halfDiv>
                     </styled.flexDiv>
                     <TextField
                        onChange={(e) => ChangeHandler(e)}
                        id="outlined-basic"
                        value={ShopInfo.address}
                        name="address"
                        type={'text'}
                        label="Shop address"
                        variant="outlined"
                     />
                     <styled.flexDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              id="outlined-basic"
                              value={ShopInfo.state}
                              name="state"
                              type={'text'}
                              label="State"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              id="outlined-basic"
                              value={ShopInfo.city}
                              name="city"
                              type={'text'}
                              label="City"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              id="outlined-basic"
                              value={ShopInfo.VATNumber}
                              name="VATNumber"
                              type={'text'}
                              label="VAT Number"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                     </styled.flexDiv>
                  </Box>
               </styled.formDiv>
            </div>

            <div className="Info">
               <HeadingComponent
                  Heading={'Standard & Format'}
                  subHeading={
                     'Standards and formats are used to calculate things like product prices, shipping weights, and order times.'
                  }
               />

               <div className="heading_div">
                  <h5>Edit order code format (optional)</h5>
                  <p>
                     The default order code starts at: number. You can change the start or end string to create the
                     order code you want, for example "DH-: number" or ": number-A"
                  </p>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <styled.flexDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.startWith}
                              id="outlined-basic"
                              name="startWith"
                              type={'text'}
                              label="Start with"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.endWith}
                              id="outlined-basic"
                              name="endWith"
                              type={'text'}
                              label="End with"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                     </styled.flexDiv>

                     <p>
                        Your order code will be shown #{ShopInfo.startWith}-10000000-{ShopInfo.endWith}
                     </p>

                     <styled.flexDiv>
                        <styled.halfDiv>
                           <TextField
                              id="outlined-select-currency"
                              select
                              name="unitOfWeigth"
                              label="Unit of weigth"
                              value={ShopInfo.unitOfWeigth}
                              onChange={(e) => ChangeHandler(e)}
                           >
                              {UnitOfWeight.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Unit of heigth"
                              name="unitOfHeigth"
                              value={ShopInfo.unitOfHeigth}
                              onChange={(e) => ChangeHandler(e)}
                           >
                              {UnitOfHeigthAr.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </styled.halfDiv>
                     </styled.flexDiv>
                  </Box>
               </div>
            </div>

            <div className="Info">
               <HeadingComponent Heading={'Currencies'} subHeading={'List of currencies using on website.'} />
               <div className="heading_div">
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <styled.flexDiv>
                        <styled.halfDiv>
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Thousands separator"
                              name="thousandsSeparator"
                              value={ShopInfo.thousandsSeparator}
                              onChange={(e) => ChangeHandler(e)}
                              helperText="Thousands separator"
                           >
                              {ThousandsSeparator.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Decimal separator"
                              name="decimalSeparator"
                              value={ShopInfo.decimalSeparator}
                              onChange={(e) => ChangeHandler(e)}
                              helperText="Decimal separator"
                           >
                              {ThousandsSeparator.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </styled.halfDiv>
                     </styled.flexDiv>
                     <styled.flexDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.currencyName}
                              id="outlined-basic"
                              name="currencyName"
                              type={'text'}
                              label="Currency name"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.currencyNumberdecimals}
                              id="outlined-basic"
                              name="currencyNumberdecimals"
                              type={'number'}
                              label="Currency number decimals"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              onChange={(e) => ChangeHandler(e)}
                              value={ShopInfo.currencySymbol}
                              id="outlined-basic"
                              name="currencySymbol"
                              type={'text'}
                              label="Currency Symbol"
                              variant="outlined"
                           />
                        </styled.halfDiv>
                        <styled.halfDiv>
                           <TextField
                              id="outlined-select-currency"
                              select
                              label="Currency position"
                              name="currencyPosition"
                              value={ShopInfo.currencyPosition}
                              onChange={(e) => ChangeHandler(e)}
                           >
                              {positionData.map((option) => (
                                 <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                 </MenuItem>
                              ))}
                           </TextField>
                        </styled.halfDiv>
                     </styled.flexDiv>
                  </Box>
               </div>
            </div>
            {!!shopInformation && shopInformation.success && shopInformation.shop.length ? (
               <CustombuttonComponent
                  onClick={() => sendHandler('update')}
                  isLoading={shopSettingLoading}
                  innerText={'Update'}
                  btnCl={'category_upload'}
               />
            ) : (
               <CustombuttonComponent
                  onClick={() => sendHandler()}
                  isLoading={shopSettingLoading}
                  innerText={'Save'}
                  btnCl={'category_upload'}
               />
            )}
         </styled.spaceDiv>
      </styled.div>
   );
}

export default ShopInfomationComponent;
