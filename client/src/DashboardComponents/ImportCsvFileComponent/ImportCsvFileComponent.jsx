import React, { useEffect, useState } from "react";
import * as styles from "./ImportCsvFileComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { downloadCsvTemplate, importCsvFile } from "../../Redux/Actions/adminAction";
import { downloadTemplateLoadingFunction, insertCsvLoading, showProductInfoCom } from "../../Redux/Actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { AiFillQuestionCircle } from "@react-icons/all-files/ai/AiFillQuestionCircle";
import UploadCsvProductsInfomationComponent from "../UploadCsvProductsInfomationComponent/UploadCsvProductsInfomationComponent";

function ImportCsvFileComponent() {
   const [CSVFile, setCSVFile] = useState({
      csv: "",
   });

   const dispatch = useDispatch();
   const { downloadTemplateLoading, importCsvLoading, importCsvInfo, showProductUploadInfoComponent } = useSelector(
      (state) => state.admin
   );

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
         dispatch(insertCsvLoading(true));
      } else {
         message.info("please choose the file first");
      }
   };

   const showProductUploadInfo = function () {
      dispatch(showProductInfoCom(true));
   };

   useEffect(() => {
      if (!!importCsvInfo && importCsvInfo.success) {
         message.success("product uploded successfully");
      } else if (!!importCsvInfo && !importCsvInfo.success) {
         message.info("something worng!");
      }
   }, [importCsvInfo]);

   return (
      <styles.div>
         <UploadCsvProductsInfomationComponent show={showProductUploadInfoComponent} />
         <DashboardNavbarComponent />
         <styles.spaceDiv>
            <HeadingComponent
               Heading={"Import product csv"}
               subHeading={`Lorem Ipsum is simply dummy text of \n
               the printing and typesetting industry. Lorem Ipsum \n
               has been the industry's standard dummy text ever since \n
               the 1500s, when an unknown printer took a galley of type \n
               and scrambled it to make a type specimen book. It has \n
               survived not only five centuries, but also the leap into electronic typesetting.`}
            />
            <div className="fileUpload_div">
               <input type={"file"} onChange={CSVFileHandler} />
            </div>
            <styles.flexDiv>
               <CustombuttonComponent
                  isLoading={importCsvLoading}
                  onClick={importHandler}
                  innerText={"start Import"}
                  btnCl={"category_upload"}
               />
               <div className="margin">
                  <CustombuttonComponent
                     isLoading={downloadTemplateLoading}
                     onClick={downloadTemplate}
                     innerText={"Download CSV template"}
                     btnCl={"category_upload"}
                  />
               </div>
               <div className="question_icons">
                  <div className="info_div">
                     <p>More infomation</p>
                  </div>
                  <AiFillQuestionCircle onClick={showProductUploadInfo} />
               </div>
            </styles.flexDiv>
         </styles.spaceDiv>
      </styles.div>
   );
}

export default ImportCsvFileComponent;
