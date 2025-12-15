import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-token"); // ✅ correct key
    const role = localStorage.getItem("role");        // ✅ optional role check

    if (!token || role !== "user") {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
