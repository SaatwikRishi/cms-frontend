import React, { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Entries from '../../components/Entries'
import { DataContext } from '../../context/DataContext'
export default function CollectionsPage () {
  const { collections } = useContext(DataContext)

  const { id } = useParams()
  const existsInCollection = collections.find((collection) => collection.id === parseInt(id))
  if (!id || id.length === 0 || !existsInCollection) {
    return <Navigate to='/' />
  }

  return <div className='flex'>
    <Sidebar selectedIndex={parseInt(id)} />
    <Entries currentCollection={parseInt(id)} />
  </div>
}
