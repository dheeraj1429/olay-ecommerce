import React from 'react';
import * as innerTable from './FlashSaleInnerTableComponent.style';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import * as global from '../../Global.style';
import { Popconfirm } from 'antd';
import { deleteSingleFlashSale } from '../../Redux/Actions/adminAction';
import HocSpnnerComponent from '../../Components/HocSpnnerComponent/HocSpnnerComponent';
import { Link } from 'react-router-dom';

const row = [
   { elm: 'Edit', value: 'Edit' },
   { elm: 'Delete', value: 'Delete' },
   { elm: 'name', value: 'name' },
   { elm: 'createdAt', value: 'createdAt' },
   { elm: 'statusInfo', value: 'statusInfo' },
   { elm: 'sale', value: 'sale' },
];

function FlashSaleInnerTableComponent() {
   const allSales = useSelector((state) => state.admin.allSales);
   const dispatch = useDispatch();

   const confirm = (id) => {
      dispatch(deleteSingleFlashSale(id));
   };

   return (
      <innerTable.div>
         {!!allSales && allSales.success ? (
            <table>
               <tr>
                  {row.map((el) => (
                     <th key={el.elm}>{el.value}</th>
                  ))}
               </tr>

               {allSales?.sales
                  ? allSales.sales.map((el) => (
                       <tr>
                          <td>
                             <Link to={`/dashboard/flash-sale/edit/${el._id}`}>
                                <FiEdit2 />
                             </Link>
                          </td>
                          <td>
                             <Popconfirm
                                title="Are you sure to delete this Flash sale ?"
                                onConfirm={() => confirm(el._id)}
                                okText="Yes"
                                cancelText="No"
                             >
                                <VscClose />
                             </Popconfirm>
                          </td>
                          <td>{el.name}</td>
                          <td>
                             {el?.createdAt
                                ? (function () {
                                     const date = String(new Date(el.createdAt)).split('GMT')[0];
                                     return <p>{`${date}`}</p>;
                                  })()
                                : null}
                          </td>
                          <td>
                             {el?.statusInfo ? (
                                <global.mainDiv>
                                   <div className={el.statusInfo}>{el.statusInfo}</div>{' '}
                                </global.mainDiv>
                             ) : (
                                <global.mainDiv>
                                   <div className="Draft">Draft</div>
                                </global.mainDiv>
                             )}
                          </td>
                          <td>
                           <div className={el.sale}>{el.sale}</div>
                          </td>
                       </tr>
                    ))
                  : null}
            </table>
         ) : (
            <div className="center">
               <p>No sales</p>
            </div>
         )}
      </innerTable.div>
   );
}

export default HocSpnnerComponent(FlashSaleInnerTableComponent);
