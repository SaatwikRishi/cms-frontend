import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
export default function CustomButton ({ children, className, onClick }) {
  return (
    <button
    data-testid="custom-button"

    onClick={onClick}
    className= {classNames(
      className,
      'w-inherit text-white bg-gradient-to-r from-violet-400 to-violet-500 py-2 rounded-lg text-center'
    )} >
      {children}
    </button>
  )
}

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
}
