import React, { useEffect, useState } from 'react';
import * as styled from './ShippingMethodComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddressDetails, orderPlaceByCashOnDelivery } from '../../Redux/Actions/indexActions';
import { Radio } from 'antd';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useNavigate } from 'react-router-dom';
import { orderLoadingHandler, removeUserOrderInformation } from '../../Redux/Actions/indexAppAction';
import PaymentNotificationComponent from '../PaymentNotificationComponent/PaymentNotificationComponent';
import { useCookies } from 'react-cookie';

function ShippingMethodComponent() {
   const [MethodCheck, setMethodCheck] = useState('');
   const [cookie] = useCookies('user-address');

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { auth } = useSelector((state) => state.auth);
   const { userAddressInformation, placeOrderLoading, cartItems, placeOrder } = useSelector((state) => state.index);

   const methodHandler = (e) => {
      setMethodCheck(e.target.value);
   };

   const removeCartInfoHandler = function () {
      dispatch(removeUserOrderInformation(null));
   };

   const cashOnDeliveryHandler = function () {
      if (!!auth && auth?.userObject && auth?.userObject?.token && !!cartItems && cartItems.success) {
         const token = auth.userObject.token;
         const orderObject = {
            items: cartItems.cartItems,
            paymentMethod: MethodCheck,
            addressId: userAddressInformation.address.myAddress[0]._id,
         };
         dispatch(orderPlaceByCashOnDelivery(orderObject, token));
         // dispatch(orderLoadingHandler(true));
      } else {
         navigation('/auth/signin');
      }
   };

   useEffect(() => {
      if (!!cartItems && cartItems.success && !cartItems.cartItems.length) {
         navigation('/');
      }
      if (!!auth && auth?.userObject && auth?.userObject?.token && cookie && cookie['user-address']) {
         dispatch(getUserAddressDetails(auth.userObject.token, cookie['user-address']));
      }
   }, []);

   return (
      <styled.div>
         <PaymentNotificationComponent show={placeOrder} />
         <>
            {!!userAddressInformation && userAddressInformation.success && userAddressInformation.address?.myAddress ? (
               <div className="User_info_div border p-3">
                  <p className="mb-0">{userAddressInformation.address.myAddress[0].address}</p>
               </div>
            ) : null}

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
      </styled.div>
   );
}

export default ShippingMethodComponent;