import React, { useState } from 'react';
import * as styled from './BlogAllCategoriesComponent.style';
import { VscFolderOpened } from '@react-icons/all-files/vsc/VscFolderOpened';
import { VscTrash } from '@react-icons/all-files/vsc/VscTrash';
import { useSelector } from 'react-redux';

function BlogAllCategoriesComponent() {
   const [Active, setActive] = useState('');

   const { blogCategories } = useSelector((state) => state.admin);

   const activeHandler = function (id) {
      setActive(id);
   };

   return (
      <styled.div>
         {!!blogCategories && blogCategories?.success && blogCategories?.categories.length ? (
            blogCategories?.categories.map((el) => (
               <div
                  className={Active == el._id ? 'categorie_div activeTab' : 'categorie_div'}
                  key={el._id}
                  onClick={() => activeHandler(el._id)}
               >
                  <VscFolderOpened />
                  <p>{el.name}</p>
                  <VscTrash />
               </div>
            ))
         ) : (
            <p>No blog categories</p>
         )}
      </styled.div>
   );
}

export default BlogAllCategoriesComponent;
