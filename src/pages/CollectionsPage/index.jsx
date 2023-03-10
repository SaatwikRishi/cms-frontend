import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Entries from '../../components/Entries'
export default function CollectionsPage () {
  const { id } = useParams()
  console.log(id)
  if (!id || id.length === 0) {
    return <Navigate to='/' />
  }
  return <div className='flex'>
    <Sidebar selectedIndex={parseInt(id)} />
    <Entries currentCollection={parseInt(id)} />
  </div>
}
