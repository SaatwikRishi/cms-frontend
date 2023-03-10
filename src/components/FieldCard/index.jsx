import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { makeRequest } from '../../utils/makeRequest'
import DialogBox from '../DialogBox'
import { DELETE_FIELD, EDIT_FIELD } from '../../utils/constants'
import classNames from 'classnames'

export default function FieldCard ({ field }) {
  const [fieldName, setFieldName] = React.useState(field.name)
  const [isDeleted, setDeleted] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleFieldDelete = () => {
    makeRequest(DELETE_FIELD(field.id)).then((response) => {
      setDeleted(true)
    })
  }

  const handleFieldEdit = (contentInput) => {
    if (contentInput.length === 0) return
    makeRequest(EDIT_FIELD(field.id, contentInput)).then((response) => {
      setFieldName(response.data.name)
    })
  }
  if (isDeleted) return <></>

  return (
    <>
      <DialogBox open={dialogOpen}
      buttonText={'Edit'}
        title={'Edit Field'}
        label={'Field Name'}

      onSuccessClick={
        handleFieldEdit
      }
      setDialogOpen={setDialogOpen} />

      <div className={classNames(
        'w-full h-14 shadow-md my-2 flex  bg-white rounded-lg')}>
        <span className="w-[6%] rounded-l-lg  text-white bg-blue-400 flex justify-center items-center">
          Ab
        </span>
        <div className="w-[44%] flex justify-between px-[2%] items-center ">
          <p>{fieldName}</p>
          <p className="text-gray-500">{'Text'}</p>
        </div>
        <div className=" flex gap-x-5 grow justify-end px-[4%] items-center">
          <FontAwesomeIcon onClick={() => setDialogOpen(true)} icon={faPen} />
          <FontAwesomeIcon icon={faTrash} onClick={handleFieldDelete} />
        </div>
      </div>
    </>
  )
}

FieldCard.propTypes = {
  field: PropTypes.object
}
