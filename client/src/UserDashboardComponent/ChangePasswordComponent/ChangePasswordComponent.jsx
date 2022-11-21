import React, { useState } from 'react';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { changeUserPassword } from '../../Redux/Actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { userPasswordChangeLoadingHandler } from '../../Redux/Actions/authAppAction';

function ChangePasswordComponent() {
   const [UserPassword, setUserPassword] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
   });
   const [Error, setError] = useState('');
   const dispatch = useDispatch();

   const { auth, passwordChange, passwordChangeLoading } = useSelector((state) => state.auth);

   const changeHadler = function (e) {
      const { name, value } = e.target;
      setUserPassword({ ...UserPassword, [name]: value });
   };

   const changePasswordHandler = function (e) {
      e.preventDefault();
      const { oldPassword, newPassword, confirmPassword } = UserPassword;
      if (!oldPassword && !newPassword && !confirmPassword) return setError('Please fill all fileds');
      if (newPassword !== confirmPassword) return setError('New Password and confirm password is not the same.');

      if (auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(changeUserPassword(auth?.userObject?.token, { oldPassword, newPassword }));
         setError('');
         dispatch(userPasswordChangeLoadingHandler(true));
      } else {
         setError('no valid user');
      }
   };

   return (
      <form onSubmit={changePasswordHandler}>
         <h3 className=" text-gray-600 mb-4">Change Password</h3>
         <div className="input_group_div d-flex align-items-center mb-2">
            <div className="input_div">
               <span>Old password</span>
               <input onChange={changeHadler} value={UserPassword.oldPassword} type="password" name="oldPassword" placeholder="Old password" required />
            </div>
            <div className="input_div ps-3">
               <span>New password</span>
               <input onChange={changeHadler} value={UserPassword.newPassword} type="password" name="newPassword" placeholder="New password" required />
            </div>
            <div className="input_div ps-3">
               <span>Confirm new password</span>
               <input onChange={changeHadler} value={UserPassword.confirmPassword} type="password" name="confirmPassword" placeholder="Confirm new password" required />
            </div>
            <div className="input_div ps-3">
               <CustombuttonComponent spennerBlack={true} isLoading={passwordChangeLoading} type={'submit'} innerText={'Change'} btnCl={'category_upload'} />
            </div>
         </div>
         {!!Error ? <p className=" text-red-500">{Error}</p> : null}
         {!!passwordChange && !passwordChange.success ? (
            <p className=" text-red-500">{passwordChange.message}</p>
         ) : !!passwordChange && passwordChange.success ? (
            <p className=" text-blue-300">{passwordChange.message}</p>
         ) : null}
      </form>
   );
}

export default React.memo(ChangePasswordComponent);
