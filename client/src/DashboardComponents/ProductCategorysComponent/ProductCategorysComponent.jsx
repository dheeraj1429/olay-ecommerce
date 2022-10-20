import React, { useEffect } from 'react';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import * as category from './ProductCategorysComponent.style';
import ProductCategoryInnerComponent from '../ProductCategoryInnerComponent/ProductCategoryInnerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategorys } from '../../Redux/Actions/adminAction';

function ProductCategorysComponent() {
   const dispatch = useDispatch();
   const productAllCategory = useSelector((state) => state.admin.productAllCategory);

   useEffect(() => {
      dispatch(fetchProductsCategorys());
   }, []);

   return (
      <category.div>
         <HeadingComponent cl="sm_heading" Heading={'Product Categorys'} />
         <ProductCategoryInnerComponent
            CategoryName={'Category name'}
            description={'description'}
            edit={'edit'}
            folder={false}
         />
         {!!productAllCategory && productAllCategory.success
            ? productAllCategory.allCategory.map((el) => (
                 <ProductCategoryInnerComponent
                    data={el}
                    key={el._id}
                    CategoryName={el.name}
                    description={el.description}
                    folder={true}
                 />
              ))
            : null}
      </category.div>
   );
}

export default ProductCategorysComponent;
