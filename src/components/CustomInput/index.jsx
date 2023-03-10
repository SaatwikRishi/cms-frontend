import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
export default function CustomInput ({ label, onChange, className, value }) {
  return (
    <div className="w-[100%] flex-col flex">
      <label className={classNames(className)} >{label}</label>
      <input onChange={onChange} value={value} className="px-2 rounded-lg w-[inherit]  border-2 border-blue-400 h-10" />
    </div>
  )
}
CustomInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string
}
