import styled from "styled-components";

export const div = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--spec-background-overlay-color);
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;

   .cardInner {
      width: 600px;
      padding: 1rem;
      background-color: var(--main-cl);
      border-radius: 12px;
      transform: scale(0.5);
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
   }

   .showCard {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
   }

   h5 {
      font-size: 20px;
      font-weight: 400;
   }

   p {
      font-size: 16px;
      color: var(--spec-static-brand-black);
   }

   input {
      width: 100%;
      height: 50px;
      padding: 1rem;
      border-radius: 5px;
      border-width: 1px;
      border-color: var(--spec-static-brand-black);
   }

   .closeBtn {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 30px;
      height: 30px;
      background-color: var(--main-cl);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 10px 1px;
      cursor: pointer;
   }
`;
