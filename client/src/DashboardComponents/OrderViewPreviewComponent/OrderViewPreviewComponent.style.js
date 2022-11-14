import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   background-color: var(--spec-themed-overlay-background);
   align-items: center;
   transition: all 0.3s ease;
   opacity: ${(props) => (props.show ? '1' : '0')};
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};

   .scroll_div {
      overflow-x: hidden;
   }

   .top_left {
      top: 10px;
      right: 10px;
   }

   .bag {
      width: max-content;
      padding: 0.2rem 1rem;
      border-radius: 5px;
      color: var(--main-cl);
   }

   .Pending {
      background-color: var(--button-cl);
   }
`;

export const mainDiv = styled.div`
   width: 90%;
   height: 90%;
   background-color: var(--main-cl);
   border-radius: 10px;
   transition: all 0.3s ease;
   position: relative;
   transform: ${(props) => (props.show ? 'scale(1)' : 'scale(0.8)')};
   padding: 1rem;

   .loading_spneer_div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
   }

   h1 {
      font-size: 20px;
   }

   .product_listing {
      .product_image_div {
         width: 50px;
         height: 50px;
         border-radius: 5px;

         img {
            width: 100%;
            height: 100%;
         }
      }

      .order_content_div {
         p {
            font-size: 13px;
            margin-bottom: 0.2rem;
            line-height: 16px;
         }
         span {
            font-size: 12px;
            font-weight: bold;
         }
      }
   }

   .user_order_delivery_information {
      .profile_Div {
         width: 60px;
         height: 60px;
         border-radius: 50%;
         box-shadow: 0 0 10px 1px #e1e1e1;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
         }
      }
      .user_info {
         margin-left: 1rem;

         h5 {
            font-size: 15px;
            margin-bottom: 0.3rem;
         }

         h4 {
            font-size: 11px;
            color: var(--spec-icon-disabled);
         }
      }

      span {
         font-size: 13px;
      }
   }

   .product_payment_information {
      width: 100%;
      margin-top: 1rem;

      .product_payment_information_innerIdv div {
         width: 100px;
      }

      h5 {
         font-size: 13px;
         margin-bottom: 0;
         font-weight: 400;
      }

      span {
         font-size: 17px;
         font-weight: bold;
      }
   }
`;
