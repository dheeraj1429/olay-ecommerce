import React, { useState, useEffect } from 'react';
import * as styled from './CardSidebarComponent.style';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { useDispatch } from 'react-redux';
import { showAndHideCartSideBar, removeCartItemLoadingHandler } from '../../Redux/Actions/indexAppAction';
import backendConfigData from '../../backendConfig';
import { removerProductsFromCart } from '../../Redux/Actions/indexActions';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { useNavigate } from 'react-router';

function CardSidebarComponent() {
   const [CartPrice, setCartPrice] = useState(0);

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { showCardSideBar, cartItems, removeCartItemLoading } = useSelector((state) => state.index);
   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);

   const CloseHandler = function () {
      dispatch(showAndHideCartSideBar(false));
   };

   const RemoveCartItems = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(removerProductsFromCart(id, token));
         dispatch(removeCartItemLoadingHandler(true, id));
      }
   };

   useEffect(() => {
      if (!!cartItems && cartItems.cartItems.length) {
         const priceAr = cartItems.cartItems
            .map((el) => (el.cartItem?.salePrice ? el.cartItem.salePrice * el.qty : el.cartItem.price * el.qty))
            .reduce((acc, crv) => {
               return acc + crv;
            }, 0);
         setCartPrice(priceAr.toFixed(2));
      }
   }, [cartItems]);

   return ReactDOM.createPortal(
      <styled.div show={showCardSideBar}>
         <div className="mainDiv">
            <div>
               <div className="close_btn">
                  <VscClose onClick={CloseHandler} />
               </div>
               <div>
                  <p>Shopping cart</p>
               </div>
            </div>
            <div className="cart_items_div">
               {!!cartItems && cartItems?.success && cartItems.cartItems.length ? (
                  cartItems.cartItems.map((el) => (
                     <div className="productInCart" key={el._id}>
                        <div className="remove_cart_items" onClick={() => RemoveCartItems(el.cartItem._id)}>
                           {!!removeCartItemLoading && removeCartItemLoading.loading && removeCartItemLoading.cartId === el.cartItem._id ? <SpnnerComponent blackSpenner={true} /> : <VscClose />}
                        </div>
                        <div className="cartProductImage">
                           <img crossorigin="anonymous" src={`${backendConfigData.URL}/productImagesCompress/${el.cartItem.productImage}`} />
                        </div>
                        <div className="content">
                           <p>{el.cartItem.name.slice(0, 60)}</p>
                           <span>qty: {el.qty}</span>
                           <p>
                              Price: {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                              {el.cartItem?.salePrice ? el.cartItem.salePrice.toFixed(2) : el.cartItem.price.toFixed(2)}
                           </p>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="nf">No products</div>
               )}
            </div>

            <div className="cart_options_div">
               <div className="flex">
                  <h5>Subtotal</h5>
                  <p>
                     {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                     {CartPrice}
                  </p>
               </div>

               <div>
                  <CustombuttonComponent
                     innerText={'View Cart'}
                     onClick={() => {
                        navigation('/cart');
                        dispatch(showAndHideCartSideBar(false));
                     }}
                     btnCl={'addToCart_wide addToCart'}
                  />
               </div>
            </div>
         </div>
      </styled.div>,
      document.getElementById('cart-sidebar')
   );
}

export default React.memo(CardSidebarComponent);
