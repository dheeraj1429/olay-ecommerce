import React from 'react';
import * as styled from './BlogPostContainerComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import BlogPostContainerInnerComponent from '../BlogPostContainerInnerComponent/BlogPostContainerInnerComponent';

function BlogPostContinerComponent() {
   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.spaceDiv>
            <HeadingComponent Heading={'Blog Posts'} />
            <BlogPostContainerInnerComponent />
         </styled.spaceDiv>
      </styled.div>
   );
}

export default BlogPostContinerComponent;
