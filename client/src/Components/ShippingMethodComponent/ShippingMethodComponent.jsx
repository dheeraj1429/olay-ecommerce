import React, { useEffect, useState } from 'react';
import * as styled from './ShippingMethodComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginUserDeatils, orderPlaceByCashOnDelivery } from '../../Redux/Actions/indexActions';
import { Radio } from 'antd';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useNavigate } from 'react-router-dom';
import { orderLoadingHandler, removeUserOrderInformation } from '../../Redux/Actions/indexAppAction';
import PaymentNotificationComponent from '../PaymentNotificationComponent/PaymentNotificationComponent';

function ShippingMethodComponent() {
   const [MethodCheck, setMethodCheck] = useState('');

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { auth } = useSelector((state) => state.auth);
   const { userInformation, placeOrderLoading, cartItems, placeOrder } = useSelector((state) => state.index);

   const methodHandler = (e) => {
      // console.log('radio checked', e.target.value);
      setMethodCheck(e.target.value);
   };

   const removeCartInfoHandler = function () {
      dispatch(removeUserOrderInformation(null));
   };

   const cashOnDeliveryHandler = function () {
      if (!!auth && auth?.userObject && auth?.userObject?.token && !!cartItems && cartItems.success) {
         const orderObject = {
            userToken: auth.userObject.token,
            items: cartItems.cartItems,
            paymentMethod: MethodCheck,
         };
         dispatch(orderPlaceByCashOnDelivery(orderObject));
         dispatch(orderLoadingHandler(true));
      } else {
         navigation('/auth/signin');
      }
   };

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getLoginUserDeatils(auth.userObject.token));
      }
   }, []);

   useEffect(() => {
      if (!!cartItems && cartItems.success && !cartItems.cartItems.length) {
         navigation('/');
      }
   }, []);

   return (
      <styled.div>
         <PaymentNotificationComponent show={placeOrder} />
         {!!userInformation && userInformation?.success && userInformation?.user && userInformation?.user?.ShippingInfo.length ? (
            <>
               <div className="User_info_div border">
                  <div className="section_div d-flex align-items-center">
                     <div className="sapceDiv">
                        <p>Contact</p>
                     </div>
                     <div className="d-flex w-100 align-items-center justify-content-between">
                        <h5>{userInformation.user.ShippingInfo[0].userEmail}</h5>
                        <span>Change</span>
                     </div>
                  </div>
                  {userInformation.user?.ShippingInfo
                     ? userInformation.user.ShippingInfo.map((el) => (
                          <div className="section_div border-top mt-2 pt-2 d-flex align-items-center">
                             <div className="sapceDiv">
                                <p>Ship to</p>
                             </div>
                             <div className="d-flex w-100 align-items-center justify-content-between">
                                <h5>
                                   {el.address},{!!el.Apt ? `${el.Apt},` : null}
                                   {!!el.subUrb ? `${el.subUrb},` : null}
                                   {el.state},{el.pinCode}
                                </h5>
                                <span>Change</span>
                             </div>
                          </div>
                       ))
                     : null}
               </div>

               <div className="methods mt-5 ">
                  <h5 className="mb-3">Shipping method</h5>

                  <div className="User_info_div p-3 border">
                     <Radio.Group className="radioFrom" onChange={methodHandler} value={MethodCheck}>
                        <div>
                           <Radio value={'case on delivery'}>
                              <p>Case on delivery</p>
                           </Radio>
                        </div>
                     </Radio.Group>
                  </div>
               </div>

               <div className="d-flex align-items-center justify-content-between mt-3">
                  <Link to={'/checkout'}>
                     <span className="mb-0">
                        <IoIosArrowBack />
                        Back to cart
                     </span>
                  </Link>
                  {!!MethodCheck && MethodCheck === 'case on delivery' && !placeOrder ? (
                     <CustombuttonComponent spennerBlack={true} onClick={cashOnDeliveryHandler} isLoading={placeOrderLoading} type="submit" btnCl={'shipping_button'} innerText={'Order Now'} />
                  ) : !!placeOrder && placeOrder.success ? (
                     <p>
                        {placeOrder.message}. please click here{' '}
                        <Link to={'/my-account/my-orders'} onClick={removeCartInfoHandler}>
                           Orders
                        </Link>
                     </p>
                  ) : (
                     <CustombuttonComponent spennerBlack={true} isLoading={''} type="submit" btnCl={'shipping_button'} innerText={'Continue to shopping'} />
                  )}
               </div>
            </>
         ) : null}
      </styled.div>
   );
}

export default ShippingMethodComponent;
