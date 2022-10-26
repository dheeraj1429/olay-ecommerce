import React, { useEffect } from 'react';
import * as styled from './ProductSizeCheckBoxComponent.style';
import { getAllProductSizeVariations } from '../../Redux/Actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ProductSizeCheckBoxComponent({ onChange }) {
   const dispatch = useDispatch();
   const { allSizeVariations } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(getAllProductSizeVariations());
   }, []);

   return (
      <styled.div>
         <p>Select product size</p>
         <styled.mainDiv>
            <FormGroup>
               {!!allSizeVariations && allSizeVariations.success && allSizeVariations?.sizeVariations.length
                  ? allSizeVariations.sizeVariations.map((el) => (
                       <FormControlLabel
                          key={el._id}
                          control={<Checkbox onClick={(event) => onChange(event, el._id)} />}
                          label={el.name}
                       />
                    ))
                  : null}
            </FormGroup>
         </styled.mainDiv>
      </styled.div>
   );
}

export default ProductSizeCheckBoxComponent;
