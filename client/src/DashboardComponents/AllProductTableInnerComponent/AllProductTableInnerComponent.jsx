import React, { useEffect } from 'react';
import HocSpnnerComponent from '../../HelperComponents/HocSpnnerComponent/HocSpnnerComponent';
import { useDispatch } from 'react-redux';
import AllProductsTableViewComponent from '../AllProductsTableViewComponent/AllProductsTableViewComponent';
import { removeAllSelctedIds } from '../../Redux/Actions/adminAppAction';

function AllProductTableInnerComponent({ allProducts, variation }) {
   const dispatch = useDispatch();

   useEffect(() => {
      return () => {
         dispatch(removeAllSelctedIds([]));
      };
   }, []);

   return (
      <>
         {!!allProducts && allProducts.success && allProducts.products.length
            ? allProducts.products.map((el) => (
                 <>
                    <AllProductsTableViewComponent variation={variation} el={el} id={el._id} />
                    {variation
                       ? el?.variations
                          ? el.variations.map((elm) => (
                               <AllProductsTableViewComponent
                                  subVaition={true}
                                  id={el._id}
                                  variation={variation}
                                  el={elm}
                               />
                            ))
                          : null
                       : null}
                 </>
              ))
            : null}
      </>
   );
}

export default HocSpnnerComponent(AllProductTableInnerComponent);
