import React, { useState } from 'react';
import * as styeld from './SingleProductContentComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import backendConfigData from '../../backendConfig';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { addToCartLoadingHandler, productVariationLoading } from '../../Redux/Actions/indexAppAction';
import { addToWishList, getProductCollectionData, getProductSubVariation, productAddToCart } from '../../Redux/Actions/indexActions';
import { useNavigate } from 'react-router';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import ProductIncComponent from '../../HelperComponents/ProductIncComponent/ProductIncComponent';
import dompurify from 'dompurify';
import ProductSocialShareComponent from '../ProductSocialShareComponent/ProductSocialShareComponent';
import CategorieTagShowComponent from '../CategorieTagShowComponent/CategorieTagShowComponent';
import { Skeleton } from 'antd';

function SingleProductContentComponent() {
   const [Qty, setQty] = useState(1);

   const dispatch = useDispatch();
   const navigation = useNavigate();

   const { singleProduct, addToCartLoading, wishListItemAr, singleProductLoading, singleProductSubVariationLoading } = useSelector((state) => state.index);
   const { auth } = useSelector((state) => state.auth);
   const { shopInformation } = useSelector((state) => state.admin);

   const getStateValue = function (value) {
      setQty(value);
   };

   const CartHandler = function (productId, img, subVariationId) {
      const token = auth?.userObject?.token;
      if (token) {
         const data = {
            productId,
            token,
            qty: Qty,
         };

         if (!!subVariationId) {
            data.subVariationId = subVariationId;
         }

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

   const fetchVariationHandler = function (variationId, collectionId, subVariationId) {
      if (subVariationId !== variationId) {
         dispatch(getProductSubVariation(variationId, collectionId));
         dispatch(productVariationLoading(true));
      }
   };

   const fetchParentProductData = function (collectionId, variationId) {
      if (!!variationId) {
         dispatch(getProductCollectionData(collectionId));
         dispatch(productVariationLoading(true));
      }
   };

   return (
      <styeld.div>
         {!!singleProductLoading ? (
            <div className="w-full flex items-center justify-center p-4">
               <SpnnerComponent blackSpenner={true} />
            </div>
         ) : !!singleProduct && singleProduct.success && singleProduct.product ? (
            <>
               <CategorieTagShowComponent heading={'home'} name={singleProduct.product.name.replaceAll('-', ' ')} />
               <ProductSocialShareComponent />
               <div className="side_padding_one d-flex pt-4 mt-2 border-bottom pb-4">
                  <div className="row w-100">
                     <div className="col-12 col-sm-12 col-md-5">
                        <div className={!!singleProductSubVariationLoading ? 'image_prev_div w-100 imageLoading' : 'image_prev_div w-100'}>
                           <img
                              crossOrigin="anonymous"
                              className="img-fluid "
                              src={`${backendConfigData.URL}/productImages/${
                                 !!singleProduct?.product?.subVariationProductImage ? singleProduct.product.subVariationProductImage : singleProduct.product?.productImage
                              }`}
                           />
                        </div>
                     </div>
                     <div className="col-12 col-sm-12 col-md-7 mt-5 mt-md-0">
                        <div className="product_content_div w-100">
                           <h1 className={!!singleProductSubVariationLoading ? 'loadingtextCl' : null}>{singleProduct.product.name}</h1>
                           <div className="d-flex align-items-center">
                              <div className="choise_tag_div mt-2 mb-2">Best Choice</div>
                              {singleProduct.product?.stockStatus && singleProduct.product.stockStatus === 'Out of stock' ? <div className="ms-2 text-red">Out of stock</div> : null}
                           </div>
                           <p className="price border-bottom pb-1 d-flex items-center">
                              <p className="me-1 mb-0">Price :</p>
                              <span className="d-flex items-center">
                                 {!!singleProduct.product?.subVariationPrice ? (
                                    <>
                                       {!!singleProduct?.product?.subVariationSalePrice && singleProduct.product.subVariationSalePrice ? (
                                          <>
                                             <p className={!!singleProductSubVariationLoading ? 'loadingtextCl mb-0' : 'mb-0'}>
                                                {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                                {singleProduct.product.subVariationSalePrice}
                                             </p>
                                             <strike className={!!singleProductSubVariationLoading ? 'loadingtextCl salePrice ms-2' : 'salePrice ms-2'}>
                                                {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                                {singleProduct.product.subVariationPrice}
                                             </strike>
                                          </>
                                       ) : (
                                          <p className={!!singleProductSubVariationLoading ? 'loadingtextCl  m-0' : 'mb-0'}>
                                             {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                             {singleProduct.product.subVariationPrice}
                                          </p>
                                       )}
                                    </>
                                 ) : !!singleProduct.product?.salePrice && singleProduct.product?.salePrice ? (
                                    <>
                                       <p className={!!singleProductSubVariationLoading ? 'loadingtextCl mb-0' : 'mb-0'}>
                                          {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                          {singleProduct.product.salePrice}
                                       </p>
                                       <strike className={!!singleProductSubVariationLoading ? 'loadingtextCl salePrice ms-2' : 'salePrice ms-2'}>
                                          {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                          {singleProduct.product.price}
                                       </strike>
                                    </>
                                 ) : (
                                    <p className={!!singleProductSubVariationLoading ? 'loadingtextCl  m-0' : 'mb-0'}>
                                       {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                       {singleProduct.product?.price}
                                    </p>
                                 )}
                              </span>
                           </p>
                           <div className="variation_div mb-3 flex items-center space-x-3">
                              <div
                                 className={
                                    !!singleProduct.product.subVariationId
                                       ? 'variatio_sub_div p-2 rounded-lg shadow border-red-500 flex items-center'
                                       : 'variatio_sub_div_active variatio_sub_div p-2 rounded-lg shadow border-red-500 flex items-center'
                                 }
                                 onClick={() => fetchParentProductData(singleProduct.product._id, singleProduct.product.subVariationId)}
                              >
                                 <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImages/${singleProduct.product?.productImage}`} />
                                 <p className="mb-0 ms-1">
                                    {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                    {singleProduct.product?.salePrice && !!singleProduct.product.salePrice ? singleProduct.product.salePrice : singleProduct.product?.price}
                                 </p>
                              </div>
                              {singleProduct.product?.variations && singleProduct.product.variations.length
                                 ? singleProduct.product.variations.map((el) => (
                                      <div
                                         className={
                                            el._id === singleProduct.product.subVariationId
                                               ? 'variatio_sub_div_active variatio_sub_div p-2 rounded-lg border-red-500 shadow flex items-center'
                                               : 'variatio_sub_div p-2 rounded-lg shadow flex items-center'
                                         }
                                         key={el._id}
                                         onClick={() => fetchVariationHandler(el._id, singleProduct.product?._id, singleProduct.product.subVariationId)}
                                      >
                                         <img crossOrigin="anonymous" src={`${backendConfigData.URL}/productImages/${el?.productImage}`} />
                                         <p className="mb-0 ms-2">
                                            {!!shopInformation && shopInformation.success && shopInformation?.shop ? shopInformation.shop[0].currencySymbol : '$'}
                                            {el?.salePrice && !!el.salePrice ? el.salePrice : el?.price}
                                         </p>
                                      </div>
                                   ))
                                 : null}
                           </div>
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
                              <div className="content" contentEditable="false" dangerouslySetInnerHTML={{ __html: dompurify.sanitize(singleProduct.product?.metaContent) }}></div>
                           </div>
                           <div className="quntityGrDiv mt-4">
                              <span className="mb-1">Quantity</span>
                              <styeld.flexDiv className="quntity_group">
                                 <ProductIncComponent qtyValue={1} getValue={getStateValue} />
                                 {!!singleProductSubVariationLoading ? (
                                    <Skeleton
                                       paragraph={{
                                          rows: 0,
                                          style: {
                                             display: 'none',
                                          },
                                       }}
                                    />
                                 ) : !!singleProduct?.product && singleProduct?.product.stockStatus === 'Out of stock' ? (
                                    <CustombuttonComponent innerText={'Out of stock'} btnCl={'Delete_btn mt-0'} />
                                 ) : addToCartLoading ? (
                                    <CustombuttonComponent btnCl={'addToCart_2'}>
                                       <SpnnerComponent />
                                    </CustombuttonComponent>
                                 ) : (
                                    <CustombuttonComponent
                                       onClick={() =>
                                          CartHandler(
                                             singleProduct?.product._id,
                                             !!singleProduct?.product?.subVariationProductImage ? singleProduct?.product?.subVariationProductImage : singleProduct?.product?.productImage,
                                             singleProduct.product.subVariationId
                                          )
                                       }
                                       innerText={'ADD TO CART'}
                                       btnCl={'addToCart'}
                                    />
                                 )}
                                 {!!singleProductSubVariationLoading ? null : (
                                    <div className="ms-4 wishList d-flex justify-content-center align-items-center">
                                       {(function () {
                                          if (!!wishListItemAr && wishListItemAr.length && wishListItemAr.includes(singleProduct.product._id)) {
                                             return <AiFillHeart style={{ fill: 'var(--spec-static-brand-red)' }} className="mb-1" onClick={() => wishListHander(singleProduct.product._id)} />;
                                          } else {
                                             return <AiOutlineHeart className="mb-1" onClick={() => wishListHander(singleProduct.product._id)} />;
                                          }
                                       })()}
                                    </div>
                                 )}
                              </styeld.flexDiv>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : null}
      </styeld.div>
   );
}

export default SingleProductContentComponent;
