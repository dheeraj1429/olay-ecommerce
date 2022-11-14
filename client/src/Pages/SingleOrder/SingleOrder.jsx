import React, { useEffect } from 'react';
import * as styled from './SingleOrder.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getRandomProducts, getUserSingleOrderDetails } from '../../Redux/Actions/indexActions';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { removeSingleOrder, userOrderLoadingHandler } from '../../Redux/Actions/indexAppAction';
import backendConfigData from '../../backendConfig';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import settings from '../../slickConfig';
import ProductCardComponent from '../../Components/ProductCardComponent/ProductCardComponent';
import ProductViewComponent from '../../Components/ProductViewComponent/ProductViewComponent';

function SingleOrder() {
   const dispatch = useDispatch();
   const params = useParams();

   const { auth } = useSelector((state) => state.auth);
   const { userSingleOrderLoading, userSingleOrder, randomProducts, showProductPrev } = useSelector((state) => state.index);

   useEffect(() => {
      if (auth && auth?.userObject && auth?.userObject?.token && params.id) {
         dispatch(getUserSingleOrderDetails(auth.userObject.token, params.id));
         dispatch(userOrderLoadingHandler(true));
         dispatch(getRandomProducts());
      }

      return () => {
         dispatch(removeSingleOrder(null));
      };
   }, []);

   return (
      <styled.div>
         <ProductViewComponent show={showProductPrev} />
         <NavbarComponent />
         <div className="side_padding_one mt-5">
            <div>
               <h1 className="text-5xl">My Order</h1>
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur molestias ipsam sunt doloremque porro, unde expedita dolorum delectus eum iusto nulla, qui, quia placeat dolor
                  repudiandae odit? Fugiat, ipsum maiores!
               </p>
            </div>
            {!!userSingleOrderLoading && !userSingleOrder ? (
               <SpnnerComponent blackSpenner={true} />
            ) : !!userSingleOrder && userSingleOrder.success && userSingleOrder?.userOrder.length ? (
               <div className="order_details flex items-center justify-between mt-5">
                  <div className="row w-100">
                     <div className="col-12 col-sm-12 col-md-7 flex">
                        <div>
                           <div className="product_image_div rounded-lg shadow p-3 flex items-center justify-center">
                              <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImages/${userSingleOrder.userOrder[0].order.productInformation.productImage}`} />
                           </div>
                        </div>
                        <div className="ms-3">
                           <Link to={`/products/${userSingleOrder.userOrder[0].order.productInformation.name.split(' ').join('-')}/${userSingleOrder.userOrder[0].order.productInformation._id}`}>
                              <h5 className="font-extralight mb-3 text hover_text">{userSingleOrder.userOrder[0].order.productInformation.name}</h5>
                           </Link>
                           <span className=" text-gray-500">Qty: {userSingleOrder.userOrder[0].order.qty}</span>
                           <span className=" text-gray-500 ms-4">
                              Price: {userSingleOrder.userOrder[0].currencySymbol}
                              {userSingleOrder.userOrder[0].order?.salePrice && !!userSingleOrder.userOrder[0].order.salePrice
                                 ? userSingleOrder.userOrder[0].order.salePrice
                                 : userSingleOrder.userOrder[0].order.price}
                           </span>
                        </div>
                     </div>
                     <div className="col-12 col-sm-12 col-md-2">
                        <h5 className=" text-gray-500">Status</h5>
                        <h2 className="text-xl">{userSingleOrder.userOrder[0].orderStatus}</h2>
                        <h5 className=" text-gray-500">Order Date</h5>
                        <h2 className="text-xl mb-1">{dayjs(userSingleOrder.userOrder[0].orderCreateAt).format('DD/MM/YY h:m:s A')}</h2>
                     </div>
                     <div className="col-12 col-sm-12 col-md-3">
                        <h5 className=" text-gray-500">Delivery Expected At:</h5>
                        <h2 className="text-xl">Delivery Address</h2>
                        <p className=" text-gray-500">{userSingleOrder.userOrder[0].deliveryAddress.address}</p>
                     </div>
                  </div>
               </div>
            ) : null}
         </div>

         <div className="side_padding_one mt-5">
            {!!randomProducts && randomProducts.success && randomProducts?.product ? (
               <Slider {...settings}>
                  {randomProducts.product.map((el) => (
                     <ProductCardComponent key={el._id} data={el} />
                  ))}
               </Slider>
            ) : null}
         </div>
      </styled.div>
   );
}

export default SingleOrder;
