import { useState } from 'react'

import * as dayService from '../../services/dayService'

const NoteCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)
  const [noteData, setNoteData] = useState("")

  const handleChange = (evt) => {
    const updatedNote = evt.target.value
    setNoteData(updatedNote)
  }

  const handleEdit = () => {
    setEditMode(true)
    setNoteData(day.notes[0].content)
  }

  const handleSave = async () => {
    const updatedDay = {...day}
    updatedDay.notes[0].content = noteData
    try {
      await dayService.update(updatedDay)
      setEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }
  
  if (!day) return <h1>loading</h1>

  const editView = (
    <>
      <h4>
        Notes:
        <button onClick={()=>handleSave()}>Save</button>
        <input
          type='text'
          name='content'
          value={noteData}
          onChange={handleChange}
        />
      </h4>
    </>
  )

  const saveView = (
    <>
      <h4>
        Additional Notes:
        <p>{day.notes[0].content}</p>
        <button onClick={()=>handleEdit()}>Edit</button>
      </h4>
    </>
  )
  
  return (
    <>
      {editMode ? editView : saveView}
    </>
  )
}

export default NoteCard