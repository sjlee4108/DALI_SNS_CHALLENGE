import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { increment, decrement } from '../store/actions';

const Controls = (props) => (
  <div>
    <button type="button" onClick={props.increment}>+</button>
    <button type="button" onClick={props.decrement}>-</button>
  </div>
);

export default withRouter(connect(null, { increment, decrement })(Controls));
