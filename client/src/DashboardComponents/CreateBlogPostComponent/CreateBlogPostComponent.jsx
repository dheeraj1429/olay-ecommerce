import React, { useState, useRef, useEffect } from 'react';
import * as styled from './CreateBlogPostComponent.style';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox } from 'antd';
import ProductUploadImageComponent from '../ProductUploadImageComponent/ProductUploadImageComponent';
import JoditEditor from 'jodit-react';
import { MenuItem } from '@mui/material';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { message } from 'antd';
import {
   createNewBlogPost,
   fetchSingleBlogPost,
   updateSingleBlogPost,
   getBlogCategories,
} from '../../Redux/Actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBlogPostLoading, removeBlogInsertInfo } from '../../Redux/Actions/adminAppAction';
import { useParams } from 'react-router';

const Status = [
   { value: 'Published', label: 'Published' },
   { value: 'Draft', label: 'Draft' },
   { value: 'Pending', label: 'Pending' },
];

function CreateBlogPostComponent() {
   const [Blog, setBlog] = useState({
      name: '',
      description: '',
      isFeature: false,
      blogStatus: '',
      categorie: '',
   });
   const [Categories, setCategories] = useState([]);
   const [Content, setContent] = useState('');
   const [BlogImage, setBlogImage] = useState('');

   const editor = useRef(null);
   const dispatch = useDispatch();
   const param = useParams();

   const { blogInfoLoading, blogInfo, singleBlogPost, blogCategories } = useSelector((state) => state.admin);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setBlog({ ...Blog, [name]: value });
   };

   const CheckBoxHandler = (e) => {
      setBlog({ ...Blog, isFeature: e.target.checked });
   };

   const ImageGrabHandler = function (e) {
      const file = e.target.files[0];
      setBlogImage(file);
   };

   const sendHandler = function () {
      const { name } = Blog;

      if (!name) {
         return message.info('Blog name is required*');
      }

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', Blog.description);
      formData.append('isFeature', Blog.isFeature);
      formData.append('content', Content);
      formData.append('BlogImage', BlogImage);
      formData.append('blogStatus', Blog.blogStatus);
      formData.append('categorie', Blog.categorie);

      if (param?.id) {
         formData.append('id', param.id);
         dispatch(updateSingleBlogPost(formData));
      } else {
         dispatch(createNewBlogPost(formData));
      }
      dispatch(createNewBlogPostLoading(true));
   };

   useEffect(() => {
      if (!!blogInfo && blogInfo.success) {
         message.success(blogInfo.message);
         dispatch(removeBlogInsertInfo(null));
      } else if (!!blogInfo && blogInfo.message) {
         message.info(blogInfo.message);
      }
   }, [blogInfo]);

   useEffect(() => {
      if (!!param && param?.id) {
         dispatch(fetchSingleBlogPost(param?.id));
      }
   }, [param]);

   useEffect(() => {
      if (!!param && param?.id && !!singleBlogPost && singleBlogPost.success) {
         setBlog({
            name: singleBlogPost.singlePost.name,
            description: singleBlogPost.singlePost.description,
            isFeature: singleBlogPost.singlePost.isFeature,
            blogStatus: singleBlogPost.singlePost.status,
            categorie: singleBlogPost?.singlePost?.categorie ? singleBlogPost.singlePost.categorie : '',
         });
         setBlogImage(singleBlogPost.singlePost.blogImage);
         setContent(singleBlogPost.singlePost.content);
      }
   }, [singleBlogPost]);

   useEffect(() => {
      if (!!blogCategories && blogCategories?.success && Object.keys(blogCategories.categories).length) {
         setCategories(blogCategories.categories);
      }
   }, [blogCategories]);

   useEffect(() => {
      dispatch(getBlogCategories());
   }, []);

   return (
      <styled.div>
         <DashboardNavbarComponent />
         <styled.space>
            <HeadingComponent
               Heading={param?.id ? 'Edit blog post' : 'Create new blog post'}
               subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, `}
            />

            <Box
               component="form"
               sx={{
                  '& > :not(style)': { my: 1, width: '100%' },
               }}
               noValidate
               autoComplete="off"
            >
               <TextField
                  id="outlined-basic"
                  value={Blog.name}
                  onChange={ChangeHandler}
                  name="name"
                  label="Name"
                  variant="outlined"
               />

               <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  value={Blog.description}
                  onChange={ChangeHandler}
                  name="description"
                  multiline
                  rows={5}
               />

               <Checkbox checked={Blog.isFeature} onChange={CheckBoxHandler}>
                  Is featured?
               </Checkbox>

               <styled.marginDiv>
                  <p className="lable_text">Content</p>
                  <JoditEditor
                     ref={editor}
                     value={Content}
                     tabIndex={1}
                     onBlur={(newContent) => setContent(newContent)}
                     onChange={(newContent) => {
                        setContent(newContent);
                     }}
                  />
               </styled.marginDiv>

               <styled.flexDiv>
                  <div className="content_div">
                     <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        name="blogStatus"
                        value={Blog.blogStatus}
                        onChange={ChangeHandler}
                        helperText="Please select your blog status"
                     >
                        {Status.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <div className="content_div">
                     <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        name="categorie"
                        value={Blog.categorie}
                        onChange={ChangeHandler}
                        helperText="Please select your blog categories"
                     >
                        {Categories?.map((option) => (
                           <MenuItem key={option._id} value={option._id}>
                              {option.name}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
               </styled.flexDiv>
            </Box>

            <ProductUploadImageComponent
               selectedPrevImage={BlogImage}
               filde={'blogPostImages'}
               onChange={ImageGrabHandler}
            />

            <CustombuttonComponent
               onClick={sendHandler}
               innerText={param?.id ? 'Update' : 'Save'}
               btnCl={'category_upload'}
               isLoading={blogInfoLoading}
            />
         </styled.space>
      </styled.div>
   );
}

export default CreateBlogPostComponent;
