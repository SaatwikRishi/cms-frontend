import React, { useContext, useEffect, useRef } from 'react'
import TypeButton from '../TypeButton'
import PropTypes from 'prop-types'
import FieldCard from '../FieldCard'
import { DataContext } from '../../context/DataContext'
import DialogBox from '../DialogBox'
import {
  ADD_FIELD,
  ERROR_ROUTE,
  GET_FIELDS,
  MODIFY_COLLECTION
} from '../../utils/constants'
import { makeRequest } from '../../utils/makeRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import screenText from '../../screenText'

export default function ContentFields ({ id }) {
  const { collections, setCollections, enableSnackBar } =
    useContext(DataContext)
  const currentCollection = collections.find((e) => e.id === id)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [fields, setFields] = React.useState([])
  const dialogChild = useRef('new')
  const navigate = useNavigate()
  const handleDialogSuccess = async (contentInput) => {
    try {
      if (contentInput.length > 0) {
        if (dialogChild.current === 'new') {
          const data = await makeRequest(ADD_FIELD(id, contentInput))
          setFields([...fields, data.data])
        } else {
          const data = await makeRequest(MODIFY_COLLECTION(id, contentInput))
          setCollections([
            ...collections.filter((collection) => collection.id !== id),
            data.data
          ])
        }
        setDialogOpen(false)
      }
    } catch (error) {
      enableSnackBar(error.message)
    }
  }

  useEffect(() => {
    makeRequest(GET_FIELDS(id))
      .then((data) => {
        setFields(data.data)
      })
      .catch(() => {
        navigate(ERROR_ROUTE)
      })
  }, [id])

  return (
    <div className="w-[70%] h-full overflow-scroll">
      <DialogBox
        open={dialogOpen}
        setDialogOpen={setDialogOpen}
        onSuccessClick={handleDialogSuccess}
        title={
          dialogChild.current === 'new'
            ? 'Create a new content field'
            : 'Modify Collection Name'
        }
        key={dialogChild.current}
        label={dialogChild.current === 'new' ? 'Field Name' : 'Collection Name'}
        buttonText={dialogChild.current === 'new' ? 'Create' : 'Modify'}
      />

      <div className="bg-loginLight h-full px-[4%] flex flex-col  ">
        <div className="flex items-center mt-10  gap-x-4">
          <h2 className="font-bold text-3xl ">{currentCollection.name}</h2>
          <FontAwesomeIcon
            data-testid="edit-collection"
            icon={faEdit}
            size="lg"
            onClick={() => {
              dialogChild.current = 'modify'
              setDialogOpen(true)
            }}
          />
        </div>
        <h2 className="text-xl mb-5">
          {fields.length} {screenText.contentFields.fields}
        </h2>
        <TypeButton
          onClick={() => {
            dialogChild.current = 'new'
            setDialogOpen(true)
          }}
          dialogText={'Add another field'}
        />
        {fields.map((field, i) => (
          <FieldCard key={i} field={field} />
        ))}
      </div>
    </div>
  )
}

ContentFields.propTypes = {
  id: PropTypes.number
}
