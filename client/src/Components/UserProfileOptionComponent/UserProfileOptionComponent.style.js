import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 24px;
   right: 40px;
   background-color: var(--main-cl);
   box-shadow: 0 0 10px 1px #e1e1e1;
   width: 280px;
   /* border-radius: 15px; */
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props.show ? 1 : 0)};
   transition: all 0.3s ease;
   transform: ${(props) => (props.show ? 'scale(1)' : 'scale(.5)')};
   transform-origin: top right;

   .userProfileDiv {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1rem;

      img {
         width: 100%;
         height: 100%;
         border-radius: 50%;
      }
   }

   .user-info {
      width: 75%;

      h5 {
         font-size: 16px;
         margin: 0;
      }
      p {
         font-size: 13px;
         margin: 0;
      }
   }

   .optionsRow {
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--spec-background-cl);

      &:hover {
         background-color: var(--spec-snackbar-background-updated);
      }

      p {
         font-size: 14px;
      }

      .options_icon {
         width: 40px;

         svg {
            font-size: 18px;
         }
      }
   }
`;
