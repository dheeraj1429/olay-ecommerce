import React, { useState, useEffect } from "react";
import * as brand from "./ProductBrandUploadComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { MenuItem } from "@mui/material";
import ProductUploadImageComponent from "../ProductUploadImageComponent/ProductUploadImageComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import {
   insertNewProductBrand,
   fetchSelectedBrand,
   editSelectedBrand,
} from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { brandLoading, removeBrandInfo } from "../../Redux/Actions/appAction";
import {
   editSelectedBrandLoading,
   removeEditBrandInfo,
} from "../../Redux/Actions/appAction";

const key = "updatable";

const brandStatus = [
   { value: "Published", label: "Published" },
   { value: "Draft", label: "Draft" },
   { value: "Panding", label: "Panding" },
];

function ProductBrandUploadComponent({ param, selectedBrand }) {
   const [Brand, setBrand] = useState({
      name: "",
      description: " ",
      website: "",
      order: "",
      brandStatusInfo: "Draft",
      brandIcon: "",
      SEOTitle: "",
      SEODescription: "",
   });

   const [Clear, setClear] = useState(false);
   const dispatch = useDispatch();
   const brandInsertLoading = useSelector((state) => state.admin.brandInsertLoading);
   const selectedBrandLoading = useSelector((state) => state.admin.selectedBrandLoading);
   const brandInsert = useSelector((state) => state.admin.brandInsert);
   const selectedBrandEdit = useSelector((state) => state.admin.selectedBrandEdit);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setBrand({ ...Brand, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setBrand({ ...Brand, brandIcon: data });
      setClear(false);
   };

   const info = (mes) => {
      message.info(mes);
   };

   useEffect(() => {
      if (!!brandInsert) {
         if (brandInsert.success) {
            message.success({
               content: brandInsert.message,
               key,
               duration: 2,
            });

            dispatch(removeBrandInfo(null));
         } else {
            info(brandInsert.message);
         }
      }
   }, [brandInsert]);

   const createFormData = function (param) {
      const {
         name,
         description,
         website,
         order,
         brandStatusInfo,
         brandIcon,
         SEOTitle,
         SEODescription,
      } = Brand;

      const fromData = new FormData();
      fromData.append("name", name);
      fromData.append("description", description);
      fromData.append("website", website);
      fromData.append("order", order);
      fromData.append("brandStatusInfo", brandStatusInfo);
      fromData.append("brandIcon", brandIcon);
      fromData.append("SEOTitle", SEOTitle);
      fromData.append("SEODescription", SEODescription);

      if (param) {
         fromData.append("id", param);
      }

      return fromData;
   };

   const SendHandler = function () {
      const { name } = Brand;

      if (name) {
         const fromData = createFormData();

         dispatch(brandLoading(true));
         dispatch(insertNewProductBrand(fromData));
      } else {
         info("Product brand name is required");
      }
   };

   const UpdateHandler = function () {
      if (
         Brand.name !== selectedBrand.selectedBrand.name ||
         Brand.description !== selectedBrand.selectedBrand.description ||
         Brand.website !== selectedBrand.selectedBrand.website ||
         Brand.brandStatusInfo !== selectedBrand.selectedBrand.brandStatusInfo ||
         Brand.SEOTitle !== selectedBrand.selectedBrand.SEOTitle ||
         Brand.SEODescription !== selectedBrand.selectedBrand.SEODescription ||
         Brand.order !== selectedBrand.selectedBrand.order
      ) {
         const fromData = createFormData(param);
         dispatch(editSelectedBrand(fromData));
         dispatch(editSelectedBrandLoading(true));
      } else {
         info("No fildes data change!!");
      }
   };

   const ClearInfoHandler = function () {
      setBrand({
         name: "",
         description: " ",
         website: "",
         order: "",
         brandStatusInfo: "",
         brandIcon: "",
         SEOTitle: "",
         SEODescription: "",
      });

      setClear(true);
   };

   useEffect(() => {
      if (param) {
         dispatch(fetchSelectedBrand(param));
      }
   }, [param]);

   useEffect(() => {
      if (!!selectedBrandEdit) {
         message.success({
            content: selectedBrandEdit.message,
            key,
            duration: 2,
         });
         dispatch(removeEditBrandInfo(null));
      }
   }, [selectedBrandEdit]);

   useEffect(() => {
      if (selectedBrand && selectedBrand.success) {
         setBrand({
            name: selectedBrand.selectedBrand.name,
            description: selectedBrand.selectedBrand.description,
            website: selectedBrand.selectedBrand.website,
            order: selectedBrand.selectedBrand.order,
            brandStatusInfo: selectedBrand.selectedBrand.brandStatusInfo,
            brandIcon: selectedBrand.selectedBrand.brandIcon,
            SEOTitle: selectedBrand.selectedBrand.SEOTitle,
            SEODescription: selectedBrand.selectedBrand.SEODescription,
         });
      }
   }, [selectedBrand]);

   return (
      <brand.div>
         <DashboardNavbarComponent />

         <brand.spaceDiv>
            <HeadingComponent
               Heading={param ? "Edit product brand" : "Create product brand"}
               subHeading={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
               }
            />
            <brand.half>
               <brand.halfWidth>
                  <Box
                     component="form"
                     sx={{
                        "& > :not(style)": { my: 1, width: "100%" },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        id="outlined-basic"
                        name="name"
                        type="text"
                        label="Brand name"
                        variant="outlined"
                        required
                        onChange={ChangeHandler}
                        value={Brand.name}
                     />
                     <TextField
                        id="outlined-multiline-static"
                        label="description"
                        type="text"
                        multiline
                        rows={6}
                        name="description"
                        onChange={ChangeHandler}
                        value={Brand.description}
                     />
                     <TextField
                        id="outlined-basic"
                        name="website"
                        type="text"
                        label="Brand website"
                        variant="outlined"
                        onChange={ChangeHandler}
                        value={Brand.website}
                     />
                     <TextField
                        id="outlined-basic"
                        name="order"
                        type="number"
                        label="Brand orders"
                        variant="outlined"
                        onChange={ChangeHandler}
                        value={Brand.order}
                     />
                     <TextField
                        id="outlined-basic"
                        name="SEOTitle"
                        type="text"
                        label="Brand SEO Title"
                        variant="outlined"
                        onChange={ChangeHandler}
                        value={Brand.SEOTitle}
                     />
                     <TextField
                        id="outlined-multiline-static"
                        label="SEO Description"
                        type="text"
                        multiline
                        rows={3}
                        name="SEODescription"
                        onChange={ChangeHandler}
                        value={Brand.SEODescription}
                     />
                  </Box>
               </brand.halfWidth>
               <brand.halfWidth>
                  <Box
                     component="form"
                     sx={{
                        "& .MuiTextField-root": { my: 1, width: "100%" },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div>
                        <TextField
                           id="outlined-select-currency"
                           select
                           label="Select"
                           helperText="Please select your brand status"
                           onChange={ChangeHandler}
                           value={Brand.brandStatusInfo}
                           name="brandStatusInfo"
                        >
                           {brandStatus.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.label}
                              </MenuItem>
                           ))}
                        </TextField>
                     </div>
                     <ProductUploadImageComponent
                        name="brandIcon"
                        selectedPrevImage={Brand.brandIcon}
                        onChange={ImageGrabHandler}
                        Heading={"Product barnd image"}
                        Clear={Clear}
                     />
                  </Box>
                  <brand.half>
                     {param ? (
                        <CustombuttonComponent
                           innerText={"Update"}
                           btnCl={"category_upload"}
                           isLoading={selectedBrandLoading}
                           onClick={UpdateHandler}
                        />
                     ) : (
                        <>
                           <CustombuttonComponent
                              onClick={SendHandler}
                              innerText={"Save"}
                              btnCl={"category_upload"}
                              isLoading={brandInsertLoading}
                           />
                           <CustombuttonComponent
                              onClick={ClearInfoHandler}
                              innerText={"Clear"}
                              btnCl={"Delete_btn"}
                           />
                        </>
                     )}
                  </brand.half>
               </brand.halfWidth>
            </brand.half>
         </brand.spaceDiv>
      </brand.div>
   );
}

export default ProductBrandUploadComponent;
