import React, { useEffect } from "react";
import * as styled from "./TopFlashSaleProductsComponent.style";
import { useSelector, useDispatch } from "react-redux";
import { getTopFlashSaleProducts } from "../../Redux/Actions/adminAction";

function TopFlashSaleProductsComponent() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTopFlashSaleProducts());
   }, []);

   return <styled.div>TopFlashSaleProductsComponent</styled.div>;
}

export default TopFlashSaleProductsComponent;
