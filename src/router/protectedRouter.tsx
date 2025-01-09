import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../zustand/useUserStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  expectPage?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  expectPage,
}) => {
  const { account, isAuthenticated } = useUserStore();

  if (
    !isAuthenticated ||
    (account.role.name == "CUSTOMER" && expectPage == "admin")
  ) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
