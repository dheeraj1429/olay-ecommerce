import React from "react";
import ReactDOM from "react-dom";
import * as styled from "./UploadCsvProductsInfomationComponent.style";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import { showProductInfoCom } from "../../Redux/Actions/appAction";
import { useDispatch } from "react-redux";

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
         </styled.innerDiv>
      </styled.mainDiv>,
      document.getElementById("productCsvInfo")
   );
}

export default UploadCsvProductsInfomationComponent;
