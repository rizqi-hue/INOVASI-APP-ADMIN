/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getData } from "../utils/storage";
import { setAuth } from "../modules/Auth/Services/AuthSlice";

interface AuthContextType {
  user: any;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [user] = React.useState<any>(getData("token"));

  useEffect(() => {
    const token = getData("token");
    if (token) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, [dispatch]);

  const value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RedirectToProfile({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user) {
    if (location.pathname === '/login') {
      return <Navigate to="/profile" state={{ from: location }} replace />;
    }
  }

  return children;
}


export { AuthProvider, RequireAuth, RedirectToProfile };
