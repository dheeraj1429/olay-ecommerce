import React from "react";
import ReactDOM from "react-dom";
import * as styled from "./UploadCsvProductsInfomationComponent.style";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { showProductInfoCom } from "../../Redux/Actions/appAction";
import { useDispatch } from "react-redux";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import UploadCsvProductsInfoComponent from "../UploadCsvProductsInfoComponent/UploadCsvProductsInfoComponent";
import { FcApproval } from "@react-icons/all-files/fc/FcApproval";
import { FcHighPriority } from "@react-icons/all-files/fc/FcHighPriority";

function UploadCsvProductsInfomationComponent({ show }) {
   const dispatch = useDispatch();

   const hideInfoComponent = function () {
      dispatch(showProductInfoCom(false));
   };

   return ReactDOM.createPortal(
      <styled.mainDiv show={show}>
         <styled.innerDiv show={show}>
            <div className="close_icons">
               <VscClose onClick={hideInfoComponent} />
            </div>

            <HeadingComponent Heading={"CSV products infomations"} dark={true} />
            <styled.spaceDiv>
               <UploadCsvProductsInfoComponent Heading={"Product uploaded"} target={"insertDocuments"} icon={<FcApproval />} />
               <UploadCsvProductsInfoComponent Heading={"Product brand uploded"} target={"brandsInserted"} icon={<FcApproval />} />
               <UploadCsvProductsInfoComponent Heading={"Product category uploded"} target={"categoryinserted"} icon={<FcApproval />} />
               <UploadCsvProductsInfoComponent Heading={"Product skip"} target={"skipDocuments"} icon={<FcHighPriority />} skip={true} />
               <UploadCsvProductsInfoComponent Heading={"Product brand skip"} target={"brandsSkiped"} icon={<FcHighPriority />} skip={true} />
               <UploadCsvProductsInfoComponent Heading={"Product category skip"} target={"categorySkiped"} icon={<FcHighPriority />} skip={true} />
            </styled.spaceDiv>
         </styled.innerDiv>
      </styled.mainDiv>,
      document.getElementById("productCsvInfo")
   );
}

export default UploadCsvProductsInfomationComponent;
