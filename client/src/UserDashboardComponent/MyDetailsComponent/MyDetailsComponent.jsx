import React, { useEffect, useState } from 'react';
import * as styled from './MyDetailsComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from '../../Redux/Actions/indexActions';
import { removeProfileUpdateInfo, updateUserProfileLoading } from '../../Redux/Actions/indexAppAction';
import dayjs from 'dayjs';

function MyDetailsComponent() {
   const [UserInfo, setUserInfo] = useState({
      name: '',
      dateOfBirth: '',
      phone: '',
      email: '',
   });
   const [Error, setError] = useState('');

   const dispatch = useDispatch();

   const { auth } = useSelector((state) => state.auth);
   const { userData, updateUserInfoLoading, updateUserInfo } = useSelector((state) => state.index);

   const sendHandler = function (e) {
      e.preventDefault();

      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         if (
            UserInfo.name !== userData.user.name ||
            UserInfo.dateOfBirth !== dayjs(userData.user.dateOfBirth).format('YYYY-MM-DD') ||
            UserInfo.phone !== userData.user.phone ||
            UserInfo.email !== userData.user.email
         ) {
            if (UserInfo.phone.length < 10) {
               return setError('please enter 10 digits phone number');
            }

            setError('');
            dispatch(updateUserProfileLoading(true));
            dispatch(
               updateUserData(Object.assign(UserInfo, { _id: userData.user._id, isAdmin: auth.userObject.isAdmin, userProfileImage: auth.userObject.userProfileImage, token: auth.userObject.token }))
            );
         } else {
            setError('new and older values are same');
         }
      }
   };

   const changeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setUserInfo({ ...UserInfo, [name]: value });
   };

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getUserData(auth.userObject.token));
      }

      return () => {
         dispatch(removeProfileUpdateInfo(null));
      };
   }, []);

   useEffect(() => {
      if (!!userData && userData.success && userData.user) {
         setUserInfo({
            name: userData.user?.name ? userData.user.name : '',
            dateOfBirth: userData.user?.dateOfBirth ? dayjs(userData.user.dateOfBirth).format('YYYY-MM-DD') : '',
            phone: userData.user?.phone ? userData.user.phone : '',
            email: userData.user?.email ? userData.user.email : '',
         });
      }
   }, [userData]);

   return (
      <styled.div>
         <h1>My Details</h1>
         <p className="mt-4 mb-3">Personal Information</p>
         <hr />
         <div className="information_div mt-3">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-sm-12 col-md-5 mt-3">
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                  </div>
                  <div className="col-12 col-sm-12 col-md-7">
                     <form onSubmit={sendHandler}>
                        <div className="input_div">
                           <span>Name</span>
                           <input type="text" value={UserInfo.name} name="name" onChange={changeHandler} placeholder="Name" required />
                        </div>
                        <div className="input_div mt-3">
                           <span>Date of birth</span>
                           <input value={UserInfo.dateOfBirth} name="dateOfBirth" onChange={changeHandler} type="date" required />
                        </div>
                        <div className="input_div mt-3">
                           <span>Phone number</span>
                           <input type="number" value={UserInfo.phone} name="phone" onChange={changeHandler} placeholder="Number" required />
                        </div>
                        <div className="input_div mt-3">
                           <span>Email address</span>
                           <input type="email" onChange={changeHandler} value={UserInfo.email} name="email" placeholder="Email address" required />
                        </div>
                        <CustombuttonComponent isLoading={updateUserInfoLoading} spennerBlack={true} type={'submit'} innerText={'Save'} btnCl={'shipping_button mt-3'} />
                        {!!updateUserInfo && updateUserInfo.success ? <p className={updateUserInfo?.error ? 'error mt-2' : 'mt-2'}>{updateUserInfo.message}</p> : null}
                        {!!Error ? <p className="error mt-2">{Error}</p> : null}
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default MyDetailsComponent;
