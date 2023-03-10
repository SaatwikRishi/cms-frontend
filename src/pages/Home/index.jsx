import React from 'react'

import Sidebar from '../../components/Sidebar'

export default function HomePage () {
  return (
      <div data-testid='home-page' className="bg-loginLight flex h-screen">
        <Sidebar />
      </div>
  )
}
