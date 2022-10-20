import React from 'react';
import * as styled from './CardSidebarComponent.style';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { useDispatch } from 'react-redux';
import { showAndHideCartSideBar } from '../../Redux/Actions/indexAppAction';

function CardSidebarComponent() {
   const { showCardSideBar } = useSelector((state) => state.index);
   const dispatch = useDispatch();

   const CloseHandler = function () {
      dispatch(showAndHideCartSideBar(false));
   };

   return ReactDOM.createPortal(
      <styled.div show={showCardSideBar}>
         <VscClose onClick={CloseHandler} />
      </styled.div>,
      document.getElementById('cart-sidebar')
   );
}

export default CardSidebarComponent;
