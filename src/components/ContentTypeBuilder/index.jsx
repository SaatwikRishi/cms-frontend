import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { ADD_COLLECTION } from '../../utils/constants'
import { makeRequest } from '../../utils/makeRequest'
import ContentFields from '../ContentFields'
import DialogBox from '../DialogBox'
import TypeButton from '../TypeButton'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function ContentTypeBuilder () {
  const { collections, setCollections, enableSnackBar } = useContext(DataContext)
  const [dialogOpem, setDialogOpen] = React.useState(false)
  const [currentContentType, setCurrentContentType] = React.useState(null)

  const handleNewContentType = (contentInput) => {
    try {
      if (contentInput.length > 0) {
        makeRequest(ADD_COLLECTION(contentInput)).then((data) => {
          setCollections([...collections, data.data])
          setDialogOpen(false)
        }).catch((error) => {
          enableSnackBar(error.message)
        })
      }
    } catch (error) {

    }
  }

  return (
    <>
      <DialogBox
        label={'Name of the content type'}
        title={'Create a new content type'}
        open={dialogOpem}
        setDialogOpen={setDialogOpen}
        onSuccessClick={handleNewContentType}
      />

      <div className="w-full h-screen flex flex-col">
        <div className="flex h-[8%] px-[3%] items-center ">
          <p className="font-bold text-2xl">Content Types</p>
        </div>
        <div className="flex h-[92%]">
          {/* CONTENT TYPE INFO */}
          <div className="w-[30%] px-[3%] bg-customGrey h-full">
            <span className="flex items-center justify-between my-[10%]">
              <p>{collections.length} types</p>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <TypeButton
              dialogText={'+ New Type'}
              onClick={() => setDialogOpen(true)}
            />
            {collections.map((collection, i) => (
              <button
                onClick={() => {
                  setCurrentContentType(collection.id)
                }}
                key={i}
                className={classNames(
                  currentContentType === collection.id
                    ? 'bg-customPurple text-white'
                    : ' text-black bg-white',

                  'my-2 rounded-lg py-4 bg-red w-full flex justify-between px-4 font-bold shadow-xl'
                )}
              >
                <p>{collection.name}</p>
                <p>{collection.count ?? 0}</p>
              </button>
            ))}
          </div>
          {currentContentType && <ContentFields id={currentContentType} />}
        </div>
      </div>
    </>
  )
}
