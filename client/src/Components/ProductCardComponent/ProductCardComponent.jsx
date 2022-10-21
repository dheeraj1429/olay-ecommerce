import React from 'react';
import * as styled from './ProductCardComponent.style';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { BsArrowsAngleContract } from '@react-icons/all-files/bs/BsArrowsAngleContract';
import backendConfigData from '../../backendConfig';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { IoMdArrowDropright } from '@react-icons/all-files/io/IoMdArrowDropright';

function ProductCardComponent({ data }) {
   return (
      <styled.div>
         <div className="img_Prv_div">
            <div className="right_icons">
               <div className="icons_div">
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>wishlist</p>
                  </div>
                  <AiOutlineHeart />
               </div>
               <div className="icons_div">
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>Compare</p>
                  </div>
                  <BsArrowsAngleContract />
               </div>
               <div className="icons_div">
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>View</p>
                  </div>
                  <FaEye />
               </div>
               <div className="icons_div">
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>Add to cart</p>
                  </div>
                  <AiOutlineShoppingCart />
               </div>
            </div>
            <img crossorigin="anonymous" src={`${backendConfigData.URL}/productImages/${data.productImage}`} />
         </div>
         <div className="content_div">
            <h5>{data.name.slice(0, 35)}</h5>
            <div className="flexContent">
               <p>
                  ${data.salePrice}
                  <span>
                     <strike>${data.price}</strike>
                  </span>
               </p>
               <div className="off">
                  <p>-{(((data.price - data.salePrice) / data.price) * 100).toFixed(2)}%</p>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default ProductCardComponent;
