import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import validateUser from '../utils/common/validateUser.js'
import { GET_COLLECTIONS } from '../utils/constants'
import { makeRequest } from '../utils/makeRequest'

export const DataContext = React.createContext()

export default function ThemeState ({ children }) {
  const [collections, setCollections] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const [snackBar, setSnackBar] = React.useState(false)

  const enableSnackBar = (data) => {
    setSnackBar(data)
    setTimeout(() => {
      setSnackBar(false)
    }, 5000)
  }

  const getCollections = async () => {
    if ((!collections || collections.length === 0) && await validateUser()) {
      makeRequest(GET_COLLECTIONS()).then((data) => {
        setCollections(data.data)
        setLoading(false)
      }).catch(() => {

      })
    } else {
      setLoading(false)
    }
  }
  useEffect(() => {
    getCollections()
  }, [])

  if (loading) return (<div>Loading...</div>)

  return (
    <DataContext.Provider value={{ collections, setCollections, getCollections, enableSnackBar }}>
    {snackBar && <div className='absolute z-20 top-10 left-10 px-6 py-4 bg-red-500 rounded-lg font-bold max-w-[300px]' >
        {snackBar}
      </div>}
      {children}

=
    </DataContext.Provider>
  )
}

ThemeState.propTypes = {
  children: PropTypes.node.isRequired
}
