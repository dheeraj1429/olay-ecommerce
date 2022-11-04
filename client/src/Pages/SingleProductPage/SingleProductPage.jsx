import React, { useEffect } from 'react';
import * as styled from './SingleProductPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import CategorieTagShowComponent from '../../Components/CategorieTagShowComponent/CategorieTagShowComponent';
import { useParams } from 'react-router';
import ProductSocialShareComponent from '../../Components/ProductSocialShareComponent/ProductSocialShareComponent';
import SingleProductContentComponent from '../../Components/SingleProductContentComponent/SingleProductContentComponent';
import { getSingleProduct } from '../../Redux/Actions/indexActions';
import { useDispatch } from 'react-redux';

function SingleProductPage() {
   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      if (params.id) {
         dispatch(getSingleProduct(params.id));
      }
   }, [params]);

   return (
      <styled.div>
         <NavbarComponent />
         <CategorieTagShowComponent heading={'home'} name={params.productName.replaceAll('-', ' ')} />
         {/* <ProductSocialShareComponent name={params.productName.replaceAll('-', ' ')} /> */}
         <SingleProductContentComponent />
      </styled.div>
   );
}

export default SingleProductPage;
