import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("captain-token"); // ✅ correct key
    const role = localStorage.getItem("role");           // ✅ role check

    if (!token || role !== "captain") {
      navigate("/captain-login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
