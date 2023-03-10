import React from 'react'
import { useParams } from 'react-router-dom'
import './ErrorPage.css'
export default function ErrorPage () {
  const { code } = useParams()
  return <div className='error-page' >
    <h1>Error {code} </h1>
  </div>
}
