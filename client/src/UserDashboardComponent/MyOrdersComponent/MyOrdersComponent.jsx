import React, { useEffect } from 'react';
import * as styled from './MyOrdersComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAllOrders } from '../../Redux/Actions/indexActions';
import { userOrdersFetchLoading } from '../../Redux/Actions/indexAppAction';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import MyOrdersTableComponent from '../MyOrdersTableComponent/MyOrdersTableComponent';

function MyOrdersComponent() {
   const { auth } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const { userOrdersLoading } = useSelector((state) => state.index);

   useEffect(() => {
      if (!!auth && auth?.userObject && auth.userObject.token) {
         dispatch(getUserAllOrders(auth.userObject.token));
         dispatch(userOrdersFetchLoading(true));
      }
   }, []);

   return (
      <styled.div>
         <h1>My Orders</h1>
         {!!userOrdersLoading ? (
            <div className="flex items-center justify-center">
               <SpnnerComponent blackSpenner={true} />
            </div>
         ) : (
            <MyOrdersTableComponent />
         )}
      </styled.div>
   );
}

export default MyOrdersComponent;
