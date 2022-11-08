import React, { useEffect } from 'react';
import * as styled from './CheckOutPage.style';
import { Outlet } from 'react-router-dom';
import ShowUserCartProductDetailsComponent from '../../Components/ShowUserCartProductDetailsComponent/ShowUserCartProductDetailsComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCartProducts } from '../../Redux/Actions/indexActions';

function CheckOutPage() {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getUserCartProducts(auth.userObject.token));
      }
   }, []);

   return (
      <styled.div>
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-12 col-sm-12 col-md-7 side_padding_one infoDiv">
                  <h1 className="checkOutHeading pt-5">Nou Martfury</h1>
                  <div className="mt-5 mb-5 ">
                     <Outlet />
                  </div>
               </div>
               <div className="col-12 col-sm-12 col-md-5 products_div">
                  <ShowUserCartProductDetailsComponent />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default CheckOutPage;
