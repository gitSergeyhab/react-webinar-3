import { memo } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, waiting, children }) {
  console.log({user, waiting})
  if (waiting) return <h1>Проверка авторизации</h1>;
  if (!user) return <Navigate to="/login" />
  return children;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  waiting: PropTypes.bool,
};

export default memo(ProtectedRoute);
