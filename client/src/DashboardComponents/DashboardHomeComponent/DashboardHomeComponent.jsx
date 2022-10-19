import React, { useEffect } from 'react';
import * as DsHome from './DashboardHomeComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import GenralProductUploadResultComponent from '../GenralProductUploadResultComponent/GenralProductUploadResultComponent';
import { useSelector, useDispatch } from 'react-redux';
import DashboardBannerComponent from '../DashboardBannerComponent/DashboardBannerComponent';
import TotalCustomersComponent from '../TotalCustomersComponent/TotalCustomersComponent';
import { getAllSignInUsers } from '../../Redux/Actions/adminAction';

function DashboardHomeComponent() {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(getAllSignInUsers());
   }, []);

   return (
      <DsHome.div>
         <DashboardNavbarComponent />
         <DsHome.spaceDiv>
            {!!auth && auth?.success && auth?.userObject ? (
               <DashboardBannerComponent
                  Heading={`Welcome Back ${auth.userObject.name}`}
                  subHeading={'Try to avoid your laptop after 09 pm'}
               />
            ) : null}
            <DsHome.flexDiv>
               <GenralProductUploadResultComponent />
               <TotalCustomersComponent heading={'Total Customers'} />
            </DsHome.flexDiv>
            <DsHome.flexDiv></DsHome.flexDiv>
         </DsHome.spaceDiv>
      </DsHome.div>
   );
}

export default DashboardHomeComponent;
