import React from 'react';
import * as styled from './ProductCardComponent.style';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import backendConfigData from '../../backendConfig';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { IoMdArrowDropright } from '@react-icons/all-files/io/IoMdArrowDropright';
import { loadingPrevSelectedProduct, productPrev } from '../../Redux/Actions/indexAppAction';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedPrevProduct, productAddToCart, addToWishList } from '../../Redux/Actions/indexActions';
import { useNavigate } from 'react-router';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { Link } from 'react-router-dom';

function ProductCardComponent({ data }) {
   const navigation = useNavigate();
   const dispatch = useDispatch();

   const { auth } = useSelector((state) => state.auth);
   const { wishListItemAr } = useSelector((state) => state.index);
   const { shopInformation } = useSelector((state) => state.admin);

   const showHandler = function (id) {
      dispatch(productPrev(true));
      dispatch(getSelectedPrevProduct(id));
      dispatch(loadingPrevSelectedProduct(true));
   };

   const AddToCartHandler = function (productId, img) {
      const token = auth?.userObject?.token;
      if (token) {
         const data = {
            productId,
            token,
            qty: 1,
         };
         dispatch(productAddToCart(data, img));
      } else {
         navigation('/auth/signin');
      }
   };

   const wishListHander = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(addToWishList(id, token));
      } else {
         navigation('/auth/signin');
      }
   };

   return (
      <styled.div>
         <div className="img_Prv_div">
            {data?.salePrice && !!data.salePrice ? (
               <div className="sale">
                  <div className="off">
                     <p>-{(((data.price - data.salePrice) / data.price) * 100).toFixed(2)}%</p>
                  </div>
               </div>
            ) : null}

            <div className="right_icons">
               <div className="icons_div" onClick={() => wishListHander(data._id)}>
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>wishlist</p>
                  </div>
                  {(function () {
                     if (!!wishListItemAr && wishListItemAr.length && wishListItemAr.includes(data._id)) {
                        return <AiFillHeart style={{ fill: 'var(--spec-static-brand-red)' }} />;
                     } else {
                        return <AiOutlineHeart />;
                     }
                  })()}
               </div>
               <div className="icons_div" onClick={() => showHandler(data._id)}>
                  <div className="hover_hidden_div">
                     <IoMdArrowDropright />
                     <p>View</p>
                  </div>
                  <FaEye />
               </div>
               {data?.stockStatus === 'Out of stock' ? null : (
                  <div className="icons_div" onClick={() => AddToCartHandler(data._id, data.productImage)}>
                     <div className="hover_hidden_div">
                        <IoMdArrowDropright />
                        <p>Add to cart</p>
                     </div>
                     <AiOutlineShoppingCart />
                  </div>
               )}
            </div>
            <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImages/${data.productImage}`} />
         </div>
         <div className="content_div">
            <Link to={`/products/${data.name.split(' ').join('-')}/${data._id}`}>
               <h5>{data.name.length > 100 ? `${data.name.slice(0, 120)}...` : data.name}</h5>
            </Link>
            <div className="flexContent">
               {data?.salePrice && !!data.salePrice ? (
                  <>
                     <p>
                        <span>{!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}</span>
                        {data.salePrice}
                     </p>
                     <span>
                        <strike>${data.price}</strike>
                     </span>
                  </>
               ) : (
                  <p>
                     <span>{!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}</span>
                     {data.price}
                  </p>
               )}
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(ProductCardComponent);
