import React from 'react';
import * as styled from './ProductSocialShareComponent.style';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter';

function ProductSocialShareComponent({ name }) {
   return (
      <styled.div className="py-3">
         <div className="side_padding_one">
            <div className="d-flex align-items-center justify-content-between">
               <div>
                  <h1>{name}</h1>
                  <div className="d-flex clDiv align-item-center mt-3">
                     <p className="border-end pe-4">
                        Brand : <span>Baxter</span>
                     </p>
                     <p className="ms-3 border-end pe-4">1 review</p>
                     <p className="ms-3">SKU: PU1133569999</p>
                  </div>
               </div>
               <div className="d-flex align-items-center">
                  <div className="social_share_div facebook">
                     <FaFacebookF />
                  </div>
                  <div className="social_share_div twitter ms-2">
                     <VscTwitter />
                  </div>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default ProductSocialShareComponent;
