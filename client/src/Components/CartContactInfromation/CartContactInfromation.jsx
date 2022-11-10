import React, { useEffect, useState } from 'react';
import * as styled from './CartContactInfromation.style';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { getUserAddress, storeUserShippingInformation } from '../../Redux/Actions/indexActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeShippingInfo } from '../../Redux/Actions/indexAppAction';

function CartContactInfromation() {
   const dispatch = useDispatch();
   const navigation = useNavigate();
   const [Address, setAddress] = useState('');
   const [Error, setError] = useState('');

   const { auth } = useSelector((state) => state.auth);
   const { shippingInsertInfoLoading, shippingInfo, userAddresses, cartItems } = useSelector((state) => state.index);

   const SendHandler = function (e) {
      e.preventDefault();
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         if (!!cartItems && cartItems.success && cartItems?.cartItems.length) {
            if (Address) {
               dispatch(storeUserShippingInformation({ address: Address }, auth.userObject.token));
            } else {
               setError('Please selecte the shipping address');
            }
         } else {
            navigation('/cart');
         }
      } else {
         navigation('/auth/singin');
      }
   };

   useEffect(() => {
      if (!!shippingInfo && shippingInfo?.success) {
         navigation('/checkout/shipping-methods');
         dispatch(removeShippingInfo(null));
      }
   }, [shippingInfo]);

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getUserAddress(auth.userObject.token));
      }
   }, []);

   return (
      <styled.div>
         <div className="d-flex align-items-center justify-content-between">
            <h1>Shipping address</h1>
            <p>
               Add new address <Link to={'/my-account/my-address-book/create'}>Add</Link>
            </p>
         </div>
         <form onSubmit={SendHandler}>
            <div className="input_div border p-3 mt-3">
               {!!userAddresses && userAddresses.success && userAddresses?.address.length ? (
                  userAddresses.address.map((el) => (
                     <Radio.Group name="radiogroup" value={Address} key={el._id} defaultValue={1}>
                        <Radio value={el._id} onChange={(e) => setAddress(e.target.value)}>
                           <div>
                              <p>{`${el.address}`}</p>
                           </div>
                        </Radio>
                     </Radio.Group>
                  ))
               ) : (
                  <div className="text-center">Add address</div>
               )}
            </div>
            <div className="group_inputs input_div mt-3">
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

            {!!Error ? <p className="error">{Error}</p> : null}
         </form>
      </styled.div>
   );
}

export default CartContactInfromation;
