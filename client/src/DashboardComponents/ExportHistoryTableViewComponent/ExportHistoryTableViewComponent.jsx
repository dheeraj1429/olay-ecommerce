import React, { useEffect } from 'react';
import * as history from './ExportHistoryTableViewComponent.style';
import {
   getAllExportInfo,
   deleteSingleProductHistory,
   downloadPrevHistoryFiles,
} from '../../Redux/Actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import HocSpnnerComponent from '../../HelperComponents/HocSpnnerComponent/HocSpnnerComponent';
import { FcDownload } from '@react-icons/all-files/fc/FcDownload';
import { FcFullTrash } from '@react-icons/all-files/fc/FcFullTrash';
import dayjs from 'dayjs';
import { FcVoicemail } from '@react-icons/all-files/fc/FcVoicemail';
import EmailInfoComponent from '../EmailInfoComponent/EmailInfoComponent';
import { hideEmailBoxFn } from '../../Redux/Actions/adminAppAction';

const row = [
   { value: 'Date', key: 1 },
   { value: 'File name', key: 2 },
   { value: 'History id', key: 3 },
   { value: 'History type', key: 4 },
   { value: 'Export Products', key: 5 },
   { value: 'Actions', key: 6 },
];

function ExportHistoryTableViewComponent() {
   const dispatch = useDispatch();
   const { adminExportHistory, hideEmailBox } = useSelector((state) => state.admin);

   const deleteHandler = function (id, fileName) {
      dispatch(deleteSingleProductHistory(id, fileName));
   };

   const downloadHistoryHandler = function (fileName) {
      dispatch(downloadPrevHistoryFiles(fileName));
   };

   const showAndHideEmailBox = function (el) {
      dispatch(hideEmailBoxFn({ show: true, file: el.fileName }));
   };

   useEffect(() => {
      dispatch(getAllExportInfo());
   }, []);

   return (
      <>
         <EmailInfoComponent show={hideEmailBox.show} />
         {!!adminExportHistory && adminExportHistory.success && !!adminExportHistory?.history?.exportsHistory.length ? (
            <history.div>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.key}>{el.value}</th>
                     ))}
                  </tr>

                  {adminExportHistory.history.exportsHistory.map((el) => (
                     <tr key={el._id}>
                        <td>{dayjs(el.date).format('DD/MMMMM/YYYY - h:m:s')}</td>
                        <td>{el.fileName}</td>
                        <td>{el._id}</td>
                        <td>{el.historyType}</td>
                        <td>{el.exportProducts}</td>
                        <td>
                           <div className="flex_div">
                              <div className="icons_div" onClick={() => downloadHistoryHandler(el.fileName)}>
                                 <FcDownload />
                                 <span>Download History</span>
                              </div>
                              <div className="icons_div" onClick={() => deleteHandler(el._id, el.fileName)}>
                                 <FcFullTrash />
                                 <span>Delete history</span>
                              </div>
                              <div className="icons_div" onClick={() => showAndHideEmailBox(el)}>
                                 <FcVoicemail />
                                 <span>Send to email</span>
                              </div>
                           </div>
                        </td>
                     </tr>
                  ))}
               </table>
            </history.div>
         ) : (
            <history.notification>
               <div className="notifiaction_div">
                  <p>No History</p>
               </div>
            </history.notification>
         )}
      </>
   );
}

export default HocSpnnerComponent(ExportHistoryTableViewComponent);
