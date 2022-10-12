import React from "react";
import * as DsHome from "./DashboardHomeComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import GenralProductUploadResultComponent from "../GenralProductUploadResultComponent/GenralProductUploadResultComponent";
import { useSelector } from "react-redux";
import DashboardBannerComponent from "../DashboardBannerComponent/DashboardBannerComponent";
import TopFlashSaleProductsComponent from "../TopFlashSaleProductsComponent/TopFlashSaleProductsComponent";

function DashboardHomeComponent() {
   const { auth } = useSelector((state) => state.auth);

   return (
      <DsHome.div>
         <DashboardNavbarComponent />
         <DsHome.spaceDiv>
            {!!auth && auth?.success && auth?.userObject ? (
               <DashboardBannerComponent
                  Heading={`Welcome Back ${auth.userObject.name}`}
                  subHeading={"Try to avoid your laptop after 09 pm"}
               />
            ) : null}
            <GenralProductUploadResultComponent />
            <TopFlashSaleProductsComponent />
         </DsHome.spaceDiv>
      </DsHome.div>
   );
}

export default DashboardHomeComponent;
