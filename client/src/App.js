// https://preview.themeforest.net/item/outstock-react-next-js-minimal-ecommerce-template/full_screen_preview/39081703
// https://preview.themeforest.net/item/martfury-multipurpose-store-shopify-theme/full_screen_preview/34866272

import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setLoginUser } from './Redux/Actions/authAppAction';
import { getTrandingProducts, getUserCartProducts, getUserWishListProducts } from './Redux/Actions/indexActions';
import { getRandomProductsLoadingHandler, trandingProductsLoading } from './Redux/Actions/indexAppAction';
import { getShopInfromation } from './Redux/Actions/adminAction';

// site pages
import HomePage from './Pages/HomePage/HomePage';
import LoadingComponent from './HelperComponents/LoadingComponent/LoadingComponent';

const SignInAndLoginPage = lazy(() => import('./Pages/SignInAndLoginPage/SignInAndLoginPage'));
const UserDashboardPage = lazy(() => import('./Pages/UserDashboardPage/UserDashboardPage'));

// dashboard components
const DashboardSingInComponent = lazy(() => import('./DashboardComponents/DashboardSingInComponent/DashboardSingInComponent'));
const DashboardHomeComponent = lazy(() => import('./DashboardComponents/DashboardHomeComponent/DashboardHomeComponent'));
const UploadProductComponent = lazy(() => import('./DashboardComponents/UploadProductComponent/UploadProductComponent'));
const UploadProductCategory = lazy(() => import('./DashboardComponents/UploadProductCategory/UploadProductCategory'));
const ProductBrandUploadComponent = lazy(() => import('./DashboardComponents/ProductBrandUploadComponent/ProductBrandUploadComponent'));
const ProductBrandsComponent = lazy(() => import('./DashboardComponents/ProductBrandsComponent/ProductBrandsComponent'));
const ProductBrandEditComponent = lazy(() => import('./DashboardComponents/ProductBrandEditComponent/ProductBrandEditComponent'));
const AllProductComponent = lazy(() => import('./DashboardComponents/AllProductComponent/AllProductComponent'));
const ProductEditComponent = lazy(() => import('./DashboardComponents/ProductEditComponent/ProductEditComponent'));
const ProductTagsComponent = lazy(() => import('./DashboardComponents/ProductTagsComponent/ProductTagsComponent'));
const AllProductsTagsComponent = lazy(() => import('./DashboardComponents/AllProductsTagsComponent/AllProductsTagsComponent'));
const AllProductTagEditComponent = lazy(() => import('./DashboardComponents/AllProductTagEditComponent/AllProductTagEditComponent'));
const VariationSwatchesComponent = lazy(() => import('./DashboardComponents/VariationSwatchesComponent/VariationSwatchesComponent'));
const ProductSwatchesTableComponent = lazy(() => import('./DashboardComponents/ProductSwatchesTableComponent/ProductSwatchesTableComponent'));
const EditProductSwatchesComponent = lazy(() => import('./DashboardComponents/EditProductSwatchesComponent/EditProductSwatchesComponent'));
const ProductVariationCreatorComponent = lazy(() => import('./DashboardComponents/ProductVariationCreatorComponent/ProductVariationCreatorComponent'));
const CreateSelectedProductVariationComponent = lazy(() => import('./DashboardComponents/CreateSelectedProductVariationComponent/CreateSelectedProductVariationComponent'));
const ProductSizeVariationComponent = lazy(() => import('./DashboardComponents/ProductSizeVariationComponent/ProductSizeVariationComponent'));
const ProductSizeVariationTableComponent = lazy(() => import('./DashboardComponents/ProductSizeVariationTableComponent/ProductSizeVariationTableComponent'));
const ProductSizeVariationEditComponent = lazy(() => import('./DashboardComponents/ProductSizeVariationEditComponent/ProductSizeVariationEditComponent'));
const FlashSaleTableViewComponent = lazy(() => import('./DashboardComponents/FlashSaleTableViewComponent/FlashSaleTableViewComponent'));
const CreateNewFlashSaleComponent = lazy(() => import('./DashboardComponents/CreateNewFlashSaleComponent/CreateNewFlashSaleComponent'));
const EditProductFlashSaleComponent = lazy(() => import('./DashboardComponents/EditProductFlashSaleComponent/EditProductFlashSaleComponent'));
const ProductSaleLabelComponent = lazy(() => import('./DashboardComponents/ProductSaleLabelComponent/ProductSaleLabelComponent'));
const ProductLabelTableViewComponent = lazy(() => import('./DashboardComponents/ProductLabelTableViewComponent/ProductLabelTableViewComponent'));
const EditProductLabelComponent = lazy(() => import('./DashboardComponents/EditProductLabelComponent/EditProductLabelComponent'));
const ExportCsvComponent = lazy(() => import('./DashboardComponents/ExportCsvComponent/ExportCsvComponent'));
const ExportHistoryComponent = lazy(() => import('./DashboardComponents/ExportHistoryComponent/ExportHistoryComponent'));
const ImportCsvFileComponent = lazy(() => import('./DashboardComponents/ImportCsvFileComponent/ImportCsvFileComponent'));
const ShopInfomationComponent = lazy(() => import('./DashboardComponents/ShopInfomationComponent/ShopInfomationComponent'));
const CreateStoreComponent = lazy(() => import('./DashboardComponents/CreateStoreComponent/CreateStoreComponent'));
const CreateBlogPostComponent = lazy(() => import('./DashboardComponents/CreateBlogPostComponent/CreateBlogPostComponent'));
const BlogPostContinerComponent = lazy(() => import('./DashboardComponents/BlogPostContainerComponent/BlogPostContainerComponent'));
const BlogCategoriesComponent = lazy(() => import('./DashboardComponents/BlogCategoyrsComponent/BlogCategoriesComponent'));
const ProductOrdersTableComponent = lazy(() => import('./DashboardComponents/ProductOrdersTableComponent/ProductOrdersTableComponent'));

// site components
const SignInAndLoginComponent = lazy(() => import('./Components/SignInAndLoginComponent/SignInAndLoginComponent'));
const SingleProductPage = lazy(() => import('./Pages/SingleProductPage/SingleProductPage'));
const CartPage = lazy(() => import('./Pages/CartPage/CartPage'));
const CheckOutPage = lazy(() => import('./Pages/CheckOutPage/CheckOutPage'));
const CartContactInfromation = lazy(() => import('./Components/CartContactInfromation/CartContactInfromation'));
const ShippingMethodComponent = lazy(() => import('./Components/ShippingMethodComponent/ShippingMethodComponent'));
const SingleOrder = lazy(() => import('./Pages/SingleOrder/SingleOrder'));

// user dashboard components
const MyDetailsComponent = lazy(() => import('./UserDashboardComponent/MyDetailsComponent/MyDetailsComponent'));
const AddressBookComponent = lazy(() => import('./UserDashboardComponent/AddressBookComponent/AddressBookComponent'));
const UserAddressTableViewComponent = lazy(() => import('./UserDashboardComponent/UserAddressTableViewComponent/UserAddressTableViewComponent'));
const MyOrdersComponent = lazy(() => import('./UserDashboardComponent/MyOrdersComponent/MyOrdersComponent'));

// dashboard pages
const Dashboard = lazy(() => import('./DashboardPages/Dashboard/Dashboard'));
const DashboardPanel = lazy(() => import('./DashboardPages/DashboardPanel/DashboardPanel'));
const PageNotFound = lazy(() => import('./DashboardPages/PageNotFound/PageNotFound'));

function App() {
   const [cookie] = useCookies(['user']);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTrandingProducts());
      dispatch(trandingProductsLoading(true));
      dispatch(getRandomProductsLoadingHandler(true));
      dispatch(getShopInfromation());

      if (cookie && cookie.user) {
         dispatch(getUserCartProducts(cookie.user.token));
         dispatch(setLoginUser(cookie.user));
         dispatch(getUserWishListProducts(cookie.user.token));
      }
   }, []);

   return (
      <div className="App">
         <Suspense fallback={<LoadingComponent />}>
            <Routes>
               {/* website routes */}
               <Route path="" element={<HomePage />} />
               <Route path="/products/:productName/:id" element={<SingleProductPage />} />
               <Route path="/cart" element={<CartPage />} />
               <Route path="/checkout" element={<CheckOutPage />}>
                  <Route path="" element={<CartContactInfromation />} />
                  <Route path="shipping-methods" element={<ShippingMethodComponent />} />
               </Route>

               {/* user account pages routes */}
               <Route path="/my-account" element={<UserDashboardPage />}>
                  <Route path="my-details" element={<MyDetailsComponent />} />
                  <Route path="my-address-book" element={<UserAddressTableViewComponent />} />
                  <Route path="my-address-book/create" element={<AddressBookComponent />} />
                  <Route path="my-address-book/edit/:id" element={<AddressBookComponent />} />
                  <Route path="my-orders" element={<MyOrdersComponent />} />
               </Route>
               <Route path="my-orders/single-product-info" element={<SingleOrder />} />

               {/* user auth pages routes */}
               <Route path="auth" element={<SignInAndLoginPage />}>
                  <Route path="signin" element={<SignInAndLoginComponent />} />
                  <Route path="login" element={<SignInAndLoginComponent />} />
               </Route>

               {/* dashboard auth pages routes */}
               <Route path="dashboard-auth" element={<Dashboard />}>
                  <Route path="sign-in" element={<DashboardSingInComponent />} />
               </Route>

               {/* dashboard routes */}
               <Route path="dashboard" element={<DashboardPanel />}>
                  <Route path="" element={<DashboardHomeComponent />} />
                  <Route path="upload-products" element={<UploadProductComponent />} />
                  <Route path="product-category" element={<UploadProductCategory />} />
                  <Route path="upload-product-brand" element={<ProductBrandUploadComponent />} />
                  <Route path="product-brands" element={<ProductBrandsComponent />} />
                  <Route path="product-brands/edit/:id" element={<ProductBrandEditComponent />} />
                  <Route path="all-products" element={<AllProductComponent />} />
                  <Route path="orders" element={<ProductOrdersTableComponent />} />
                  <Route path="/dashboard/product/edit/:id" element={<ProductEditComponent />} />
                  <Route path="product-tags" element={<AllProductsTagsComponent />} />
                  <Route path="insert/new-product-tags" element={<ProductTagsComponent />} />
                  <Route path="product-tag/edit/:id" element={<AllProductTagEditComponent />} />
                  <Route path="variation-swatches" element={<ProductSwatchesTableComponent />} />
                  <Route path="variation-swatches/create" element={<VariationSwatchesComponent />} />
                  <Route path="allSwatches/:id" element={<EditProductSwatchesComponent />} />
                  <Route path="product-variation" element={<ProductVariationCreatorComponent />} />
                  <Route path="product/create-variations/:id" element={<CreateSelectedProductVariationComponent />} />
                  <Route path="/dashboard/product/sub-variations/:id/editSub/:id" element={<CreateSelectedProductVariationComponent />} />
                  <Route path="product-size-variation" element={<ProductSizeVariationTableComponent />} />
                  <Route path="product-size-variation/create" element={<ProductSizeVariationComponent />} />
                  <Route path="sizeVariations/:id" element={<ProductSizeVariationEditComponent />} />
                  <Route path="flash-sale" element={<FlashSaleTableViewComponent />} />
                  <Route path="flash-sale/create" element={<CreateNewFlashSaleComponent />} />
                  <Route path="flash-sale/edit/:id" element={<EditProductFlashSaleComponent />} />
                  <Route path="product-label" element={<ProductLabelTableViewComponent />} />
                  <Route path="product-label/create" element={<ProductSaleLabelComponent />} />
                  <Route path="allLabels/:id" element={<EditProductLabelComponent />} />
                  <Route path="information" element={<ShopInfomationComponent />} />
                  <Route path="export-product" element={<ExportCsvComponent />} />
                  <Route path="export-history" element={<ExportHistoryComponent />} />
                  <Route path="import-product" element={<ImportCsvFileComponent />} />
                  <Route path="store-locators" element={<CreateStoreComponent />} />
                  <Route path="post" element={<BlogPostContinerComponent />} />
                  <Route path="post/create" element={<CreateBlogPostComponent />} />
                  <Route path="post/edit/:id" element={<CreateBlogPostComponent />} />
                  <Route path="blog-categories" element={<BlogCategoriesComponent />} />
               </Route>

               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </Suspense>
      </div>
   );
}

export default App;
