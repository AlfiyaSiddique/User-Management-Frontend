import React from 'react'
import {useLocation} from "react-router-dom"

const Users = () => {
  const access_token = useLocation().state.access_token;
  console.log(access_token);
  return (
    <div>
      Table
    </div>
  )
}

export default Users
