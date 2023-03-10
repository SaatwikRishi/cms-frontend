import classNames from 'classnames'
import React, { useContext } from 'react'
// import { DataContext } from '../../context/DataContext'
import { BUILDER_ROUTE, COLLECTIONS_ROUTE } from '../../utils/constants'

import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircle } from '@fortawesome/free-solid-svg-icons'
import screenText from '../../screenText'
export default function Sidebar ({ selectedIndex }) {
  const { collections } = useContext(DataContext)
  const navigate = useNavigate()

  const handleSelected = (index) => {
    if (index === 'builder') {
      navigate(BUILDER_ROUTE)
    } else {
      navigate(COLLECTIONS_ROUTE + '/' + index)
    }
  }

  return (
    <div className="bg-loginDark w-[20%] flex flex-col h-screen">
      <div className="h-[8%] flex items-center px-[8%]  bg-customPurple">
        <h2 className="text-white text-3xl font-bold">{screenText.sideBar.title}</h2>
      </div>
      <div className="max-h-[50%] mb-10 ">
        <span className="flex justify-between my-[8%]  px-[8%]">
          <h1 className="font-bold text-gray-300 ">{screenText.sideBar.collectionTypes}</h1>
          <FontAwesomeIcon icon={faSearch} size={'xl'} color={'gray'} />
        </span>
        <div>
          <ol className="flex flex-col gap-y-4">
            {' '}
            {collections.map((collection, index) => (
              <li
                onClick={() => handleSelected(collection.id)}
                key={index}
                className={classNames(
                  collection.id === selectedIndex && 'bg-black',
                  'flex items-center py-2 '
                )}
              >
                <span className="px-4 w-full  pl-6 flex gap-x-3 items-center ">
                  <FontAwesomeIcon icon={faCircle} size={'xs'} color={'gray'} />
                  <p className="text-gray-300">{collection.name}</p>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <button
        onClick={() => handleSelected('builder')}
        className={classNames(
          selectedIndex === 'builder' && 'bg-black',
          'px-[8%] py-2 text-gray-300 font-extrabold'
        )}
      >
        {screenText.sideBar.typeBuilder}
      </button>
    </div>
  )
}

Sidebar.propTypes = {
  selectedIndex: PropTypes.any
}
