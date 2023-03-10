import React, { useContext } from 'react'
import CustomButton from '../CustomButton'
import CustomInput from '../CustomInput'
import PropTypes from 'prop-types'
import { makeRequest } from '../../utils/makeRequest'
import { ADD_ENTRY, MODIFY_ENTRY } from '../../utils/constants'
import { DataContext } from '../../context/DataContext'
import screenText from '../../screenText'

export default function FieldEntryBox ({
  id,
  fields,
  editOptions,
  updateEntries,
  setFieldBox
}) {
  const { enableSnackBar } = useContext(DataContext)
  const handleEntryBox = async () => {
    try {
      if (editOptions.isEdit) {
        await makeRequest(MODIFY_ENTRY(editOptions.entry.id, values))
        updateEntries('modify', { id: editOptions.entry.id, json: values })
      } else {
        const response = await makeRequest(ADD_ENTRY(id, values))
        updateEntries('add', response.data)
      }
      setFieldBox(false)
    } catch (error) {
      enableSnackBar(error.message)
    }
  }

  const currentFields = {}
  fields.forEach((e) => {
    currentFields[e.name] = editOptions.isEdit
      ? editOptions.entry.json[e.name]
      : ''
  })

  const [values, setValues] = React.useState(currentFields)

  return (
    <div className="right-0 absolute h-screen shadow-lg bg-loginLight">
      <div className="w-[40%] h-[90%] flex flex-col gap-y-5 min-w-[600px] px-16 overflow-scroll py-10 shadow-2xl">
        <h1 className="text-3xl pb-10 font-bold">{screenText.contentEntries.addNewEntry}</h1>

        {fields.map((field, index) => (
          <CustomInput
            key={index}
            label={field.name}
            value={values[field.name]}
            onChange={(e) => {
              if (!values[field.name]) {
                setValues({ ...values, [field.name]: '' })
              }
              setValues({ ...values, [field.name]: e.target.value })
            }}
          />
        ))}
      </div>
      <div className="border-t-1 flex justify-end items-center px-10 gap-x-20 border-gray-300 bg-white shadow-2xl w-[40%] min-w-[600px] h-[10%]">
        <button onClick={() => setFieldBox(false)}>{screenText.buttons.cancelButton}</button>
        <CustomButton onClick={handleEntryBox} className="px-16 h-[50%]">
          {editOptions.isEdit ? screenText.buttons.modifyButton : screenText.buttons.addButton}
        </CustomButton>
      </div>
    </div>
  )
}

FieldEntryBox.propTypes = {
  fields: PropTypes.array,
  editOptions: PropTypes.object,
  id: PropTypes.number,
  updateEntries: PropTypes.func,
  setFieldBox: PropTypes.func
}
