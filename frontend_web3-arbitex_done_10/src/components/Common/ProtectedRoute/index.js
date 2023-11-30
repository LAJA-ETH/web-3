import { 
  Navigate,
  Outlet,
} from 'react-router-dom';

import {connect} from 'react-redux';

const ProtectedRoute = ({ 
  isAllowed, 
  children,
  user,
  redirectPath = '/login',
}) => {
  if(isAllowed && !!user)
    return <Outlet />;
  return <Navigate to={redirectPath} replace />;
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProtectedRoute);