import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;
   background-color: var(--spec-background-gry-cl);
   border-radius: 10px;
   width: 500px;
   z-index: 100;
   transition: all 0.3s ease;
   position: relative;
   border: 1px solid var(--spec-static-brand-black);

   .close_btn {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 30px;
      height: 30px;
      background-color: var(--main-cl);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
         font-size: 20px;
      }
   }

   svg {
      cursor: pointer;
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;
