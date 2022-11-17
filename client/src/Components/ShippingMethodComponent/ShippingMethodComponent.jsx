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
   const [Error, setError] = useState('');

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);
   const { userAddressInformation, placeOrderLoading, cartItems, placeOrder } = useSelector((state) => state.index);

   const methodHandler = (e) => {
      setMethodCheck(e.target.value);
   };

   const removeCartInfoHandler = function () {
      dispatch(removeUserOrderInformation(null));
   };

   const cashOnDeliveryHandler = function () {
      if (!MethodCheck) {
         return setError('Please first check the payment method.');
      }

      if (!!auth && auth?.userObject && auth?.userObject?.token && !!cartItems && cartItems.success && !!shopInformation && shopInformation.success) {
         const token = auth.userObject.token;
         let orderProducts = [];

         for (let i = 0; i < cartItems.cartItems[0].cartItems.length; i++) {
            orderProducts.push({
               productId: cartItems.cartItems[0].cartItems[i].cartItem._id,
               price: cartItems.cartItems[0].cartItems[i].cartItem.price,
               salePrice: cartItems.cartItems[0].cartItems[i].cartItem.salePrice,
               qty: cartItems.cartItems[0].cartItems[i].qty,
               subVariation: cartItems.cartItems[0].cartItems[i].subVariationProduct,
               parentProductId: cartItems.cartItems[0].cartItems[i].parentProductId,
            });
         }

         const orderObject = {
            items: orderProducts,
            paymentMethod: MethodCheck,
            addressId: userAddressInformation.address.myAddress[0]._id,
            currencyName: shopInformation.shop[0].currencyName,
            countryCode: shopInformation.shop[0].countryCode,
            currencySymbol: shopInformation.shop[0].currencySymbol,
         };
         setError('');

         dispatch(orderPlaceByCashOnDelivery(orderObject, token));
         dispatch(orderLoadingHandler(true));
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
                  <span className="mb-0 flex items-center">
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
                  <CustombuttonComponent onClick={cashOnDeliveryHandler} spennerBlack={true} isLoading={''} type="submit" btnCl={'shipping_button'} innerText={'Continue to shopping'} />
               )}
            </div>
            {!!Error ? <p className="error">{Error}</p> : null}
         </>
      </styled.div>
   );
}

export default ShippingMethodComponent;
