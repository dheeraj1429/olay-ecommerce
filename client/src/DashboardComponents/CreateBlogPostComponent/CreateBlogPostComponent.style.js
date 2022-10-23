import styled from 'styled-components';

export const div = styled.div`
   span {
      color: var(--smooth-light-color);
   }
   .jodit-status-bar {
      display: none !important;
   }

   .jodit-container:not(.jodit_inline) .jodit-workplace {
      /* color: var(--main-cl); */
   }

   .jodit-toolbar__box:not(:empty):not(:empty) {
      /* background-color: var(--spec-error-background) !important; */
   }

   .jodit .jodit-workplace .jodit-wysiwyg,
   .jodit .jodit-workplace .jodit-wysiwyg_iframe,
   .jodit-container .jodit-workplace .jodit-wysiwyg,
   .jodit-container .jodit-workplace .jodit-wysiwyg_iframe {
      min-height: 300px !important;
   }

   .lable_text {
      color: var(--main-cl);
      font-size: 16px;
      margin-bottom: 0.5rem;
   }
`;

export const space = styled.div`
   padding: 1rem;
`;

export const marginDiv = styled.div`
   margin: 1rem 0;
`;

export const flexDiv = styled.div`
   display: flex;
   width: 100%;

   .content_div {
      width: 100%;
      padding-right: 0.5rem;

      div {
         width: 100%;
      }
   }
`;
