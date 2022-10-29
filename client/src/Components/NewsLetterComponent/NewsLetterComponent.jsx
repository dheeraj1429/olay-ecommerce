import React from 'react';
import * as styled from './NewsLetterComponent.style';
import InputComponent from '../InputComponent/InputComponent';

function NewsLetterComponent() {
   return (
      <styled.div>
         <div className="side_padding_one">
            <div className="flex">
               <div className="half">
                  <h1>Newsletter</h1>
                  <p>Subscribe to get information about products and coupons</p>
               </div>
               <div className="half">
                  <InputComponent />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default NewsLetterComponent;
