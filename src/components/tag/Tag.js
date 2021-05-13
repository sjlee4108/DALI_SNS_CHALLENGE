import React from 'react';
import './TagStyles.scss';

const Tag = (props) => (
  props.tag ? <div id="tag">{props.tag}</div> : null
);

export default Tag;
