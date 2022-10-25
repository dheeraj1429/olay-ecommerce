const express = require('express');
const route = express.Router();
const multer = require('multer');

const adminController = require('../controllers/adminControllers');
const saleController = require('../controllers/adminSaleController');
const adminBlogController = require('../controllers/adminBlogControllers');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
         if (file.fieldname === 'productImage' || file.fieldname === 'variationImage') {
            cb(null, './upload/productImages');
         } else if (file.fieldname === 'CategoryImage') {
            cb(null, './upload/categoryImages');
         } else if (file.fieldname === 'BlogImage') {
            cb(null, './upload/blogPostImages');
         } else {
            cb(null, './upload/brandImages');
         }
      }
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage: storage }).any();

// Apis => GET
route.get('/get-all-categorys', adminController.getAllCategorys);
route.get('/get-all-product-brand', adminController.getAllProductBrand);
route.get('/get-all-brands', adminController.getProductBrands);
route.get('/get-upload-products', adminController.fetchUploadProducts);
route.get('/get-single-product/:id', adminController.fetchSingleProduct);
route.get('/get-all-product-tags', adminController.getAllProductTags);
route.get('/get-selected-product-tag/:id', adminController.getSelectedProductTag);
route.get('/get-products-all-swatchs', adminController.getAllProductSwatches);
route.get('/get-all-product-tags-documents', adminController.getAllProductTagsDocuments);
route.get('/get-single-product-swatches/:id', adminController.fetchSingleSwatchs);
route.get('/get-all-size-variations', adminController.getAllProductSizeVariations);
route.get('/get-single-size-variation/:id', adminController.getSingleProductSizeVations);
route.get('/get-single-sub-variation', adminController.getSingelSubProductVariation);
route.get('/get-all-sales', saleController.getAllFlashSales);
route.get('/get-sinlge-flash-sale/:id', saleController.getSinlgeFlashSale);
route.get('/get-all-product-label', adminController.getAllProductLable);
route.get('/get-single-product-label/:id', adminController.getSingleProductLabel);
route.get('/get-shop-info', adminController.getShopInfo);
route.get('/get-all-shop-location-data', adminController.getAllShopInfomation);
route.get('/get-signin-users', adminController.getAllSignInUsers);
route.get('/get-product-genral-report', adminController.getProductGenralReport);
route.get('/selected-product-category', adminController.getSelectedProductCategory);
route.get('/get-blogs-posts', adminBlogController.getBlogPosts);
route.get('/get-single-post/:id', adminBlogController.getSingleBlogPost);
// ---------------------------------------------------------------------------------------

// Apis => POST
// route.post("/database-connection-info", adminController.databaseConnectionFunction);
route.post('/upload-category', upload, adminController.uploadProductCategory);
route.post('/insert-new-product-brand', upload, adminController.insertNewProductBrand);
route.post('/delete-multi-product-brand', adminController.deleteSelectedProductBrand);
route.post('/get-selected-product-brand/:id', adminController.getSelectedBrandProduct);
route.post('/insert-new-product', upload, adminController.uploadNewProduct);
route.post('/delete-selected-products', adminController.deleteSelectedProducts);
route.post('/save-new-product-tag', adminController.insertNewProductTag);
route.post('/insert-new-product-swatches', adminController.insertNewProductSwatches);
route.post('/insert-new-product-size-variation', adminController.insertNewProductSizeVairation);
route.post('/insert-new-product-variation', upload, adminController.insertSelectedProductVariation);
route.post('/insert-new-product-flash-sale', saleController.insertNewProductFlashSale);
route.post('/insert-new-product-label', adminController.insertNewProductColorLable);
route.post('/shop-setting', adminController.ShopSetting);
route.post('/store-shop-loaction', adminController.storeShopLocationInfo);
route.post('/create-new-blog', upload, adminBlogController.createNewBlog);
// ---------------------------------------------------------------------------------------

// Apis => PATCH
route.patch('/edit-product-category', upload, adminController.editproductCategory);
route.patch('/update-selected-product-brand', upload, adminController.editSelectedBrand);
route.patch('/eidt-single-product/:id', upload, adminController.editSingleProduct);
route.patch('/update-product-tag', adminController.udpateProductTag);
route.patch('/edit-single-product-swatches', adminController.editSingleProductSwatches);
route.patch('/edit-size-variation', adminController.editSingleSizeVariation);
route.patch('/update-single-sub-varitions', upload, adminController.updateSingleSubVariation);
route.patch('/update-single-flash-sale', saleController.updateSingleFlashSale);
route.patch('/update-product-label', adminController.updateProductLabel);
route.patch('/update-shop-info', adminController.updateShopInformation);
route.patch('/update-shop-information', adminController.UpdateStoreShopInformation);
route.patch('/update-single-blog-post', upload, adminBlogController.updateSingleBlogPost);
// ---------------------------------------------------------------------------------------

// Apis => DELETE
route.delete('/delete-selected-category/:id', adminController.deleteSelectedCategory);
route.delete('/delete-one-product-brand/:id', adminController.deleteOneProductBrand);
route.delete('/delete-all-products-brand', adminController.deleteAllProductBrand);
route.delete('/delete-all-products', adminController.deleteAllProducts);
route.delete('/delete-one-product', adminController.deleteOneProduct);
route.delete('/delete-all-products-tags', adminController.deleteAllProductTags);
route.delete('/delete-single-product-tags/:id', adminController.deleteSelectedTag);
route.delete('/remove-all-color-swatches', adminController.removeAllProductsSwatches);
route.delete('/delete-selected-product-swatches/:id', adminController.removeSelectedProductSwatches);
route.delete('/remove-single-product-size-variation/:id', adminController.removeSingleProductSizeVariation);
route.delete('/delete-all-size-varaiton', adminController.deleteAllProductSizeVations);
route.delete('/delete-single-sub-variaiton', adminController.deleteSingleSubVariation);
route.delete('/delete-all-flash-sale', saleController.deleteAllFlashSales);
route.delete('/delete-single-flash-sale/:id', saleController.deleteSingleFlashSale);
route.delete('/delete-selected-flash-sale-product', saleController.deleteFlashSaleProduct);
route.delete('/delete-all-lables', adminController.deleteAllProductLabel);
route.delete('/delete-single-product-label/:id', adminController.deleteSingleProductLabel);
route.delete('/delete-single-blog-post/:id', adminBlogController.deleteSingleBlogPost);
route.delete('/delete-all-blog-posts', adminBlogController.deleteAllBlogs)
// ---------------------------------------------------------------------------------------

module.exports = route;