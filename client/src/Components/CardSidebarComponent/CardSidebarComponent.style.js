import styled from 'styled-components';

export const div = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--spec-themed-overlay-background);
   z-index: 100;
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;

   .mainDiv {
      position: absolute;
      top: 0;
      right: ${(props) => (props.show ? '0' : '-300px')};
      width: 370px;
      height: 100%;
      padding: 1rem;
      background-color: var(--main-cl);
      transition: all 0.3s ease;

      .close_btn {
         position: absolute;
         right: 20px;

         svg {
            font-size: 20px;
         }
      }

      .productInCart {
         width: 100%;
         padding: 1rem 0;
         display: flex;
         position: relative;

         .remove_cart_items {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--main-cl);
            box-shadow: 0 0 3px 1px #e1e1e1;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            left: -5px;
            top: 3px;
         }

         .cartProductImage {
            width: 70px;
            height: 70px;
            overflow: hidden;

            img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }
         }

         .content {
            width: 80%;
            padding-left: 0.7rem;

            p {
               font-size: 13px;
               margin-bottom: 0.1rem;
            }

            span {
               font-size: 12px;
               color: var(--spec-icon-disabled);
            }
         }
      }
   }

   svg {
      cursor: pointer;
   }
`;
