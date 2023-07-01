import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
   
  const { isAuthenticated , user} = useSelector((state) => state.user );
   const { pathname } = useLocation();

   if (isAuthenticated || user) return <>{children}</>;

   return <Navigate replace to="/session/signin" state={{ from: pathname }} />;

  // return <>{children}</>;

};

export default AuthGuard;
