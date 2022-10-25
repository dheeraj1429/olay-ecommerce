import React, { useEffect } from 'react';
import * as styled from './BlogPostContainerInnerComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPosts, deleteAllPosts } from '../../Redux/Actions/adminAction';
import ProductSectionFeatureComponent from '../ProductSectionFeatureComponent/ProductSectionFeatureComponent';
import { FcAlphabeticalSortingAz } from '@react-icons/all-files/fc/FcAlphabeticalSortingAz';
import { FcAlphabeticalSortingZa } from '@react-icons/all-files/fc/FcAlphabeticalSortingZa';
import { FcOk } from '@react-icons/all-files/fc/FcOk';
import { FcIcons8Cup } from '@react-icons/all-files/fc/FcIcons8Cup';
import TableFooterComponent from '../TableFooterComponent/TableFooterComponent';
import BlogPostTableComponent from '../BlogPostTableComponent/BlogPostTableComponent';
import { fetchBlogPostLoading } from '../../Redux/Actions/adminAppAction';

const items = [
   { value: '', Option: 'None' },
   { value: 'Sort A - Z', Option: 'Sort A - Z', icon: <FcAlphabeticalSortingAz /> },
   { value: 'Sort Z - A', Option: 'Sort Z - A', icon: <FcAlphabeticalSortingZa /> },
   { value: 'Published', Option: 'Published', icon: <FcOk /> },
   { value: 'Delete all', Option: 'Delete all', icon: <FcIcons8Cup /> },
];

const link = '/dashboard/post/create';

function BlogPostContainerInnerComponent() {
   const dispatch = useDispatch();
   const { allBlogs, fetchBlogLoading } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(fetchBlogPosts(0));
      dispatch(fetchBlogPostLoading(true));
   }, []);

   return (
      <styled.div>
         <ProductSectionFeatureComponent
            state={allBlogs}
            pageLink={link}
            field={'posts'}
            items={items}
            action={deleteAllPosts}
         />
         <BlogPostTableComponent blogs={allBlogs} isLoading={fetchBlogLoading} />
         <TableFooterComponent state={allBlogs} action={'posts'} />
      </styled.div>
   );
}

export default BlogPostContainerInnerComponent;
