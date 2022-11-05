import React, { useEffect, useState } from 'react';
import * as styled from './AddressBookComponent.style';
import axios from 'axios';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { insertUserAddress } from '../../Redux/Actions/indexActions';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import { saveAddressLoadingHandler, removeAddressInformation } from '../../Redux/Actions/indexAppAction';

function AddressBookComponent() {
   const [UserAddress, setUserAddress] = useState({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      address: '',
      IsDefault: false,
   });
   const [Country, setCountry] = useState([]);

   const dispatch = useDispatch();

   const { auth } = useSelector((state) => state.auth);
   const { saveUserAddressLoading, saveUserAddress } = useSelector((state) => state.index);

   const getCountry = async function () {
      const data = await axios.get('https://restcountries.com/v2/all');

      if (data?.data) {
         setCountry(data.data.map((el) => el.name));
      }
   };

   const ChangeHandler = function (e) {
      const { name, value } = e.target;
      setUserAddress({ ...UserAddress, [name]: value });
   };

   const SendHandler = function (e) {
      e.preventDefault();
      if (!!auth && auth?.userObject && auth.userObject?.token) {
         dispatch(saveAddressLoadingHandler(true));
         dispatch(insertUserAddress(Object.assign(UserAddress, { token: auth.userObject.token })));
      }
   };

   useEffect(() => {
      getCountry();

      return () => {
         dispatch(removeAddressInformation());
      };
   }, []);

   return (
      <styled.div>
         <h1>My address</h1>
         <p className="mt-4 mb-0">Address information</p>
         <hr />

         <form onSubmit={SendHandler}>
            <div className="input_div">
               <span>Full Name</span>
               <input type="text" value={UserAddress.fullName} onChange={ChangeHandler} name="fullName" placeholder="Full name" required />
            </div>
            <div className="input_div mt-3">
               <span>Email</span>
               <input type="email" value={UserAddress.email} onChange={ChangeHandler} name="email" placeholder="Email" required />
            </div>
            <div className="input_div mt-3">
               <span>Phone</span>
               <input type="number" value={UserAddress.phone} onChange={ChangeHandler} name="phone" placeholder="Phone" required />
            </div>
            <div className="input_div mt-3">
               <span>Country</span>
               <select value={UserAddress.country} onChange={ChangeHandler} name="country">
                  <option value="select">select</option>
                  {!!Country.length
                     ? Country.map((el) => (
                          <option key={el} value={el}>
                             {el}
                          </option>
                       ))
                     : null}
               </select>
            </div>
            <div className="input_div mt-3">
               <span>State</span>
               <input value={UserAddress.state} onChange={ChangeHandler} name="state" type="text" placeholder="State name" required />
            </div>
            <div className="input_div mt-3">
               <span>City</span>
               <input value={UserAddress.city} onChange={ChangeHandler} name="city" type="text" placeholder="City name" required />
            </div>
            <div className="input_div mt-3">
               <span>Address</span>
               <input value={UserAddress.address} onChange={ChangeHandler} name="address" type="text" placeholder="Address" required />
            </div>
            <Checkbox className="mt-2" onChange={(e) => setUserAddress({ ...UserAddress, IsDefault: e.target.checked })}>
               is default address
            </Checkbox>
            <CustombuttonComponent isLoading={saveUserAddressLoading} spennerBlack={true} type={'submit'} innerText={'Add new address'} btnCl={'shipping_button mt-3'} />
            {!!saveUserAddress && saveUserAddress.message ? <p className="mt-2">{saveUserAddress.message}</p> : null}
         </form>
      </styled.div>
   );
}

export default AddressBookComponent;
