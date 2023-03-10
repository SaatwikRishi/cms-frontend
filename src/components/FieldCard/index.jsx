import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { makeRequest } from '../../utils/makeRequest'
import DialogBox from '../DialogBox'
import { DELETE_FIELD, EDIT_FIELD } from '../../utils/constants'
import classNames from 'classnames'
import { DataContext } from '../../context/DataContext'

export default function FieldCard ({ field }) {
  const [fieldName, setFieldName] = React.useState(field.name)
  const [isDeleted, setDeleted] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { enableSnackBar } = useContext(DataContext)

  const handleFieldDelete = () => {
    makeRequest(DELETE_FIELD(field.id)).then((response) => {
      setDeleted(true)
    }).catch((error) => {
      enableSnackBar(error.message)
    })
  }

  const handleFieldEdit = async (contentInput) => {
    try {
      if (contentInput.length === 0) return
      const response = await makeRequest(EDIT_FIELD(field.id, contentInput))
      setFieldName(response.data.name)
      setDialogOpen(false)
    } catch (error) {
      enableSnackBar(error.message)
    }
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
          <FontAwesomeIcon
          data-testid='edit-field'
          onClick={() => setDialogOpen(true)} icon={faPen} />
          <FontAwesomeIcon
          data-testid = 'delete-field'
          icon={faTrash} onClick={handleFieldDelete} />
        </div>
      </div>
    </>
  )
}

FieldCard.propTypes = {
  field: PropTypes.object
}
