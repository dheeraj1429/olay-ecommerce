import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background-color: var(--spec-themed-overlay-background);
   display: flex;
   justify-content: center;
   align-items: center;
   opacity: ${(props) => (props.show ? '1' : '0')};
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   transition: all 0.3s ease;
`;

export const contentDiv = styled.div`
   width: 50%;
   padding: 1rem;
   background-color: var(--main-cl);
   border-radius: 8px;
   transition: all 0.3s ease;
   opacity: ${(props) => (props.show ? '1' : '0')};
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   transform: ${(props) => (props.show ? 'scale(1)' : 'scale(.5)')};
   position: relative;

   .content_div {
      padding: 1rem 0;
   }

   .flex {
      display: flex;

      div {
         width: 100%;
         padding-right: 0.4rem;
      }
   }

   .flexBtn {
      display: flex;
   }

   input {
      width: 100%;
      padding: 1rem;
      height: 40px;
      border: 1px solid var(--spec-icon-disabled);
      margin-bottom: 1rem;
      border-radius: 5px;
      margin-top: 0.3rem;
   }

   label {
      margin-bottom: 0.5rem;
   }

   select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.3rem;
   }
`;
