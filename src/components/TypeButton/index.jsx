import React from 'react'
import PropTypes from 'prop-types'

export default function TypeButton ({ onClick, dialogText }) {
  return (
      <button
        onClick={onClick}
        className="w-full bg-blue-50 h-14 flex items-center justify-center border-2 rounded-lg border-dotted border-customPurple text-customPurple font-bold"
      >
        {dialogText}
      </button>
  )
}

TypeButton.propTypes = {
  onClick: PropTypes.func,
  dialogText: PropTypes.string
}
