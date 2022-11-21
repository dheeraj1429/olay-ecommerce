import React, { useEffect } from 'react';
import * as styled from './SingleProductPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import { useParams } from 'react-router';
import SingleProductContentComponent from '../../Components/SingleProductContentComponent/SingleProductContentComponent';
import { getSingleProduct } from '../../Redux/Actions/indexActions';
import { useDispatch } from 'react-redux';
import { singlePageProductLoadingHandler } from '../../Redux/Actions/indexAppAction';
import ProductAddToCartSideNoficationComponent from '../../Components/ProductAddToCartSideNoficationComponent/ProductAddToCartSideNoficationComponent';

function SingleProductPage() {
   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      if (params.id) {
         dispatch(getSingleProduct(params.id));
         dispatch(singlePageProductLoadingHandler(true));
      }
   }, [params]);

   return (
      <styled.div>
         <NavbarComponent />
         <ProductAddToCartSideNoficationComponent />
         <SingleProductContentComponent />
      </styled.div>
   );
}

export default SingleProductPage;
