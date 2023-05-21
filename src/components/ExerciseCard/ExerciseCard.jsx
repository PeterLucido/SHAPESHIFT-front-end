import { useState } from 'react'

import * as dayService from '../../services/dayService'

import edit from '../../assets/icons/edit.png'
import save from '../../assets/icons/save.png'

import styles from './ExerciseCard.module.css'

const ExerciseCard = ({ day }) => {
  const [editMode, setEditMode] = useState(false)
  const [exerciseData, setExerciseData] = useState({
    typeOfExercise: '',
    timeSpent: '',
  })

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setExerciseData((prevData) => ({
      ...prevData, [name]: value
    }))
  }
  
  const handleEdit = () => {
    setEditMode(true)
    setExerciseData({
      timeSpent,
      typeOfExercise,
    })
  }
  
  const handleSave = async () => {
    const updatedDay = {...day}
    updatedDay.exercise[0] = exerciseData
    try {
      await dayService.update(day)
      setEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  const { typeOfExercise, timeSpent } = day.exercise[0]

  if (!day ) return <h1>loading</h1>

  const editView = (
    <>
      <div className={styles.formHeadings}>
        <h2>Exercise</h2>
        <button className={styles.buttonSave} onClick={handleSave}>
          <img src={save} height='25px'/>
        </button>
      </div>
      <div className={styles.exerciseContainer}>
        <h4>Exercise Type: </h4>
        <textarea 
          name='typeOfExercise'
          value={exerciseData.typeOfExercise} 
          onChange={handleChange}
          autoComplete='off'
        />
      </div>
      <div className={styles.exerciseContainer}>
        <h4>Hours Spent:</h4>
        <input 
          type='number'
          name='timeSpent'
          min='0'
          max='24'
          value={exerciseData.timeSpent}
          onChange={handleChange}
        />
      </div>
    </>
  )

  const saveView = (
    <>
      <div className={styles.formHeadings}>
        <h2>Exercise</h2>
        <button className={styles.buttonEdit} onClick={handleEdit}>
          <img src={edit} height='25px'/>
        </button>
      </div>
      <div className={styles.exerciseContainer}>
        <h4>Exercise Type:</h4>
        <p>{typeOfExercise}</p>
      </div>
      <div className={styles.exerciseContainer}>
        <h4>Hours Spent:</h4>
        <p>{timeSpent}</p>
      </div>
    </>
  )

  return (
    <>
      {editMode ? editView : saveView}
    </>
  )
}
export default ExerciseCard