import React, { useState, useEffect } from 'react';
import * as styled from './CartContactInfromation.style';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { storeUserShippingInformation } from '../../Redux/Actions/indexActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shippingInformationLoading } from '../../Redux/Actions/indexAppAction';

function CartContactInfromation() {
   const [ShippingInfo, setShippingInfo] = useState({
      userEmail: '',
      country: '',
      name: '',
      lastName: '',
      address: '',
      Apt: '',
      subUrb: '',
      state: '',
      pinCode: '',
      emailOffers: false,
      saveInformation: false,
   });

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { auth } = useSelector((state) => state.auth);
   const { shippingInsertInfoLoading, shippingInfo, userInformation } = useSelector((state) => state.index);

   const changeHandler = function (e, target) {
      const name = e.target.name;
      if (target) {
         setShippingInfo({ ...ShippingInfo, [name]: e.target.checked });
      } else {
         const value = e.target.value;
         setShippingInfo({ ...ShippingInfo, [name]: value });
      }
   };

   const SendHandler = function (e) {
      e.preventDefault();
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(storeUserShippingInformation(ShippingInfo, auth.userObject.token));
         dispatch(shippingInformationLoading(true));
      } else {
         navigation('auth/signin');
      }
   };

   useEffect(() => {
      if (!!shippingInfo && shippingInfo?.success) {
         navigation('/checkout/shipping-methods');
      }
   }, [shippingInfo]);

   useEffect(() => {
      if (!!userInformation && userInformation.success && userInformation?.user?.ShippingInfo.length) {
         setShippingInfo(userInformation.user.ShippingInfo[0]);
      }
   }, [userInformation]);

   return (
      <styled.div>
         <div className="d-flex align-items-center justify-content-between">
            <h1>Contact information</h1>
            <p>
               Already have an account? <Link to={''}>Log in</Link>
            </p>
         </div>
         <form onSubmit={SendHandler}>
            <div className="input_div mt-3">
               <input name="userEmail" onChange={changeHandler} value={ShippingInfo.userEmail} type="email" placeholder="Email Address" />
               <div className="d-flex align-items-center mt-3">
                  <Checkbox checked={ShippingInfo.emailOffers} onChange={(e) => changeHandler(e, 'checkBox')} name="emailOffers" /> <p className="ms-2">Email me with news and offers</p>
               </div>
            </div>

            <h1 className="mt-5">Shipping address</h1>

            <div className="input_div mt-3">
               {/* <select name="" id="">
               <option value="Select">Select</option>
            </select> */}
               <input type="text" name="country" value={ShippingInfo.country} onChange={changeHandler} placeholder="Country/region" required />
            </div>

            <div className="group_inputs input_div mt-3">
               <div className="d-flex align-items-center">
                  <div className="w-50 pe-3">
                     <input type="text" name="name" value={ShippingInfo.name} onChange={changeHandler} placeholder="First name" />
                  </div>
                  <div className="w-50">
                     <input type="text" name="lastName" value={ShippingInfo.lastName} onChange={changeHandler} placeholder="Last name" />
                  </div>
               </div>
               <input type="text" className="mt-3" name="address" value={ShippingInfo.address} onChange={changeHandler} required placeholder="Address" />
               <input type="text" className="mt-3" name="Apt" onChange={changeHandler} value={ShippingInfo.Apt} placeholder="Apt, suite, etc" />
               <div className="d-flex align-items-center mt-3">
                  <div className="w-50 pe-3">
                     <input type="text" name="subUrb" value={ShippingInfo.subUrb} onChange={changeHandler} placeholder="Suburb" />
                  </div>
                  <div className="w-50 pe-3">
                     <input type="text" value={ShippingInfo.state} onChange={changeHandler} name="state" placeholder="State" required />
                     {/* <select name="" id="">
                     <option value="State">State</option>
                  </select> */}
                  </div>
                  <div className="w-50">
                     <input type="number" name="pinCode" value={ShippingInfo.pinCode} onChange={changeHandler} placeholder="PIN Code" required />
                  </div>
               </div>
               <div className="d-flex align-items-center mt-3">
                  <Checkbox checked={ShippingInfo.saveInformation} name="saveInformation" onChange={(e) => changeHandler(e, 'checkBox')} /> <p className="ms-2">Save this information for next time</p>
               </div>

               <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link to={'/cart'}>
                     <span className="mb-0">
                        <IoIosArrowBack />
                        Back to cart
                     </span>
                  </Link>
                  <CustombuttonComponent spennerBlack={true} isLoading={shippingInsertInfoLoading} type="submit" btnCl={'shipping_button'} innerText={'Continue to shipping'} />
               </div>
            </div>
         </form>
      </styled.div>
   );
}

export default CartContactInfromation;
