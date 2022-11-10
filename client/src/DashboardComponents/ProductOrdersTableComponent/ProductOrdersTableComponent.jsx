import React, { useEffect } from 'react';
import * as styled from './ProductOrdersTableComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../Redux/Actions/adminAction';
import OrdersTableComponent from '../OrdersTableComponent/OrdersTableComponent';

function ProductOrdersTableComponent() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllOrders());
   }, []);

   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <HeadingComponent
               Heading={'Orders'}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            />

            <OrdersTableComponent />
         </styled.spaceDiv>
      </styled.div>
   );
}

export default ProductOrdersTableComponent;
