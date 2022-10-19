import React, { useEffect } from 'react';
import * as styled from './ShopStoreTableComponent.style';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShopInfomation } from '../../Redux/Actions/adminAction';
import { Link } from 'react-router-dom';
import { storeShowHideHandler, selectedShopInfoHandler } from '../../Redux/Actions/appAction';

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
                       </td>
                    </tr>
                 ))
               : null}
         </table>
      </styled.div>
   );
}

export default ShopStoreTableComponent;
