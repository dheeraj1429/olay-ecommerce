import React from 'react';
import * as styled from './ProductCardComponent.style';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { BsArrowsAngleContract } from '@react-icons/all-files/bs/BsArrowsAngleContract';
import backendConfigData from '../../backendConfig';

function ProductCardComponent({ data }) {
   return (
      <styled.div>
         <div className="img_Prv_div">
            <div className="off">
               <p>-{(((data.price - data.salePrice) / data.price) * 100).toFixed(2)}%</p>
            </div>
            <div className="right_icons">
               <div className="icons_div">
                  <AiOutlineHeart />
               </div>
               <div className="icons_div">
                  <BsArrowsAngleContract />
               </div>
            </div>

            <img crossorigin="anonymous" src={`${backendConfigData.URL}/productImages/${data.productImage}`} />
            <div className="options_div">
               <div>Quick view</div>
               <div>
                  <AiOutlineShoppingCart />
                  Add to card
               </div>
            </div>
         </div>
         <div className="content_div">
            <h5>{data.name.slice(0, 35)}</h5>
            <p>
               ${data.salePrice}
               <span>
                  <strike>${data.price}</strike>
               </span>
            </p>
         </div>
      </styled.div>
   );
}

export default ProductCardComponent;
