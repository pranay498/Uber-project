import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const token = localStorage.getItem('user-token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // ✅ Remove correct key
          localStorage.removeItem('user-token');
          localStorage.removeItem('role');
          navigate('/login');
        }
      } catch (err) {
        console.error('Logout failed:', err);
        localStorage.removeItem('user-token');
        localStorage.removeItem('role');
        navigate('/login');
      }
    };

    logout();
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
