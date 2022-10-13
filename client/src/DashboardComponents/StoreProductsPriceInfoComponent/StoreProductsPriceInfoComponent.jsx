import React from 'react';
import * as styled from './StoreProductsPriceInfoComponent.style';
import { tableTrAr } from '../ShopInfomationComponent/DropDownData';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Radio } from 'antd';
import { TiDelete } from '@react-icons/all-files/ti/TiDelete';

const positionData = [
   {
      value: 'Before number',
      label: 'Before number',
   },
   {
      value: 'After number',
      label: 'After number',
   },
];

function StoreProductsPriceInfoComponent({ objectData, onChange, keys }) {
   return (
      <styled.div>
         <table>
            <tr>
               {tableTrAr.map((el) => (
                  <th key={el.key}>{el.value}</th>
               ))}
            </tr>
            {!!objectData && objectData.length
               ? objectData.map((el, idx) => (
                    <tr key={el[keys[idx]].key}>
                       <td>
                          <TextField
                             value={el[keys[idx]].name}
                             onChange={(e) => onChange(e, el[keys[idx]].key, idx)}
                             name="name"
                             id="outlined-basic"
                             label="Name"
                             variant="outlined"
                          />
                       </td>
                       <td>
                          <TextField
                             value={el[keys[idx]].symbol}
                             onChange={(e) => onChange(e, el[keys[idx]].key, idx)}
                             name="symbol"
                             id="outlined-basic"
                             label="symbol"
                             variant="outlined"
                          />
                       </td>
                       <td>
                          <TextField
                             value={el[keys[idx]].decimals}
                             onChange={(e) => onChange(e, el[keys[idx]].key, idx)}
                             name="decimals"
                             id="outlined-basic"
                             type={'number'}
                             label="decimals"
                             variant="outlined"
                          />
                       </td>
                       <td>
                          <TextField
                             value={el[keys[idx]].exchangeRate}
                             onChange={(e) => onChange(e, el[keys[idx]].key, idx)}
                             name="exchangeRate"
                             id="outlined-basic"
                             type={'number'}
                             label="Rate"
                             variant="outlined"
                          />
                       </td>
                       <td>
                          <TextField
                             id="outlined-select-currency"
                             select
                             name="Position"
                             label="Position"
                             onChange={(e) => onChange(e, el[keys[idx]].key, idx)}
                             value={el[keys[idx]].Position}
                             style={{
                                width: '100%',
                             }}
                          >
                             {positionData.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                   {option.label}
                                </MenuItem>
                             ))}
                          </TextField>
                       </td>
                       <td>
                          <Radio id="default" />
                       </td>
                       <td>
                          <TiDelete
                             style={{
                                fill: 'red',
                                cursor: 'pointer',
                             }}
                          />
                       </td>
                    </tr>
                 ))
               : null}
         </table>
      </styled.div>
   );
}

export default React.memo(StoreProductsPriceInfoComponent);
