import React from "react";
import { useSelector } from "react-redux";
import * as styled from "./UploadCsvProductsInfoComponent.style";

function UploadCsvProductsInfoComponent({ Heading, target, icon, skip }) {
   const { importCsvInfo } = useSelector((state) => state.admin);

   return (
      <>
         {!!importCsvInfo && importCsvInfo.success ? (
            <styled.div>
               <h5>
                  {Heading} {icon} {skip ? "Skip" : "Inserted"} {importCsvInfo.uploadInfo?.[target].length ? importCsvInfo.uploadInfo?.[target].length : null}
               </h5>
               {!!importCsvInfo && importCsvInfo.uploadInfo?.[target] && importCsvInfo.uploadInfo?.[target].length
                  ? importCsvInfo.uploadInfo[target].map((el) => (
                       <styled.infoDiv key={el._id}>
                          <div className="heading_div">
                             <p className="space">
                                <strong>ID</strong>
                             </p>
                             <p>{el._id}</p>
                          </div>
                          <div className="heading_div">
                             <p className="space">
                                <strong>Name</strong>
                             </p>
                             <p>{el.name}</p>
                          </div>
                       </styled.infoDiv>
                    ))
                  : null}
            </styled.div>
         ) : null}
      </>
   );
}

export default UploadCsvProductsInfoComponent;
