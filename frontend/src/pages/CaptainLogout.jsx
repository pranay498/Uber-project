import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      return
    }

    axios.post(`${import.meta.env.VITE_API_URL}/captains/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('captain-token')
          navigate('/captain-login')
        }
      })
      .catch(() => {
        localStorage.removeItem('captain-token')
        navigate('/captain-login')
      })
  }, [token])

  return <div>Logging out...</div>
}

export default CaptainLogout
