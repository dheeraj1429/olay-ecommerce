import React from 'react';
import * as styled from './BlogPostTableComponent.style';
import { FiEdit2 } from '@react-icons/all-files/fi/FiEdit2';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import backendConfigData from '../../backendConfig';
import * as global from '../../Global.style';
import HocSpnnerComponent from '../../HelperComponents/HocSpnnerComponent/HocSpnnerComponent';
import { FcCheckmark } from '@react-icons/all-files/fc/FcCheckmark';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { deleteSingleBlogPost } from '../../Redux/Actions/adminAction';
import { useDispatch } from 'react-redux';

const row = [
   { elm: 'Edit', value: 'Edit' },
   { elm: 'Delete', value: 'Delete' },
   { elm: 'Image', value: 'Image' },
   { elm: 'Name', value: 'Name' },
   { elm: 'Description', value: 'Description' },
   { elm: 'Is Feature', value: 'Is Feature' },
   { elm: 'CreatedAt', value: 'CreatedAt' },
   { elm: 'Status', value: 'Status' },
];

function BlogPostTableComponent({ blogs }) {
   const dispatch = useDispatch();

   const ConfirmHandler = (id) => {
      dispatch(deleteSingleBlogPost(id));
   };

   return (
      <styled.div>
         {!!blogs && blogs.success && blogs.posts.length ? (
            <div className="overflow_div">
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.elm}>{el.value}</th>
                     ))}
                  </tr>

                  {blogs.posts.map((el) => (
                     <tr>
                        <>
                           <td>
                              <Link to={`/dashboard/post/edit/${el._id}`}>
                                 <FiEdit2 />
                              </Link>
                           </td>
                           <td>
                              <Popconfirm
                                 title="Are you sure to delete this post ?"
                                 onConfirm={() => ConfirmHandler(el._id)}
                                 okText="Yes"
                                 cancelText="No"
                              >
                                 <VscClose />
                              </Popconfirm>
                           </td>
                           <td>
                              <div className="ImageDiv">
                                 <img
                                    crossOrigin="anonymous"
                                    src={`${backendConfigData.URL}blogPostCompressImages/${
                                       el?.blogImage ? el.blogImage : null
                                    }`}
                                 />
                              </div>
                           </td>
                           <td>{el.name}</td>
                           <td>{el.description.slice(0, 70)}...</td>
                           <td>
                              {el.isFeature ? (
                                 <div className="flex">
                                    <div className="ms-2">yes</div>
                                    <FcCheckmark />
                                 </div>
                              ) : (
                                 'no'
                              )}
                           </td>
                           <td>
                              {el?.createdAt
                                 ? (function () {
                                      const date = String(new Date(el.createdAt)).split('GMT')[0];
                                      return <p>{`${date}`}</p>;
                                   })()
                                 : null}
                           </td>
                           <td>
                              {el?.status ? (
                                 <global.mainDiv>
                                    <div className={el.status}>{el.status}</div>
                                 </global.mainDiv>
                              ) : (
                                 <global.mainDiv>
                                    <div className="Draft">Draft</div>
                                 </global.mainDiv>
                              )}
                           </td>
                        </>
                     </tr>
                  ))}
               </table>
            </div>
         ) : (
            <div className="center_Div">
               <p>No Blogs</p>
            </div>
         )}
      </styled.div>
   );
}

export default HocSpnnerComponent(BlogPostTableComponent);
