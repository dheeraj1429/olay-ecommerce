import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import React, { useState } from 'react';
import { useEffect } from 'react';
import * as styled from './ProductIncComponent.style';

function ProductIncComponent({ getValue, qtyValue = 1 }) {
   const [ProductQty, setProductQty] = useState(qtyValue);

   const QuntityPlusHandler = function () {
      setProductQty((prev) => {
         if (prev < 0) {
            return 1;
         } else {
            return prev + 1;
         }
      });
   };
   const QuntityMinusHandler = function () {
      setProductQty((prev) => {
         if (prev <= 1) {
            return 1;
         } else {
            return prev - 1;
         }
      });
   };

   useEffect(() => {
      getValue(ProductQty);
   }, [ProductQty]);

   return (
      <styled.div>
         <div className="quntityDiv">
            <div className="qtyBtn" onClick={QuntityMinusHandler}>
               <AiOutlineMinus />
            </div>
            <div>
               <p>{ProductQty}</p>
            </div>
            <div className="qtyBtn" onClick={QuntityPlusHandler}>
               <AiOutlinePlus />
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(ProductIncComponent);
