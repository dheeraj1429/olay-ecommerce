import styled from 'styled-components';

export const div = styled.div`
   h1 {
      margin: 0;
      font-size: 26px;
   }

   .clDiv {
      width: fit-content;
   }

   p {
      color: var(--spec-outlined-container);
      margin: 0;
   }

   span {
      color: var(--spec-ad-indicator);
   }

   .social_share_div {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      cursor: pointer;

      svg {
         fill: var(--main-cl);
      }
   }

   .facebook {
      background-color: #1b4f9a;
   }

   .twitter {
      background-color: #00aeef;
   }
`;
