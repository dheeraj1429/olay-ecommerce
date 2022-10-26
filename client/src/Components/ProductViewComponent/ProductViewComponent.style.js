import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   z-index: 200;
   background-color: var(--spec-themed-overlay-background);
   transition: all 0.3s ease;
   opacity: ${(props) => (props.show ? '1' : '0')};
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};

   .spen {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
   }
`;

export const mainDiv = styled.div`
   width: 65%;
   height: 75%;
   padding: 1rem;
   background-color: var(--main-cl);
   border-radius: 8px;
   overflow-x: hidden;
   position: relative;
   transition: all 0.3s ease;
   opacity: ${(props) => (props.show ? '1' : '0')};
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   transform: ${(props) => (props.show ? 'scale(1)' : 'scale(.7)')};

   .close_btn {
      position: sticky;
      left: 100%;
      top: 20px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--main-cl);
      box-shadow: 0 0 10px 1px #e1e1e1;
      cursor: pointer;

      svg {
         cursor: pointer;
      }
   }

   .brandDiv {
      align-items: center;
      padding: 0.2rem 0;

      .brandHeadingSpaceDiv {
         width: 90px;
      }

      p {
         margin: 0;
         margin-right: 0.5rem;
      }

      .brandIconDiv {
         width: 30px;
         height: 30px;
         border-radius: 50%;
         margin-left: 0.7rem;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }
   }

   .quntity_group {
      align-items: center;
   }
`;

export const flexDiv = styled.div`
   display: flex;

   .image_prv_div {
      width: 40%;
      padding: 1rem;

      .product_big_image {
         width: 100%;
         height: 450px;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }
   }

   .product_content_div {
      width: 60%;
      padding: 0.5rem;

      h5 {
         font-size: 22px;
      }

      .price_div {
         display: flex;
         align-items: baseline;

         p {
            font-size: 28px;
            margin: 0;
         }

         span {
            margin: 0;
            margin-left: 0.5rem;
            color: var(--spec-static-brand-red);
         }

         strike {
            margin-bottom: 0.2rem;
            font-size: 15px;
            margin-left: 0.5rem;
            color: var(--spec-icon-inactive);
         }
      }

      hr {
         margin-top: 0.8rem;
         border: transparent;
         border-top: 1px solid var(--spec-elevated-background-inverse);
         margin-bottom: 0.8rem;
      }

      .description {
         font-size: 13px;
      }

      .stock {
         display: flex;
         align-items: center;

         h5 {
            font-size: 14px;
            margin: 0;
            margin-right: 0.5rem;
         }

         .out-of-stock {
            color: var(--spec-static-brand-red);
         }

         .on-backorder {
            color: var(--spec-call-to-action-inverse);
         }
      }
   }

   .selected_div {
      p {
         font-size: 12px;
         margin: 0;
         margin-bottom: 0.2rem;
      }
      select {
         line-height: 45px;
         padding: 0 20px;
         width: 100%;
         border: 1px solid #e8e8e8;
         -webkit-appearance: none;
         appearance: none;
         -moz-appearance: none;
         color: #444;
         margin-bottom: 1.5rem;
      }
   }

   .quntityGrDiv {
      span {
         font-size: 12px;
         color: var(--spec-static-brand-black);
      }
   }

   .quntityDiv {
      width: 120px;
      height: 37px;
      box-shadow: 0 0 1px 1px var(--spec-outlined-container);
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .qtyBtn {
         width: 35%;
         cursor: pointer;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
      }

      svg {
         font-size: 17px;
      }

      p {
         margin: 0;
      }
   }
`;
