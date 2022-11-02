import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;

   .padding_div {
      padding: 1rem;
      width: 100%;
   }

   .margin-left {
      margin-left: 1rem;
   }

   .jodit-status-bar {
      display: none !important;
   }

   .jodit .jodit-workplace .jodit-wysiwyg,
   .jodit .jodit-workplace .jodit-wysiwyg_iframe,
   .jodit-container .jodit-workplace .jodit-wysiwyg,
   .jodit-container .jodit-workplace .jodit-wysiwyg_iframe {
      min-height: 300px !important;
      background-color: var(--main-cl);
   }
`;

export const paddingDiv = styled.div`
   padding: 1rem;
`;

export const marginDiv = styled.div`
   margin-top: 1rem;
`;

export const flex = styled.div`
   display: flex;
   width: 100%;
`;

export const upload = styled.div`
   width: 100%;
   padding: 1rem 0;
`;

export const flexDiv = styled.div`
   display: flex;
   padding-bottom: 0.5rem;
   div {
      width: 100%;
   }
   .space-right {
      padding-right: 1rem;
   }
`;

export const flexEnd = styled.div`
   display: flex;
   justify-content: end;
`;
