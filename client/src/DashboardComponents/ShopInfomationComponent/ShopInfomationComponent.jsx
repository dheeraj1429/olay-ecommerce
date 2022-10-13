import React, { useState } from 'react';
import * as styled from './ShopInfomationComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../Components/HeadingComponent/HeadingComponent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import StoreProductsPriceInfoComponent from '../StoreProductsPriceInfoComponent/StoreProductsPriceInfoComponent';
import { UnitOfHeigthAr, UnitOfWeight, ThousandsSeparator } from './DropDownData';
import Box from '@mui/material/Box';
import CustombuttonComponent from '../../Components/CustombuttonComponent/CustombuttonComponent';

function ShopInfomationComponent() {
   const [ShopInfo, setShopInfo] = useState({
      name: '',
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
   });

   const [CurrenciesTable, setCurrenciesTable] = useState([]);
   const [Keys, setKeys] = useState([]);

   const AddInfoHandler = function () {
      const key = Math.random() * 100000 + 1;
      setKeys([...Keys, key]);
      setCurrenciesTable([
         ...CurrenciesTable,
         {
            [key]: {
               name: '',
               symbol: '',
               decimals: '',
               exchangeRate: '',
               Position: '',
               default: '',
               key: key,
            },
         },
      ]);
   };

   const ChangeHandler = function (e, key = undefined, idx) {
      const { name, value } = e.target;
      if (!!key) {
         console.log(name, value, key, idx);
         //[--]
      } else {
         setShopInfo({ ...ShopInfo, [name]: value });
      }
   };

   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <div className="Info">
               <HeadingComponent
                  Heading={'Basic information'}
                  subHeading={'This address will appear on your invoice and will be used to calculate your shipping price.'}
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
                     <TextField
                        onChange={(e) => ChangeHandler(e)}
                        value={ShopInfo.phone}
                        id="outlined-basic"
                        name="phone"
                        type={'number'}
                        label="Phone number"
                        variant="outlined"
                     />
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
                  subHeading={'Standards and formats are used to calculate things like product prices, shipping weights, and order times.'}
               />

               <div className="heading_div">
                  <h5>Edit order code format (optional)</h5>
                  <p>
                     The default order code starts at: number. You can change the start or end string to create the order code you want, for example
                     "DH-: number" or ": number-A"
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
                              label="Select"
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
                              label="Select"
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
                              label="Select"
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
                              label="Select"
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
                     <StoreProductsPriceInfoComponent onChange={ChangeHandler} objectData={CurrenciesTable} keys={Keys} />
                     <CustombuttonComponent onClick={AddInfoHandler} innerText={'Add a new currency'} btnCl={'category_upload'} />
                  </Box>
               </div>
            </div>
         </styled.spaceDiv>
      </styled.div>
   );
}

export default ShopInfomationComponent;
