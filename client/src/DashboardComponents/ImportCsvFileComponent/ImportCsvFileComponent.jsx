import React, { useState } from "react";
import * as styles from "./ImportCsvFileComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { downloadCsvTemplate, importCsvFile } from "../../Redux/Actions/adminAction";
import { downloadTemplateLoadingFunction } from "../../Redux/Actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

function ImportCsvFileComponent() {
   const [CSVFile, setCSVFile] = useState({
      csv: "",
   });

   const dispatch = useDispatch();
   const { downloadTemplateLoading } = useSelector((state) => state.admin);

   const downloadTemplate = function () {
      dispatch(downloadCsvTemplate());
      dispatch(downloadTemplateLoadingFunction(true));
   };

   const CSVFileHandler = function (e) {
      const file = e.target.files[0];
      setCSVFile({ csv: file });
   };

   const importHandler = function () {
      const csv = CSVFile.csv;
      if (csv) {
         const formData = new FormData();
         formData.append("importProductCsv", csv);
         dispatch(importCsvFile(formData));
      } else {
         message.info("please choose the file first");
      }
   };

   return (
      <styles.div>
         <DashboardNavbarComponent />
         <styles.spaceDiv>
            <HeadingComponent
               Heading={"Import product csv"}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.`}
            />
            <div className="fileUpload_div">
               <input type={"file"} onChange={CSVFileHandler} />
            </div>
            <styles.flexDiv>
               <CustombuttonComponent onClick={importHandler} innerText={"start Import"} btnCl={"category_upload"} />
               <div className="margin">
                  <CustombuttonComponent
                     isLoading={downloadTemplateLoading}
                     onClick={downloadTemplate}
                     innerText={"Download CSV template"}
                     btnCl={"category_upload"}
                  />
               </div>
            </styles.flexDiv>
         </styles.spaceDiv>
      </styles.div>
   );
}

export default ImportCsvFileComponent;
