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
import VariationSwatchesComponent from "./DashboardComponents/VariationSwatchesComponent/VariationSwatchesComponent";
import ProductSwatchesTableComponent from "./DashboardComponents/ProductSwatchesTableComponent/ProductSwatchesTableComponent";
import EditProductSwatchesComponent from "./DashboardComponents/EditProductSwatchesComponent/EditProductSwatchesComponent";
import ProductVariationCreatorComponent from "./DashboardComponents/ProductVariationCreatorComponent/ProductVariationCreatorComponent";
import CreateSelectedProductVariationComponent from "./DashboardComponents/CreateSelectedProductVariationComponent/CreateSelectedProductVariationComponent";
import ProductSizeVariationComponent from "./DashboardComponents/ProductSizeVariationComponent/ProductSizeVariationComponent";
import ProductSizeVariationTableComponent from "./DashboardComponents/ProductSizeVariationTableComponent/ProductSizeVariationTableComponent";
import ProductSizeVariationEditComponent from "./DashboardComponents/ProductSizeVariationEditComponent/ProductSizeVariationEditComponent";
import FlashSaleTableViewComponent from "./DashboardComponents/FlashSaleTableViewComponent/FlashSaleTableViewComponent";
import CreateNewFlashSaleComponent from "./DashboardComponents/CreateNewFlashSaleComponent/CreateNewFlashSaleComponent";
import EditProductFlashSaleComponent from "./DashboardComponents/EditProductFlashSaleComponent/EditProductFlashSaleComponent";
import ProductSaleLabelComponent from "./DashboardComponents/ProductSaleLabelComponent/ProductSaleLabelComponent";
import ProductLabelTableViewComponent from "./DashboardComponents/ProductLabelTableViewComponent/ProductLabelTableViewComponent";
import EditProductLabelComponent from "./DashboardComponents/EditProductLabelComponent/EditProductLabelComponent";
import ExportCsvComponent from "./DashboardComponents/ExportCsvComponent/ExportCsvComponent";
import ExportHistoryComponent from "./DashboardComponents/ExportHistoryComponent/ExportHistoryComponent";
import ImportCsvFileComponent from "./DashboardComponents/ImportCsvFileComponent/ImportCsvFileComponent";

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
            <Route path="/" element={<Dashboard />}>
               <Route path="sign-in" element={<DashboardSingInComponent />} />
            </Route>
            {/* <Route path="/admin/database/connection" element={<DatabaseConnection />} /> */}
            <Route path="dashboard" element={<DashboardPanel />}>
               <Route path="" element={<DashboardHomeComponent />} />
               <Route path="upload-products" element={<UploadProductComponent />} />
               <Route path="product-category" element={<UploadProductCategory />} />
               <Route path="upload-product-brand" element={<ProductBrandUploadComponent />} />
               <Route path="product-brands" element={<ProductBrandsComponent />} />
               <Route path="product-brands/edit/:id" element={<ProductBrandEditComponent />} />
               <Route path="all-products" element={<AllProductComponent />} />
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
               <Route path="export-product" element={<ExportCsvComponent />} />
               <Route path="export-history" element={<ExportHistoryComponent />} />
               <Route path="import-product" element={<ImportCsvFileComponent />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </div>
   );
}

export default App;
