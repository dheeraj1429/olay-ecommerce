import React, { useState } from 'react';
import * as styled from './BlogAllCategoriesComponent.style';
import { VscFolderOpened } from '@react-icons/all-files/vsc/VscFolderOpened';
import { VscTrash } from '@react-icons/all-files/vsc/VscTrash';
import { useSelector, useDispatch } from 'react-redux';
import { selecteSingleBlogPostsCategorie } from '../../Redux/Actions/adminAppAction';
import { removeSelectedBlogCategorie } from '../../Redux/Actions/adminAction';
import { Popconfirm } from 'antd';

function BlogAllCategoriesComponent() {
   const [Active, setActive] = useState('');

   const dispatch = useDispatch();
   const { blogCategories } = useSelector((state) => state.admin);

   const activeHandler = function (id) {
      setActive(id);
   };

   const confirm = function (id) {
      dispatch(removeSelectedBlogCategorie(id));
   };

   return (
      <styled.div>
         {!!blogCategories && blogCategories?.success && blogCategories?.categories.length ? (
            blogCategories?.categories.map((el) => (
               <div
                  onClick={() => {
                     activeHandler(el._id);
                  }}
                  className={Active == el._id ? 'categorie_div activeTab' : 'categorie_div'}
                  key={el._id}
               >
                  <VscFolderOpened onClick={() => dispatch(selecteSingleBlogPostsCategorie(el))} />
                  <p>{el.name}</p>
                  <Popconfirm
                     title="Are you sure to delete this categorie?"
                     onConfirm={() => confirm(el._id)}
                     okText="Yes"
                     cancelText="No"
                  >
                     <VscTrash />
                  </Popconfirm>
               </div>
            ))
         ) : (
            <p>No blog categories</p>
         )}
      </styled.div>
   );
}

export default BlogAllCategoriesComponent;
