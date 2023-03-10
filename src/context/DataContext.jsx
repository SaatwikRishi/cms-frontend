import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import validateUser from '../utils/common/validateUser.js'
import { GET_COLLECTIONS } from '../utils/constants'
import { makeRequest } from '../utils/makeRequest'

export const DataContext = React.createContext()

export default function ThemeState ({ children }) {
  const [collections, setCollections] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    const localFnForEffect = async () => {
      if ((!collections || collections.length === 0) && await validateUser()) {
        makeRequest(GET_COLLECTIONS()).then((data) => {
          setCollections(data.data)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
    localFnForEffect()
  }, [])
  if (loading) return (<div>Loading...</div>)

  return (
    <DataContext.Provider value={{ collections, setCollections }}>
      {children}
    </DataContext.Provider>
  )
}

ThemeState.propTypes = {
  children: PropTypes.node.isRequired
}
