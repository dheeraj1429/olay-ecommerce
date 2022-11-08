import React, { useEffect } from 'react';
import * as styled from './UserDashboardPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import CategorieTagShowComponent from '../../Components/CategorieTagShowComponent/CategorieTagShowComponent';
import UserProfileOptionComponent from '../../Components/UserProfileOptionComponent/UserProfileOptionComponent';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function UserDashboardPage() {
   const { auth } = useSelector((state) => state.auth);
   const navigation = useNavigate();

   useEffect(() => {
      if (!auth) {
         navigation('/auth/signin');
      }
   }, []);

   return (
      <styled.div>
         <NavbarComponent />

         <styled.mainDiv className="container-fluid p-0">
            <CategorieTagShowComponent heading={'Homepage'} name={'My Account'} />
            <div className="row side_padding_one">
               <div className="col-12 mt-5">
                  <h1>My Account</h1>
               </div>
            </div>
            <div className="row side_padding_one pb-5">
               <div className="col-12 col-sm-12 col-md-3">
                  <UserProfileOptionComponent hideProfile={true} show={true} styles={{ position: 'relative', boxShadow: 'none' }} hideOptions={['My account']} />
               </div>
               <div className="col-12 col-sm-12 col-md-9 mt-5 mt-md-0">
                  <div className="renderDiv">
                     <Outlet />
                  </div>
               </div>
            </div>
         </styled.mainDiv>
      </styled.div>
   );
}

export default UserDashboardPage;
