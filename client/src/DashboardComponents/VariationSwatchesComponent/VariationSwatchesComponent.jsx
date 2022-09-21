import React, { useState, useRef, useEffect } from "react";
import * as color from "./VariationSwatchesComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ColorPicker, useColor } from "react-color-palette";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { message } from "antd";
import { storeProductSwatches, editSingleProductSwatches } from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { productSwatchesLoadingFn, removeproductSwatchesInfo, editProductSwatchesLoadingFn, removeUpdateProductSwatchesInfo } from "../../Redux/Actions/appAction";

function VariationSwatchesComponent({ editId }) {
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

   const productSwatchesLoading = useSelector((state) => state.admin.productSwatchesLoading);
   const productSwatches = useSelector((state) => state.admin.productSwatches);
   const singleProductSwatches = useSelector((state) => state.admin.singleProductSwatches);
   const editProductSwatchesLoading = useSelector((state) => state.admin.editProductSwatchesLoading);
   const editProductSwatches = useSelector((state) => state.admin.editProductSwatches);

   const info = (msg) => {
      message.info(msg);
   };

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setSwatches({ ...Swatches, [name]: value });
   };

   const SendHandler = function () {
      if (Swatches.name) {
         dispatch(
            storeProductSwatches({
               name: Swatches.name,
               slug: Swatches.slug.toLowerCase(),
               description: Swatches.description,
               color: ColorPickerInfo,
            })
         );
         pickerRef.current.style.opacity = "0";
         pickerRef.current.style.visibility = "hidden";
         dispatch(productSwatchesLoadingFn(true));
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

      backroundElement.addEventListener("click", HidPickerHandler);
      element.addEventListener("click", ShowPickerHandler);

      return () => {
         element.removeEventListener("click", ShowPickerHandler);
         backroundElement.removeEventListener("click", HidPickerHandler);
         dispatch(removeUpdateProductSwatchesInfo(null));
      };
   }, []);

   useEffect(() => {
      if (!!productSwatches && productSwatches.success) {
         info(productSwatches.message);
         dispatch(removeproductSwatchesInfo([]));
      }
   }, [productSwatches]);

   useEffect(() => {
      if (editId && !!singleProductSwatches && singleProductSwatches.success) {
         setSwatches({
            name: singleProductSwatches.selectedSwatches.name,
            slug: singleProductSwatches.selectedSwatches.slug,
            description: singleProductSwatches.selectedSwatches.description,
         });
         setColorPickerInfo(singleProductSwatches.selectedSwatches.colorCode);
      }
   }, [singleProductSwatches]);

   useEffect(() => {
      if (!!editProductSwatches) {
         info(editProductSwatches.message);
      }
   }, [!!editProductSwatches]);

   const UpdateHandler = function () {
      if (
         Swatches.name !== singleProductSwatches.selectedSwatches.name ||
         Swatches.slug !== singleProductSwatches.selectedSwatches.slug ||
         Swatches.description !== singleProductSwatches.selectedSwatches.description ||
         ColorPickerInfo !== singleProductSwatches.selectedSwatches.colorCode
      ) {
         dispatch(editProductSwatchesLoadingFn(true));
         dispatch(
            editSingleProductSwatches({
               id: editId,
               name: Swatches.name,
               slug: Swatches.slug.toLowerCase(),
               description: Swatches.description,
               color: ColorPickerInfo,
            })
         );
      } else {
         info("Filde values is same, No changes");
      }
   };

   return (
      <color.div ref={elm}>
         <DashboardNavbarComponent />
         <color.spaceDiv>
            <HeadingComponent Heading={editId ? "Edit Color" : "Color"} subHeading={"Attribute terms can be assigned to product and variations"} />

            <p>
               <strong>Note:</strong> Deleting a term will remove if from all products and variations to which it has been assigned. Recreating a term will not automatically assign to back to products
            </p>

            <color.contentDiv>
               <Box
                  component="form"
                  sx={{
                     "& > :not(style)": { my: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <HeadingComponent Heading={editId ? "Edit color" : "Add new color"} cl="sm_heading" />
                  <TextField id="outlined-basic" label="Name" name="name" variant="outlined" helperText="The name is how it appears on your site." value={Swatches.name} onChange={ChangeHandler} />
                  <TextField
                     id="outlined-basic"
                     label="Slug"
                     variant="outlined"
                     name="slug"
                     helperText="The slug is the URL-friendly varsion of the name. it is usually all lowercase and contains only letters."
                     value={Swatches.slug}
                     onChange={ChangeHandler}
                  />
                  <TextField id="outlined-multiline-static" label="Description" multiline rows={6} name="description" value={Swatches.description} onChange={ChangeHandler} />
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
                           <ColorPicker width={300} height={200} color={ColorPickerInfo} onChange={setColorPickerInfo} hideHSV dark />
                        </color.AciverBackgrond>
                     </div>
                  </color.colorBox>
               </Box>

               <CustombuttonComponent
                  innerText={editId ? "Update" : "Save"}
                  btnCl={"category_upload"}
                  onClick={editId ? UpdateHandler : SendHandler}
                  isLoading={editId ? editProductSwatchesLoading : productSwatchesLoading}
               />
            </color.contentDiv>
         </color.spaceDiv>
      </color.div>
   );
}

export default VariationSwatchesComponent;
