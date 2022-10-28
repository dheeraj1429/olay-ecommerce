import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './ProductAddToCartSideNoficationComponent.style';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { useSelector, useDispatch } from 'react-redux';
import { removeShowCartNotification } from '../../Redux/Actions/indexAppAction';
import backendConfigData from '../../backendConfig';

function ProductAddToCartSideNoficationComponent() {
   const [Show, setShow] = useState(false);

   const dispatch = useDispatch();

   const { cartProductAddedImage, addToCartInfo } = useSelector((state) => state.index);

   useEffect(() => {
      if (!!cartProductAddedImage) {
         setShow(true);

         setTimeout(() => {
            setShow(false);
            dispatch(removeShowCartNotification(null));
         }, 3000);
      }
   }, [!!cartProductAddedImage]);

   return ReactDOM.createPortal(
      <styled.div show={Show}>
         {!!addToCartInfo && addToCartInfo?.success && !!cartProductAddedImage ? (
            <>
               <div className="imagePrev">
                  <img
                     src={`${backendConfigData.URL}productImagesCompress/${cartProductAddedImage}`}
                     crossOrigin="anonymous"
                     alt=""
                  />
               </div>
               <div className="content_div">
                  <p>
                     {addToCartInfo.message} <FcApproval />
                  </p>
               </div>
            </>
         ) : null}
      </styled.div>,
      document.getElementById('cart-nofication')
   );
}

export default React.memo(ProductAddToCartSideNoficationComponent);
