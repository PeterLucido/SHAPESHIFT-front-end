import { useState } from 'react'

import edit from "../../assets/icons/edit.png"
import save from "../../assets/icons/save.png"

import * as dayService from '../../services/dayService'

// CSS
import styles from './NoteCard.module.css'

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
    <div className={styles.formHeadings}>
        <h2>Notes</h2>
          <button className={styles.buttonSave} onClick={() => handleSave()}><img src={save} height='25px'/></button>
      </div>
      <div className={styles.notesInput}>
        <textarea 
          type='text'
          name='content'
          value={noteData}
          onChange={handleChange}
        />
      </div>
    </>
  )

  const saveView = (
    <>
    <div className={styles.formHeadings}>
        <h2>Notes</h2>
          <button className={styles.buttonEdit} onClick={() => handleEdit()}><img src={edit} height='25px'/></button>
      </div>
      <h4>
        <p>{day.notes[0].content}</p>
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