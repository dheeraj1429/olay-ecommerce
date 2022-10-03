import React, { useState, useRef, useEffect } from "react";
import * as color from "./VariationSwatchesComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ColorPicker, useColor } from "react-color-palette";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { message } from "antd";
import {
   storeProductSwatches,
   editSingleProductSwatches,
   updateNewSizeVariation,
   editProductSizeVariations,
   insertNewProductColorLable,
} from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import {
   productSwatchesLoadingFn,
   removeproductSwatchesInfo,
   editProductSwatchesLoadingFn,
   removeUpdateProductSwatchesInfo,
   removeProductSizeVariationInfo,
   productSizeVariationLoadingFn,
   editProductSizeVariationsLoadingFn,
   removeSizeVariationInfo,
   labelLoading,
   removerProductLabelInfo,
} from "../../Redux/Actions/appAction";
import { useParams } from "react-router";

function VariationSwatchesComponent({ editId, variation, edit, label = undefined }) {
   const [Swatches, setSwatches] = useState({
      name: "",
      slug: "",
      description: "",
   });

   const dispatch = useDispatch();
   const elm = useRef();
   const pickerRef = useRef();
   const colorBoxRef = useRef();
   const backgroundRef = useRef();
   const [ColorPickerInfo, setColorPickerInfo] = useColor("hex", "#121212");
   const { id } = useParams();

   const productSwatchesLoading = useSelector((state) => state.admin.productSwatchesLoading);
   const productSwatches = useSelector((state) => state.admin.productSwatches);
   const singleProductSwatches = useSelector((state) => state.admin.singleProductSwatches);
   const editProductSwatchesLoading = useSelector((state) => state.admin.editProductSwatchesLoading);
   const editProductSwatches = useSelector((state) => state.admin.editProductSwatches);
   const productSizeVariationLoading = useSelector((state) => state.admin.productSizeVariationLoading);
   const productSizeVariationInfo = useSelector((state) => state.admin.productSizeVariationInfo);
   const editSizeVariationLoading = useSelector((state) => state.admin.editSizeVariationLoading);
   const singleSizeVariation = useSelector((state) => state.admin.singleSizeVariation);
   const editSizeVariationInfo = useSelector((state) => state.admin.editSizeVariationInfo);
   const newLabelInfoLoading = useSelector((state) => state.admin.newLabelInfoLoading);
   const newLabelInfo = useSelector((state) => state.admin.newLabelInfo);

   const info = (msg) => {
      message.info(msg);
   };

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setSwatches({ ...Swatches, [name]: value });
   };

   const SendHandler = function () {
      const { name, slug, description } = Swatches;

      const InfoObject = {
         name,
         slug: slug.toLowerCase(),
         description,
         color: ColorPickerInfo,
      };

      if (name) {
         if (!variation && !label) {
            dispatch(storeProductSwatches(InfoObject));
            pickerRef.current.style.opacity = "0";
            pickerRef.current.style.visibility = "hidden";
            dispatch(productSwatchesLoadingFn(true));
         } else if (variation && !label) {
            dispatch(updateNewSizeVariation({ name, slug, description }));
            dispatch(productSizeVariationLoadingFn(true));
         } else if (label) {
            dispatch(labelLoading(true));
            dispatch(insertNewProductColorLable(InfoObject));
         }
      } else {
         info("Swatches name is required");
      }
   };

   useEffect(() => {
      const targetElem = pickerRef.current;
      const element = colorBoxRef.current;
      const backroundElement = backgroundRef.current;

      const ShowPickerHandler = function () {
         if (targetElem.style.opacity == "1") {
            targetElem.style.opacity = "0";
            targetElem.style.visibility = "hidden";
         } else {
            targetElem.style.opacity = "1";
            targetElem.style.visibility = "visible";
         }
      };

      const HidPickerHandler = function (e) {
         if (e.target.classList.contains("bd_")) {
            targetElem.style.opacity = "0";
            targetElem.style.visibility = "hidden";
         }
      };

      if (!variation) {
         backroundElement.addEventListener("click", HidPickerHandler);
         element.addEventListener("click", ShowPickerHandler);
      }

      return () => {
         if (!variation && !label) {
            element.removeEventListener("click", ShowPickerHandler);
            backroundElement.removeEventListener("click", HidPickerHandler);
            dispatch(removeUpdateProductSwatchesInfo(null));
            dispatch(removeproductSwatchesInfo([]));
         } else if (!label) {
            dispatch(removeProductSizeVariationInfo(null));
            dispatch(removeSizeVariationInfo(null));
         } else if (label) {
            dispatch(removerProductLabelInfo(null));
         }
      };
   }, []);

   useEffect(() => {
      if (!!productSwatches && productSwatches.success) {
         info(productSwatches.message);
      }

      if (!!productSizeVariationInfo) {
         info(productSizeVariationInfo.message);
      }

      if (!!editSizeVariationInfo) {
         info(editSizeVariationInfo.message);
      }
   }, [productSwatches, productSizeVariationInfo, editSizeVariationInfo]);

   useEffect(() => {
      const ObjectSetValuesFunction = function (object, field) {
         return {
            name: object[field].name,
            slug: object[field].slug,
            description: object[field].description,
         };
      };

      if (editId && !!singleProductSwatches && singleProductSwatches.success) {
         setSwatches(ObjectSetValuesFunction(singleProductSwatches, "selectedSwatches"));
         setColorPickerInfo(singleProductSwatches.selectedSwatches.colorCode);
      }

      if (edit && variation && !!singleSizeVariation && singleSizeVariation.success) {
         setSwatches(ObjectSetValuesFunction(singleSizeVariation, "variation"));
      }
   }, [singleProductSwatches, singleSizeVariation]);

   useEffect(() => {
      if (!!editProductSwatches) {
         info(editProductSwatches.message);
      }
   }, [!!editProductSwatches]);

   useEffect(() => {
      if (!!newLabelInfo && newLabelInfo.success) {
         info(newLabelInfo.message);
      }
   }, [newLabelInfo]);

   const UpdateHandler = function () {
      const sendObject = {
         name: Swatches.name,
         slug: Swatches.slug.toLowerCase(),
         description: Swatches.description,
      };

      if (editId && !edit) {
         sendObject.id = editId;
         sendObject.color = ColorPickerInfo;

         dispatch(editProductSwatchesLoadingFn(true));
         dispatch(editSingleProductSwatches(sendObject));
      } else if (edit === "size" && id) {
         sendObject.id = id;
         dispatch(editProductSizeVariationsLoadingFn(true));
         dispatch(editProductSizeVariations(sendObject));
      }
   };

   return (
      <color.div ref={elm}>
         <DashboardNavbarComponent />
         <color.spaceDiv>
            <HeadingComponent
               Heading={
                  editId
                     ? "Edit Color"
                     : variation && !edit
                     ? "Product size variation"
                     : variation && edit == "size"
                     ? "Edit size variation"
                     : label
                     ? "Create product color label"
                     : "Color"
               }
               subHeading={"Attribute terms can be assigned to product and variations"}
            />

            {variation ? null : (
               <p>
                  <strong>Note:</strong> Deleting a term will remove if from all products and variations to which it has
                  been assigned. Recreating a term will not automatically assign to back to products
               </p>
            )}

            <color.contentDiv>
               <Box
                  component="form"
                  sx={{
                     "& > :not(style)": { my: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <HeadingComponent
                     Heading={
                        editId
                           ? "Edit color"
                           : variation && !edit
                           ? "Add new size"
                           : variation && edit
                           ? "Edit size"
                           : label
                           ? "Add product color label"
                           : "Add new color"
                     }
                     cl="sm_heading"
                  />
                  <TextField
                     id="outlined-basic"
                     label="Name"
                     name="name"
                     variant="outlined"
                     helperText="The name is how it appears on your site."
                     value={Swatches.name}
                     onChange={ChangeHandler}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Slug"
                     variant="outlined"
                     name="slug"
                     helperText="The slug is the URL-friendly varsion of the name. it is usually all lowercase and contains only letters."
                     value={Swatches.slug}
                     onChange={ChangeHandler}
                  />
                  <TextField
                     id="outlined-multiline-static"
                     label="Description"
                     multiline
                     rows={6}
                     name="description"
                     value={Swatches.description}
                     onChange={ChangeHandler}
                  />
                  {variation ? null : (
                     <>
                        <HeadingComponent Heading={"Color"} cl="sm_heading" />
                        <color.colorBox>
                           <color.pickerColorBox
                              ref={colorBoxRef}
                              style={{
                                 backgroundColor: `${ColorPickerInfo.hex}`,
                              }}
                           />
                           <div ref={pickerRef} className="color-picker">
                              <color.AciverBackgrond className="bd_" ref={(el) => (backgroundRef.current = el)}>
                                 <ColorPicker
                                    width={300}
                                    height={200}
                                    color={ColorPickerInfo}
                                    onChange={setColorPickerInfo}
                                    hideHSV
                                    dark
                                 />
                              </color.AciverBackgrond>
                           </div>
                        </color.colorBox>
                     </>
                  )}
               </Box>

               <CustombuttonComponent
                  innerText={editId || edit ? "Update" : "Save"}
                  btnCl={"category_upload"}
                  onClick={editId || edit ? UpdateHandler : SendHandler}
                  isLoading={
                     editId
                        ? editProductSwatchesLoading
                        : variation && !edit && !label
                        ? productSizeVariationLoading
                        : edit && variation && !label
                        ? editSizeVariationLoading
                        : label
                        ? newLabelInfoLoading
                        : productSwatchesLoading
                  }
               />
            </color.contentDiv>
         </color.spaceDiv>
      </color.div>
   );
}

export default VariationSwatchesComponent;
