import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../firebase/AuthContext';

const GuardedRoute = (props) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <Route to={props.to} component={props.component} />
    );
  }
  return (
    <Redirect to="/signup" />
  );
};

export default GuardedRoute;
