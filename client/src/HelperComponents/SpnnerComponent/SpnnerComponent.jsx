import React from 'react';
import * as spnner from './SpnnerComponent.style';

function SpnnerComponent({ blackSpenner }) {
   return <spnner.div>{blackSpenner ? <img src="/images/spneer2.svg" /> : <img src="/images/spneer.svg" />}</spnner.div>;
}

export default SpnnerComponent;
