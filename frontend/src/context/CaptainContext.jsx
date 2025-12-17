import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("captain-token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCaptain(res.data.captain);
      })
      .catch(() => {
        localStorage.removeItem("captain-token");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <CaptainDataContext.Provider value={{ captain,setCaptain,setLoading, loading }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
