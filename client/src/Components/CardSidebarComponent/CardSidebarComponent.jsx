import React from 'react';
import * as styled from './CardSidebarComponent.style';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { useDispatch } from 'react-redux';
import { showAndHideCartSideBar } from '../../Redux/Actions/indexAppAction';
import backendConfigData from '../../backendConfig';
import { removerProductsFromCart } from '../../Redux/Actions/indexActions';

function CardSidebarComponent() {
   const dispatch = useDispatch();
   const { showCardSideBar, cartItems } = useSelector((state) => state.index);
   const { auth } = useSelector((state) => state.auth);

   const CloseHandler = function () {
      dispatch(showAndHideCartSideBar(false));
   };

   const RemoveCartItems = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(removerProductsFromCart(id, token));
      }
   };

   return ReactDOM.createPortal(
      <styled.div show={showCardSideBar}>
         <div className="mainDiv">
            <div className="close_btn">
               <VscClose onClick={CloseHandler} />
            </div>
            <div>
               <p>Shopping cart</p>
            </div>
            {!!cartItems && cartItems?.success && cartItems.cartItems.length ? (
               cartItems.cartItems.map((el) => (
                  <div className="productInCart" key={el._id} id={el._id}>
                     <div className="remove_cart_items" onClick={() => RemoveCartItems(el.cartItem._id)}>
                        <VscClose />
                     </div>
                     <div className="cartProductImage">
                        <img
                           crossorigin="anonymous"
                           src={`${backendConfigData.URL}/productImagesCompress/${el.cartItem.productImage}`}
                        />
                     </div>
                     <div className="content">
                        <p>{el.cartItem.name.slice(0, 60)}</p>
                        <span>qty: {el.qty}</span>
                     </div>
                  </div>
               ))
            ) : (
               <div className="nf">No products</div>
            )}
         </div>
      </styled.div>,
      document.getElementById('cart-sidebar')
   );
}

export default CardSidebarComponent;
