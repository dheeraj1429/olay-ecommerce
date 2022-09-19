import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setLoginUser } from "./Redux/Actions/appAction";
import { useDispatch } from "react-redux";

// components
import DashboardSingInComponent from "./DashboardComponents/DashboardSingInComponent/DashboardSingInComponent";
import DashboardHomeComponent from "./DashboardComponents/DashboardHomeComponent/DashboardHomeComponent";
import UploadProductComponent from "./DashboardComponents/UploadProductComponent/UploadProductComponent";
import UploadProductCategory from "./DashboardComponents/UploadProductCategory/UploadProductCategory";
import ProductBrandUploadComponent from "./DashboardComponents/ProductBrandUploadComponent/ProductBrandUploadComponent";
import ProductBrandsComponent from "./DashboardComponents/ProductBrandsComponent/ProductBrandsComponent";
import ProductBrandEditComponent from "./DashboardComponents/ProductBrandEditComponent/ProductBrandEditComponent";
import AllProductComponent from "./DashboardComponents/AllProductComponent/AllProductComponent";
import ProductEditComponent from "./DashboardComponents/ProductEditComponent/ProductEditComponent";
import ProductTagsComponent from "./DashboardComponents/ProductTagsComponent/ProductTagsComponent";
import AllProductsTagsComponent from "./DashboardComponents/AllProductsTagsComponent/AllProductsTagsComponent";
import AllProductTagEditComponent from "./DashboardComponents/AllProductTagEditComponent/AllProductTagEditComponent";

// pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardPanel from "./Pages/DashboardPanel/DashboardPanel";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
   const [cookie] = useCookies(["user"]);
   const dispatch = useDispatch();

   useEffect(() => {
      if (cookie && cookie.user) {
         dispatch(setLoginUser(cookie.user));
      }
   }, []);

   return (
      <div className="App">
         <Routes>
            <Route path="/admin" element={<Dashboard />}>
               <Route path="sign-in" element={<DashboardSingInComponent />} />
            </Route>
            <Route path="dashboard" element={<DashboardPanel />}>
               <Route path="" element={<DashboardHomeComponent />} />
               <Route path="upload-products" element={<UploadProductComponent />} />
               <Route path="product-category" element={<UploadProductCategory />} />
               <Route
                  path="upload-product-brand"
                  element={<ProductBrandUploadComponent />}
               />
               <Route path="product-brands" element={<ProductBrandsComponent />} />
               <Route
                  path="product-brands/edit/:id"
                  element={<ProductBrandEditComponent />}
               />
               <Route path="all-products" element={<AllProductComponent />} />
               <Route
                  path="/dashboard/product/edit/:id"
                  element={<ProductEditComponent />}
               />
               <Route path="product-tags" element={<AllProductsTagsComponent />} />
               <Route path="insert/new-product-tags" element={<ProductTagsComponent />} />
               <Route
                  path="product-tag/edit/:id"
                  element={<AllProductTagEditComponent />}
               />
            </Route>
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </div>
   );
}

export default App;
