import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './CreateStoreInfomationComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import {
   storeShowHideHandler,
   shopInfomationStoreLoading,
   RemoveSelectedShopInfo,
   removeUpdateShopInfo,
} from '../../Redux/Actions/appAction';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import CustombuttonComponent from '../../Components/CustombuttonComponent/CustombuttonComponent';
import { storeLocationData, UpdateStoreShopInformation } from '../../Redux/Actions/adminAction';
import { message } from 'antd';

function CreateStoreInfomationComponent() {
   const [ShopInfo, setShopInfo] = useState({
      name: '',
      phone: '',
      email: '',
      address: '',
      state: '',
      city: '',
      country: '',
   });
   const [Country, setCountry] = useState([]);

   const dispatch = useDispatch();
   const {
      showCreateStoreInfomationComponent,
      shopInformationStoreLoading,
      shopInformationStore,
      selectedShopInfo,
      updateShopInformation,
   } = useSelector((state) => state.admin);

   const showAndHideHandler = function (e) {
      const currentTarget = e.target;

      if (currentTarget.id === 'top_overlay') {
         setShopInfo({
            name: '',
            phone: '',
            email: '',
            address: '',
            state: '',
            city: '',
            country: '',
         });
         dispatch(RemoveSelectedShopInfo(null));
         dispatch(storeShowHideHandler(false));
      }
   };

   const fetchCountry = function () {
      fetch('https://countriesnow.space/api/v0.1/countries/currency', {
         method: 'GET',
      })
         .then((res) => res.json())
         .then((data) => {
            setCountry(data.data);
         });
   };

   const storeLocationHandler = function (ShopInsertKey = undefined) {
      if (
         ShopInfo.name &&
         ShopInfo.phone &&
         ShopInfo.email &&
         ShopInfo.address &&
         ShopInfo.state &&
         ShopInfo.city &&
         ShopInfo.country
      ) {
         if (ShopInsertKey) {
            dispatch(UpdateStoreShopInformation(ShopInfo));
         } else {
            dispatch(storeLocationData(ShopInfo));
         }
         dispatch(shopInfomationStoreLoading(true));
      } else {
         message.info('Please fill all fileds.');
      }
   };

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setShopInfo({ ...ShopInfo, [name]: value });
   };

   const CancleHandler = function () {
      setShopInfo({
         name: '',
         phone: '',
         email: '',
         address: '',
         state: '',
         city: '',
         country: '',
      });
      dispatch(RemoveSelectedShopInfo(null));
      dispatch(shopInfomationStoreLoading(false));
      dispatch(storeShowHideHandler(false));
   };

   useEffect(() => {
      fetchCountry();

      window.addEventListener('click', showAndHideHandler);

      return () => {
         window.removeEventListener('click', showAndHideHandler);
      };
   }, []);

   useEffect(() => {
      if (!!shopInformationStore) {
         if (shopInformationStore.success) {
            message.success(shopInformationStore.message);
         } else if (!shopInformationStore.success) {
            message.info(shopInformationStore.message);
         }
         dispatch(shopInfomationStoreLoading(false));
      }
   }, [shopInformationStore]);

   useEffect(() => {
      if (!!updateShopInformation) {
         if (updateShopInformation.success) {
            message.success(updateShopInformation.message);
         } else if (!updateShopInformation.success) {
            message.info(updateShopInformation.message);
         }
         dispatch(removeUpdateShopInfo(null));
         dispatch(storeShowHideHandler(false));
      }
   }, [updateShopInformation]);

   useEffect(() => {
      if (!!selectedShopInfo && Object.keys(selectedShopInfo).length) {
         setShopInfo(selectedShopInfo);
      }
   }, [selectedShopInfo]);

   return ReactDOM.createPortal(
      <styled.div show={showCreateStoreInfomationComponent} id="top_overlay">
         <styled.contentDiv show={showCreateStoreInfomationComponent}>
            <div className="closeBtn_div" onClick={CancleHandler}>
               <VscClose />
            </div>
            <div className="content_div">
               <p>All fields are required. Please fill all fields and then save location.</p>
               <div className="flex">
                  <div>
                     <label>Store Name</label>
                     <input
                        type="text"
                        placeholder="Store name"
                        value={ShopInfo.name}
                        name="name"
                        onChange={ChangeHandler}
                     />
                  </div>
                  <div>
                     <label>Phone</label>
                     <input
                        type="number"
                        placeholder="Phone"
                        value={ShopInfo.phone}
                        name="phone"
                        onChange={ChangeHandler}
                     />
                  </div>
               </div>
               <div>
                  <label>Email</label>
                  <input
                     type="email"
                     placeholder="Email"
                     value={ShopInfo.email}
                     name="email"
                     onChange={ChangeHandler}
                  />
               </div>
               <div>
                  <label>Address</label>
                  <input
                     type="text"
                     placeholder="Address"
                     value={ShopInfo.address}
                     name="address"
                     onChange={ChangeHandler}
                  />
               </div>
               <div className="flex">
                  <div>
                     <label>State</label>
                     <input
                        type="text"
                        placeholder="State"
                        value={ShopInfo.state}
                        name="state"
                        onChange={ChangeHandler}
                     />
                  </div>
                  <div>
                     <label>City</label>
                     <input type="text" placeholder="City" value={ShopInfo.city} name="city" onChange={ChangeHandler} />
                  </div>
               </div>
               <div>
                  <label>Country</label>
                  <select name="country" value={ShopInfo.country} onChange={ChangeHandler}>
                     <option value="Select country">Select country</option>
                     {Country.length
                        ? Country.map((el) => (
                             <option value={el.name}>
                                {el.name}, currency - {el.currency}
                             </option>
                          ))
                        : null}
                  </select>
               </div>
            </div>
            <div className="flexBtn">
               <CustombuttonComponent
                  innerText={!!selectedShopInfo ? 'Update location' : 'Save location'}
                  onClick={!!selectedShopInfo ? () => storeLocationHandler('update') : () => storeLocationHandler()}
                  btnCl={'category_upload'}
                  isLoading={shopInformationStoreLoading}
                  spennerBlack={true}
               />
               <CustombuttonComponent innerText={'Cancel'} btnCl={'clear_btn'} onClick={CancleHandler} />
            </div>
         </styled.contentDiv>
      </styled.div>,
      document.getElementById('shop-info')
   );
}

export default CreateStoreInfomationComponent;
