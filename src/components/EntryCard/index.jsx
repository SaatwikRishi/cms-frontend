import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import PropTypes from 'prop-types'

export default function EntryBox ({ entry, deleteEntry, index, fieldEntries, setNewEntryBox, setEditOptions }) {
  return <div
    className="rounded-lg w-full h-14 flex mb-4 bg-white"
  >
    <div className="w-[50px] h-full flex items-center justify-center">
      {index + 1}
    </div>
    <div className="grow  items-center flex">
      {fieldEntries.map((fieldEntry, index) => (
        <h1 className="w-[200px] text-center" key={Math.random()}>
          {entry.json[fieldEntry[1].name]}
        </h1>
      ))}
    </div>
    <div className="flex justify-center items-center w-[10%] gap-x-5 overflow-scroll">
      <FontAwesomeIcon
      icon={faEdit}
      onClick={() => {
        setEditOptions({
          isEdit: true,
          entry
        })
        setNewEntryBox(true)
      }} />
      <FontAwesomeIcon icon={faTrash} onClick={() => {
        deleteEntry(entry.id)
      }} />
    </div>
  </div>
}

EntryBox.propTypes = {
  entry: PropTypes.object,
  deleteEntry: PropTypes.func,
  index: PropTypes.number,
  fieldEntries: PropTypes.array,
  setNewEntryBox: PropTypes.func,
  setEditOptions: PropTypes.func
}
