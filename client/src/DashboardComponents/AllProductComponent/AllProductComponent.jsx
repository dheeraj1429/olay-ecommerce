import React, { useEffect } from 'react';
import * as product from './AllProductComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import AllProductTableComponent from '../AllProductTableComponent/AllProductTableComponent';
import { useDispatch } from 'react-redux';
import { fetchUploadProducts } from '../../Redux/Actions/adminAction';

const subVatiaions = 0;

function AllProductComponent() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchUploadProducts(0, subVatiaions));
   }, []);

   return (
      <product.div>
         <DashboardNavbarComponent />
         <AllProductTableComponent />
      </product.div>
   );
}

export default AllProductComponent;
