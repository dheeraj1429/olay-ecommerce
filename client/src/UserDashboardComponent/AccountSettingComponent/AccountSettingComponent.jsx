import React from 'react';
import * as styled from './AccountSettingComponent.style';
import ChangePasswordComponent from '../ChangePasswordComponent/ChangePasswordComponent';

function AccountSettingComponent() {
   return (
      <styled.div>
         <h1 className="mb-2">Account Setting</h1>
         <span className="text-gray-500">Awesome sentences to replace a placeholder</span>
         <h3 className=" text-gray-600 mt-4 mb-4">Company Information</h3>
         <div className="input_group_div d-flex align-items-center mb-5">
            <div className="input_div">
               <span>Company Name</span>
               <input type="text" name="companyName" placeholder="Company name" required />
            </div>
            <div className="input_div ps-3">
               <span>Company Size</span>
               <input type="text" name="companySize" placeholder="Company Size" required />
            </div>
            <div className="input_div ps-3">
               <span>Company Website</span>
               <input type="text" name="companyWebsite" placeholder="Company Website Url" required />
            </div>
         </div>
         <ChangePasswordComponent />
         <h3 className=" text-gray-600 mt-4 pt-4">Desactive Your Account</h3>
         <span className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet, dolor, enim rerum quibusdam aspernatur voluptatibus eius molestiae perferendis aliquid deleniti earum? Atque quasi
            cumque earum deleniti delectus neque aliquid?
         </span>
      </styled.div>
   );
}

export default AccountSettingComponent;
