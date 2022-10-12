import styled from "styled-components";

export const mainDiv = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   background-color: var(--spec-themed-overlay-background);
   display: flex;
   align-items: center;
   justify-content: center;
   opacity: ${(props) => (props.show ? 1 : 0)};
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   transition: all 0.3s ease;
`;

export const innerDiv = styled.div`
   width: 90%;
   height: 90%;
   background-color: var(--main-cl);
   border-radius: 15px;
   position: relative;
   transform: ${(props) => (props.show ? "scale(1)" : "scale(.6)")};
   transition: all 0.3s ease;
   padding: 1rem;
   overflow-x: hidden;

   .close_icons {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;

      svg {
         font-size: 20px;
      }
   }
`;

export const spaceDiv = styled.div`
   padding: 0 1rem;
`;
