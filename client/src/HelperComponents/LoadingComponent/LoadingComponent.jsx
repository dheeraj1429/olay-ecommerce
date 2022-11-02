import React from 'react';
import * as styled from './LoadingComponent.style';

function LoadingComponent() {
   return (
      <styled.div>
         <div class="wrapper">
            <span class="dot"></span>
            <div class="dots">
               <span></span>
               <span></span>
               <span></span>
            </div>
         </div>
      </styled.div>
   );
}

export default LoadingComponent;
