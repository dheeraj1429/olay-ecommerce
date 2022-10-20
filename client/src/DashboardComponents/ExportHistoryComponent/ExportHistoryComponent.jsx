import React, { useEffect } from 'react';
import * as history from './ExportHistoryComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import ExportHistoryTableViewComponent from '../ExportHistoryTableViewComponent/ExportHistoryTableViewComponent';
import { useSelector, useDispatch } from 'react-redux';
import { exportHistoryLoading } from '../../Redux/Actions/adminAppAction';

function ExportHistoryComponent() {
   const dispatch = useDispatch();
   const { adminExportHistoryLoading } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(exportHistoryLoading(true));
   }, []);

   return (
      <history.div>
         <DashboardNavbarComponent />
         <history.spaceDiv>
            <HeadingComponent
               Heading={'Export history'}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled`}
            />
            <ExportHistoryTableViewComponent isLoading={adminExportHistoryLoading} />
         </history.spaceDiv>
      </history.div>
   );
}

export default ExportHistoryComponent;
