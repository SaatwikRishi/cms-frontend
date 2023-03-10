import React from 'react'
import CustomButton from '../CustomButton'

import PropTypes from 'prop-types'
import CustomInput from '../CustomInput'

export default function DialogBox ({ open, title, label, onSuccessClick, setDialogOpen, buttonText }) {
  const [contentInput, setContentInput] = React.useState('')
  if (!open) return <></>
  return (
    <dialog className=" rounded-lg p-10 bg-white absolute my-[10%] flex flex-col justify-item z-10">
           <>
          <h1 className="font-bold text-xl mb-10">
          {title ?? 'Create a new content type'}
          </h1>
          <CustomInput
            onChange={(e) =>
              e.target.value.length > 0 && setContentInput(e.target.value)
            }
            value={contentInput}
            label={label ?? 'Name of the content type'}
            className="min-w-[300px]"
          />
        </>
      <div className='flex justify-end gap-x-4 mt-10'>
        <button onClick={() => {
          setDialogOpen(false)
        }} >Cancel</button>
        <CustomButton className='px-[10%]' onClick={() => onSuccessClick(contentInput)} >{buttonText ?? 'Create'}</CustomButton>
      </div>
    </dialog>
  )
}
DialogBox.propTypes = {
  open: PropTypes.bool,
  onSuccessClick: PropTypes.func,
  setDialogOpen: PropTypes.func,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string
}
