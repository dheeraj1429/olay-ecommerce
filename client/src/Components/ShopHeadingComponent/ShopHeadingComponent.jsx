import React from 'react';
import * as styled from './ShopHeadingComponent.style';

function ShopHeadingComponent({ heading, subHeading }) {
   return (
      <styled.div>
         <div className="side_padding_one">
            <div className="flex">
               <div className="headingSpace">
                  <h1>{heading}</h1>
               </div>
               <div>
                  <p className="view">View all</p>
               </div>
            </div>
            <hr />
         </div>
      </styled.div>
   );
}

export default ShopHeadingComponent;
