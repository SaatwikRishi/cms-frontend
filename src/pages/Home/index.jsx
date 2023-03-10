import React, { useContext, useEffect } from 'react'

import Sidebar from '../../components/Sidebar'
import { DataContext } from '../../context/DataContext'

export default function HomePage () {
  const { getCollections } = useContext(DataContext)
  useEffect(() => {
    getCollections()
  }, [])

  return (
    <div data-testid="home-page" className="bg-loginLight flex h-screen">
      <Sidebar />
    </div>
  )
}
