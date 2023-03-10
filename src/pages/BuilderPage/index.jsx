import Sidebar from '../../components/Sidebar'
import React from 'react'
import ContentTypeBuilder from '../../components/ContentTypeBuilder'

export default function BuilderPage () {
  return <div className='flex'>
    <Sidebar selectedIndex={'builder'} />
    <ContentTypeBuilder />
  </div>
}
