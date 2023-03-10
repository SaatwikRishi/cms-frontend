import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataContext'
import {
  DELETE_ENTRY,
  ERROR_ROUTE,
  GET_ENTRIES,
  GET_FIELDS
} from '../../utils/constants'
import { makeRequest } from '../../utils/makeRequest'
import FieldEntryBox from '../FieldEntryBox'
import PropTypes from 'prop-types'

import { updateEntries } from './entryFunctions'
import EntryBox from '../EntryCard'
export default function Entries ({ currentCollection }) {
  const [entries, setEntries] = React.useState([])
  const [fields, setFields] = React.useState({})
  const [newEntryBox, setNewEntryBox] = React.useState(false)
  const [editOptions, setEditOptions] = React.useState({
    isEdit: false,
    entry: {}
  })

  const { collections } = useContext(DataContext)

  const collectionName =
    collections.length > 0
      ? collections.filter(
        (collection) => collection.id === currentCollection
      )[0].name
      : 'NULL'

  const deleteEntry = async (id) => {
    makeRequest(DELETE_ENTRY(id)).then((e) => {
      const newData = updateEntries('delete', id, entries)
      setEntries(newData)
    })
  }
  const updatEntry = (type, data) => {
    const newData = updateEntries(type, data, entries)
    setEntries(newData)
  }

  const fetchFields = async () => {
    const data = await makeRequest(GET_FIELDS(currentCollection))
    setFields(data.data)
  }
  const fetchEntries = async () => {
    const data = await makeRequest(GET_ENTRIES(currentCollection))
    setEntries(data.data)
  }
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    Promise.all([fetchEntries(), fetchFields()])
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        navigate(ERROR_ROUTE + '/' + 'Something went wrong')
      })
  }, [currentCollection])
  if (loading) return <div>loading</div>

  const fieldEntries = Object.entries(fields)

  return (
    <div className="flex flex-col h-screen w-screen bg-blue-100">
      <div className="h-[8%] px-[3%] flex items-center bg-white font-bold text-2xl">
        {collectionName}
      </div>
      <div className="px-[3%] mt-10 grow">
        <div>
          <div className="flex justify-between font-bold text-3xl mb-10">
            <h1>{entries.length} Entries Found</h1>
            <button
              onClick={() => {
                setEditOptions({ isEdit: false, entry: {} })
                setNewEntryBox(true)
              }}
              className="text-2xl text-violet-500"
            >
              Add a new Entry
            </button>
          </div>
          {entries.length > 0 && (
            <div className="flex">
              <h1 className="w-[50px] h-full text-center">ID</h1>
              <div className="flex grow overflow-scroll">
                {fieldEntries.map((field) => {
                  return (
                    <h1
                      key={Math.random()}
                      className=" mb-2 w-[200px] text-center"
                    >
                      {field[1].name}
                    </h1>
                  )
                })}
              </div>

              <div className="w-[10%] justify-center flex ">Actions</div>
            </div>
          )}
          {entries
            .sort((a, b) => a.id - b.id)
            .map((entry, index) => (
              <EntryBox
                key={index}
                deleteEntry={deleteEntry}
                entry={entry}
                index={index}
                fieldEntries={fieldEntries}
                setEditOptions={setEditOptions}
                setNewEntryBox={setNewEntryBox}
              />
            ))}
        </div>
      </div>
      {newEntryBox && (
        <FieldEntryBox
          id={currentCollection}
          setFieldBox={setNewEntryBox}
          updateEntries={updatEntry}

          fields={fields}
          editOptions={editOptions}
        />
      )}
    </div>
  )
}

Entries.propTypes = {
  currentCollection: PropTypes.number
}
