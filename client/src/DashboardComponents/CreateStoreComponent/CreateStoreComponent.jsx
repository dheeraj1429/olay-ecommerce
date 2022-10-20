import React from 'react';
import * as styled from './CreateStoreComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import ShopStoreTableComponent from '../ShopStoreTableComponent/ShopStoreTableComponent';
import CreateStoreInfomationComponent from '../CreateStoreInfomationComponent/CreateStoreInfomationComponent';
import { useDispatch } from 'react-redux';
import { storeShowHideHandler } from '../../Redux/Actions/adminAppAction';

function CreateStoreComponent() {
   const dispatch = useDispatch();

   const ShowAndHideStoreHandler = function () {
      dispatch(storeShowHideHandler(true));
   };

   return (
      <styled.div>
         <CreateStoreInfomationComponent />

         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <HeadingComponent
               Heading={'Store locators'}
               subHeading={
                  'All the lists of your chains, main stores, branches, etc. The locations can be used to track sales and to help us configure tax rates to charge when selling products.'
               }
            />
            <ShopStoreTableComponent />

            <CustombuttonComponent innerText={'Add new'} btnCl={'category_upload'} onClick={ShowAndHideStoreHandler} />
         </styled.spaceDiv>
      </styled.div>
   );
}

export default CreateStoreComponent;
