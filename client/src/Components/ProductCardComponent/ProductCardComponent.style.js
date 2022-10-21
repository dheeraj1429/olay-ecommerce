import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 0.4rem;

   .img_Prv_div {
      width: 100%;
      height: 280px;
      position: relative;
      overflow: hidden;

      .right_icons {
         position: absolute;
         z-index: 20;
         right: 20px;
         top: 20px;
      }

      .icons_div {
         width: 35px;
         height: 35px;
         display: flex;
         align-items: center;
         justify-content: center;
         background-color: var(--main-cl);
         border-radius: 50%;
         cursor: pointer;
         transition: all 0.3s ease;
         margin-bottom: 0.5rem;

         .hover_hidden_div {
            position: absolute;
            left: -100px;
            top: 10px;
            width: 90px;
            background-color: var(--extra-dark-cl);
            text-align: center;
            transition: all 0.3s ease;
            transform: translateX(-10px);
            opacity: 0;
            visibility: hidden;

            svg {
               position: absolute;
               right: -8px;
               top: 4px;
            }

            p {
               margin: 0;
               color: var(--main-cl);
            }
         }
         &:hover .hover_hidden_div {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
         }

         /* 
         &:hover {
            transform: scale(1.1);
         } */

         &:nth-child(2) {
            transform: translateY(-30px);
            visibility: hidden;
            opacity: 0;
         }
         &:nth-child(3) {
            transform: translateY(-60px);
            visibility: hidden;
            opacity: 0;
         }
         &:nth-child(4) {
            transform: translateY(-90px);
            visibility: hidden;
            opacity: 0;
         }
      }

      &::before {
         content: '';
         width: 100%;
         height: 100%;
         background-color: var(--spec-themed-overlay);
         position: absolute;
         z-index: 10;
      }

      img {
         position: absolute;
         top: 0;
         left: 0;
         height: 100%;
         width: 100%;
         object-fit: contain;
         /* transform: scale(1.1); */
      }

      .options_div {
         position: absolute;
         bottom: 10px;
         left: 50%;
         transform: translate(-50%);
         display: flex;
         align-items: center;
         width: 100%;
         justify-content: center;
         z-index: 100;
         transition: all 0.3s ease;
         opacity: 0;
         visibility: hidden;

         div {
            padding: 0.3rem 1rem;
            background-color: var(--main-cl);
            margin: 0 0.2rem;
            border-radius: 20px;
            cursor: pointer;
            box-shadow: 0 0 10px 1px var(--spec-badge-chip-background);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;

            &:hover {
               background-color: var(--dark-cl);
               color: var(--main-cl);
            }

            svg {
               margin-right: 0.2rem;
            }

            &:nth-child(1) {
               transform: translateX(40px);
            }
            &:nth-child(2) {
               transform: translateX(-40px);
            }
         }
      }

      &:hover .options_div {
         visibility: visible;
         opacity: 1;
      }

      &:hover .options_div > div:nth-child(1) {
         transform: translateX(0);
      }
      &:hover .options_div > div:nth-child(2) {
         transform: translateX(0);
      }
      &:hover .icons_div:nth-child(2) {
         transform: translateY(0px);
         visibility: visible;
         opacity: 1;
      }
      &:hover .icons_div:nth-child(3) {
         transform: translateY(0px);
         visibility: visible;
         opacity: 1;
      }
      &:hover .icons_div:nth-child(4) {
         transform: translateY(0px);
         visibility: visible;
         opacity: 1;
      }
   }

   .content_div {
      padding: 1rem 0;

      h5 {
         font-size: 15px;
         margin-bottom: 0.2rem;
      }

      p {
         font-size: 14px;

         span {
            margin-left: 1rem;
            color: var(--spec-static-grey);
         }
      }
   }
   .off {
      width: fit-content;
      margin-left: 0.6rem;
      transform: scale(0.9);

      p {
         margin: 0;
         color: var(--spec-brand-link-text);
      }
   }

   .flexContent {
      display: flex;
   }
`;
