import React, { useState } from 'react';
import * as styeld from './SingleProductContentComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import backendConfigData from '../../backendConfig';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { addToCartLoadingHandler } from '../../Redux/Actions/indexAppAction';
import { addToWishList, productAddToCart } from '../../Redux/Actions/indexActions';
import { useNavigate } from 'react-router';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import ProductIncComponent from '../../HelperComponents/ProductIncComponent/ProductIncComponent';

function SingleProductContentComponent() {
   const [Qty, setQty] = useState(1);
   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { singleProduct, addToCartLoading, wishListItemAr } = useSelector((state) => state.index);
   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);

   const getStateValue = function (value) {
      setQty(value);
   };

   const CartHandler = function (productId, img) {
      const token = auth?.userObject?.token;
      if (token) {
         const data = {
            productId,
            token,
            qty: Qty,
         };
         dispatch(addToCartLoadingHandler(true));
         dispatch(productAddToCart(data, img));
      } else {
         navigation('/auth/signin');
      }
   };

   const wishListHander = function (id) {
      const token = auth?.userObject?.token;
      if (token) {
         dispatch(addToWishList(id, token));
      } else {
         navigation('/auth/signin');
      }
   };

   return (
      <styeld.div>
         {!!singleProduct && singleProduct.success && singleProduct.product ? (
            <div className="side_padding_one d-flex pt-4 mt-2 border-bottom pb-4">
               <div className="image_prev_div">
                  <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImages/${singleProduct.product?.productImage}`} />
               </div>
               <div className="product_content_div">
                  <h1>{singleProduct.product.name}</h1>
                  <div className="d-flex align-items-center">
                     <div className="choise_tag_div mt-2 mb-2">Best Choice</div>
                     {singleProduct.product?.stockStatus && singleProduct.product.stockStatus === 'Out of stock' ? <div className="ms-2 text-red">Out of stock</div> : null}
                  </div>
                  <p className="price border-bottom pb-1 d-flex">
                     <p className="me-1 mb-0">Price :</p>
                     <span className="d-flex align-items-end">
                        {!!singleProduct.product?.salePrice && singleProduct.product?.salePrice ? (
                           <>
                              <p className="mb-0">
                                 {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                 {singleProduct.product.salePrice}
                              </p>
                              <strike className="salePrice ms-2">
                                 {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                 {singleProduct.product.price}
                              </strike>
                           </>
                        ) : (
                           singleProduct.product?.price
                        )}
                     </span>
                  </p>
                  <div className="product_details_div mt-2">
                     <h5>Product details</h5>
                     <div className="product_details_content_div">
                        {singleProduct.product?.brand ? (
                           <>
                              <div className="d-flex align-items-center mb-2">
                                 <div className="space_div">
                                    <p>Brand</p>
                                 </div>
                                 <div>
                                    <p>
                                       <strong>{singleProduct.product.brand?.name}</strong>
                                    </p>
                                 </div>
                              </div>
                           </>
                        ) : null}
                        {singleProduct.product.category ? (
                           <div className="d-flex align-items-center mb-2">
                              <div className="space_div">
                                 <p>Categorie</p>
                              </div>
                              <div>
                                 <p>
                                    <strong>{singleProduct.product.category?.name}</strong>
                                 </p>
                              </div>
                           </div>
                        ) : null}

                        {!!singleProduct.product?.discription ? (
                           <>
                              <h5 className="mt-4">Product description</h5>
                              <p>{singleProduct.product.discription}</p>
                           </>
                        ) : null}
                     </div>
                  </div>

                  <div className="mt-4">
                     <div className="content" contentEditable="false" dangerouslySetInnerHTML={{ __html: singleProduct.product?.metaContent }}></div>
                  </div>

                  <div className="quntityGrDiv mt-4">
                     <span className="mb-1">Quantity</span>
                     <styeld.flexDiv className="quntity_group">
                        <ProductIncComponent qtyValue={1} getValue={getStateValue} />

                        {!!singleProduct?.product && singleProduct?.product.stockStatus === 'Out of stock' ? (
                           <CustombuttonComponent innerText={'Out of stock'} btnCl={'Delete_btn mt-0'} />
                        ) : addToCartLoading ? (
                           <CustombuttonComponent btnCl={'addToCart_2'}>
                              <SpnnerComponent />
                           </CustombuttonComponent>
                        ) : (
                           <CustombuttonComponent onClick={() => CartHandler(singleProduct?.product._id, singleProduct?.product?.productImage)} innerText={'ADD TO CART'} btnCl={'addToCart'} />
                        )}

                        <div className="ms-4 wishList d-flex justify-content-center align-items-center">
                           {(function () {
                              if (!!wishListItemAr && wishListItemAr.length && wishListItemAr.includes(singleProduct.product._id)) {
                                 return <AiFillHeart style={{ fill: 'var(--spec-static-brand-red)' }} className="mb-1" onClick={() => wishListHander(singleProduct.product._id)} />;
                              } else {
                                 return <AiOutlineHeart className="mb-1" onClick={() => wishListHander(singleProduct.product._id)} />;
                              }
                           })()}
                        </div>
                     </styeld.flexDiv>
                  </div>
               </div>
            </div>
         ) : null}
      </styeld.div>
   );
}

export default SingleProductContentComponent;
