import React from "react";
import * as Export from "./ExportCsvComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { useDispatch } from "react-redux";
import { exportProductCsv } from "../../Redux/Actions/adminAction";

function ExportCsvComponent() {
   const dispatch = useDispatch();

   const exportHandler = function () {
      dispatch(exportProductCsv());
   };

   return (
      <Export.div>
         <DashboardNavbarComponent />
         <Export.innerComponent>
            <HeadingComponent
               Heading={"Export Product CSV"}
               subHeading={`Export all product information with meta data in csv file. when you just click on the export button you get back the latest product csv file. if you want to check the export history click the sidebar export history options.`}
            />
            <CustombuttonComponent innerText={"Export"} btnCl={"category_upload"} onClick={exportHandler} />
         </Export.innerComponent>
      </Export.div>
   );
}

export default ExportCsvComponent;
