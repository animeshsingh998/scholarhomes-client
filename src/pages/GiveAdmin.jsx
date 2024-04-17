import React, { useEffect } from 'react'
import { giveAdmin } from '../actions/authActions';

const GiveAdmin = () => {
    const token = window.localStorage.getItem("jwt");
    const adminn =async () => {
        const res = await giveAdmin(token);
        alert(res.message);
    }

    useEffect(() => {
      adminn()
    }, [])
    
  return (
    <div>ADMIN</div>
  )
}

export default GiveAdmin