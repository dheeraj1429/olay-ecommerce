import React from 'react';
import ReactDom from 'react-dom';
import * as edit from './EditProductCategoryComponent.style';
import EditProductCategoryInnerComponent from '../EditProductCategoryInnerComponent/EditProductCategoryInnerComponent';

function EditProductCategoryComponent({ show }) {
   return ReactDom.createPortal(
      <edit.div show={show ? show : null}>
         <EditProductCategoryInnerComponent />
      </edit.div>,
      document.getElementById('admin_category_edit')
   );
}

export default EditProductCategoryComponent;
