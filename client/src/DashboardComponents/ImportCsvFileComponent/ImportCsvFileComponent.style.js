import styled from "styled-components";

export const div = styled.div`
   .fileUpload_div {
      width: 100%;
      border: 1px solid var(--spec-static-brand-black);
      padding: 1rem;
      border-radius: 5px;
      color: var(--main-cl);
      transition: all 0.2s ease;

      &:hover {
         border-radius: 7px;
      }
   }

   .question_icons {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-left: 1rem;

      .info_div {
         position: absolute;
         width: 150px;
         background-color: var(--spec-static-brand-black);
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 8px;
         top: -40px;
         opacity: 0;
         visibility: hidden;
         transition: all 0.2s ease;
         transform: translateY(0px);

         p {
            color: var(--main-cl);
            padding: 0;
            margin: 0;
         }
      }

      &:hover .info_div {
         visibility: visible;
         opacity: 1;
         transform: translateY(-5px);
      }

      svg {
         fill: var(--main-cl);
         cursor: help;
      }
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem;
`;

export const flexDiv = styled.div`
   display: flex;
   align-items: center;

   .margin {
      margin-left: 1rem;
   }
`;
