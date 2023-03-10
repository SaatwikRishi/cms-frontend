import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import validateUser from '../../utils/common/validateUser.js'
export default function ProtectedRoute ({ children }) {
  const [loading, setLoading] = React.useState(true)
  const [notValid, setNotValid] = React.useState(false)

  React.useEffect(() => {
    validateUser().then((data) => {
      if (!data) setNotValid(true)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  if (notValid) {
    return <Navigate to="/login" />
  }
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node
}
