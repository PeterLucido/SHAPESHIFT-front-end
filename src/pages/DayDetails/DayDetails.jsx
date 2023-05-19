import { useState, useEffect, } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import * as dayService from '../../services/dayService'

import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import MealCard from '../../components/MealCard/MealCard'
import NoteCard from '../../components/NoteCard/NoteCard'
import SleepCard from '../../components/SleepCard/SleepCard'

import deleteIcon from '../../assets/icons/deleteIcon.png'
import edit from '../../assets/icons/edit.png'
import save from '../../assets/icons/save.png'

import styles from './DayDetails.module.css'

const DayDetails = ({user, handleDeleteDay}) => {
  const [day, setDay] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [invalidDate, setInvalidDate] = useState([
    {date: ''}
  ])
  
  const {dayId} = useParams()
  const navigate =useNavigate()

  useEffect(() => {
    const fetchAllDays = async () => {
      const data = await dayService.index()
      setInvalidDate(data)
    } 
    if (user) fetchAllDays()
  }, [user])

  useEffect(() => {
    const fetchDay = async () => {
      const data = await dayService.show(dayId)
      setDay(data)
    }
    fetchDay()
  }, [dayId])

  const slicedDates = invalidDate.map(obj => obj.date.slice(0,10))

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  if (!day) return <h1>loading</h1>
  if (user.profile !== day.owner._id) navigate('/days')

  const handleEdit = (evt) => {
    const {name, value} = evt.target
    setDay({
      ...day,
      [name]: value
    })
    setEditMode(true)
  }
  
  const handleSave = async() => {
    await dayService.update(day)
    setEditMode(false)
  }

  const getCardColor = (rating) => {
    if (rating <= 1) {
      return { backgroundColor: '#F15F61' }
    } else if (rating <= 2) {
      return { backgroundColor: '#F89C49' }
    } else if (rating <= 3) {
      return { backgroundColor: '#FBF17D' }
    } else if (rating <= 4) {
      return { backgroundColor: '#9DD089' }
    } else {
      return { backgroundColor: '#4F8C4F' }
    }
  }

  const editView = (
    <div className={styles.dayInfo}>
      <div className={styles.dateContainer}>
        <input
          className={styles.dateInput1}
          type='date'
          name='date'
          id='date-input'
          value={day.date.slice(0,10)}
          onChange={handleEdit}
        />
        {
          slicedDates.includes(day.date) ?
          '' :
          <button className={styles.buttonSave} onClick={handleSave}>
            <img src={save} height='25px'/>
          </button>
        }
      </div>
      <h2>
        Day Rating: 
        <input 
          className={styles.ratingInputDetails}
          type='number'
          name='rating'
          min={1}
          max={5}
          value={day.rating}
          onChange={handleEdit}
        />
      </h2>
    </div>
  )

  const saveView = (
    <div className={styles.dayInfo}>
        <div className={styles.dateContainer}>
          <h1>{formatDate(day.date)}</h1>
          <button className={styles.buttonEdit} onClick={handleEdit}>
            <img src={edit} height='25px'/>
          </button>
        </div>
      <h2>Day Rating: {day.rating}</h2>
    </div>
  )

  return (
    <div className={styles.detailsContainer} style={getCardColor(day.rating)}>
      {editMode ?  editView : saveView}
      <SleepCard day={day}/>
      <MealCard day={day}/>
      <ExerciseCard day={day}/>
      <NoteCard day={day}/>
      <button className={styles.buttonDelete} onClick={() => handleDeleteDay(dayId)}>
        <img src={deleteIcon} height='30px'/>
      </button>
    </div>
  )
}

export default DayDetails