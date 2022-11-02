import React, { useEffect } from 'react';
import * as styled from './ShopStoreTableComponent.style';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShopInfomation } from '../../Redux/Actions/adminAction';
import { storeShowHideHandler, selectedShopInfoHandler } from '../../Redux/Actions/adminAppAction';
import { VscChromeClose } from '@react-icons/all-files/vsc/VscChromeClose';
import { Popconfirm } from 'antd';

const row = [
   { elm: 'name', value: 'Name' },
   { elm: 'email', value: 'EMAIL' },
   { elm: 'phone', value: 'PHONE' },
   { elm: 'address', value: 'ADDRESS' },
   { elm: 'state', value: 'STATE' },
   { elm: 'city', value: 'CITY' },
   { elm: 'country', value: 'COUNTRY' },
   { elm: 'edit', value: 'EDIT' },
];

function ShopStoreTableComponent() {
   const dispatch = useDispatch();
   const { allShops } = useSelector((state) => state.admin);

   const UpdateStoreInfoHandler = function (el) {
      dispatch(storeShowHideHandler(true));
      dispatch(selectedShopInfoHandler(el));
   };

   const confirm = function (id) {
      // dispatch()
   };

   useEffect(() => {
      dispatch(getAllShopInfomation());
   }, []);

   return (
      <styled.div>
         <table>
            <tr>
               {row.map((el) => (
                  <th key={el.elm} className={el.elm === 'address' ? 'large-cl' : el.elm === 'email' ? 'sm-cl' : null}>
                     {el.value}
                  </th>
               ))}
            </tr>
            {!!allShops && allShops.success
               ? allShops.allShops.map((el) => (
                    <tr>
                       <td>{el.name}</td>
                       <td className="email">{el.email}</td>
                       <td>{el.phone}</td>
                       <td>{el.address}</td>
                       <td>{el.state}</td>
                       <td>{el.city}</td>
                       <td className="coutnry_div">{el.country}</td>
                       <td>
                          <FiEdit2 onClick={() => UpdateStoreInfoHandler(el)} />
                          <Popconfirm
                             title="if you want to delete the store then first contact the shop owner first."
                             okText="Yes"
                             cancelText="No"
                          >
                             <VscChromeClose className="ms-2" />
                          </Popconfirm>
                       </td>
                    </tr>
                 ))
               : null}
         </table>
      </styled.div>
   );
}

export default ShopStoreTableComponent;
