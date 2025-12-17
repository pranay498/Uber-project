import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('role')
      navigate('/captain-login')
      return
    }

    axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('captain-token')
          localStorage.removeItem('role')
          navigate('/captain-login')
        }
      })
      .catch(() => {
        localStorage.removeItem('captain-token')
        localStorage.removeItem('role')
        navigate('/captain-login')
      })
  }, [token])

  return <div>Logging out...</div>
}

export default CaptainLogout
