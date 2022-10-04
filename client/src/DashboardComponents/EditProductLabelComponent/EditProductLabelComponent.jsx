import React, { useEffect } from "react";
import VariationSwatchesComponent from "../VariationSwatchesComponent/VariationSwatchesComponent";
import * as edit from "./EditProductLabelComponent.style";
import { useDispatch } from "react-redux";
import { getSingleProductLabel } from "../../Redux/Actions/adminAction";
import { useParams } from "react-router";

function EditProductLabelComponent() {
   const disaptch = useDispatch();
   const params = useParams();

   useEffect(() => {
      disaptch(getSingleProductLabel(params.id));
   }, []);

   return (
      <edit.div>
         <VariationSwatchesComponent label={true} editLabel={true} editId={params.id} />
      </edit.div>
   );
}

export default EditProductLabelComponent;
