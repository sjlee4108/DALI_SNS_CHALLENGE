import React from 'react';
import stc from 'string-to-color';
import './QuoteStyles.scss';

const Quote = (props) => (
  <div id="quoteTopContainer">
    <div id="triangleLeft" />
    <div id="quoteCircle">
      <p style={props.color ? { color: stc(props.color) } : null}>{props.value ? props.value : 'This user is too lazy to put a quote :)'}</p>
    </div>
  </div>
);
export default Quote;
