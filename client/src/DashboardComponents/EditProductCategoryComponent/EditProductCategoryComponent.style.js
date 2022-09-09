import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;
   position: fixed;
   background-color: var(--spec-background-overlay-color);
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 100;
   opacity: ${(props) => (props.show ? "1" : "0")};
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   transition: all 0.3s ease;
`;
