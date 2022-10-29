import React from 'react';
import * as styled from './BlogCategoriesComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import BlogCategoriesUploadComponent from '../BlogCategoriesUploadComponent/BlogCategoriesUploadComponent';
import BlogAllCategoriesComponent from '../BlogAllCategoriesComponent/BlogAllCategoriesComponent';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';

function BlogCategoriesComponent() {
   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <HeadingComponent
               Heading={'Blog Categories'}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            />
            <styled.flex>
               <styled.formDiv>
                  <BlogCategoriesUploadComponent />
               </styled.formDiv>
               <div className="categories_div">
                  <div className="flex_div">
                     <CustombuttonComponent innerText={'Create'} btnCl={'category_upload'} />
                  </div>
                  <BlogAllCategoriesComponent />
               </div>
            </styled.flex>
         </styled.spaceDiv>
      </styled.div>
   );
}

export default BlogCategoriesComponent;
