import React from 'react';
import * as table from './AllProductsTagTableInnerComponent.style';
import HocSpnnerComponent from '../../HelperComponents/HocSpnnerComponent/HocSpnnerComponent';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { Popconfirm } from 'antd';
import { deleteSelectedProductTag } from '../../Redux/Actions/adminAction';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function AllProductsTagTableInnerComponent({ allProductsTags }) {
   const dispatch = useDispatch();

   const confirm = (id) => {
      dispatch(deleteSelectedProductTag(id));
   };

   return (
      <>
         {!!allProductsTags && allProductsTags.success && !!allProductsTags.tags.length
            ? allProductsTags.tags.map((el) => (
                 <table.tr>
                    <table.td>
                       <Link to={`/dashboard/product-tag/edit/${el._id}`}>
                          <FiEdit2 />
                       </Link>
                    </table.td>
                    <table.td>
                       <Popconfirm
                          title="Are you sure to delete this tag ?"
                          onConfirm={() => confirm(el._id)}
                          okText="Yes"
                          cancelText="No"
                       >
                          <VscClose />
                       </Popconfirm>
                    </table.td>
                    <table.td>{el.name}</table.td>
                    <table.td>{el.description}</table.td>
                    <table.td className="status_td">
                       <div className={el.status}>{el.status}</div>
                    </table.td>
                 </table.tr>
              ))
            : null}
      </>
   );
}

export default HocSpnnerComponent(AllProductsTagTableInnerComponent);
