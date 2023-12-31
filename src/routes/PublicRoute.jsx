import React from 'react'
import { useAuth } from '../context/auth'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const {user} = useAuth();

  if(user) {
    return <Navigate to="/" replace={true} />
  }
  return children;
}

export default PublicRoute