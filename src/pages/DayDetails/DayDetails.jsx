import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import MealCard from '../../components/MealCard/MealCard'
import NoteCard from '../../components/NoteCard/NoteCard'
import SleepCard from '../../components/SleepCard/SleepCard'

import deleteIcon from '../../assets/icons/deleteIcon.png'
import edit from '../../assets/icons/edit.png'
import save from '../../assets/icons/save.png'


import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import * as dayService from '../../services/dayService'

const DayDetails = (props) => {
  const {dayId} = useParams()
  const [day, setDay] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchDay = async () => {
      const data = await dayService.show(dayId)
      setDay(data)
    }
    fetchDay()
  }, [dayId])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  if (!day ) return <h1>loading</h1>
  
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
    if (rating <= 1) return { backgroundColor: "red" }
    if (rating <= 2) return { backgroundColor: "orange" }
    if (rating <= 3) return { backgroundColor: "yellow" }
    if (rating <= 4) return { backgroundColor: "lightgreen" }
    return { backgroundColor: "green" }
}

const editView = (
  <>
    <div className="day-info">
      <div className="date-container">
        <input
          className="date-input-1"
          type='date'
          name='date'
          id='date-input'
          value={day.date}
          onChange={handleEdit}
        />
        <button className="button-save" onClick={handleSave}><img src={save} height='25px'/></button>
      </div>
      <h2>
        Day Rating: 
        <input 
          className="rating-input-details"
          type="number" 
          name="rating"
          min={1}
          max={5}
          value={day.rating}
          onChange={handleEdit}
        />
      </h2>
    </div>
  </>
)

const saveView = (
  <>
    <div className="day-info">
        <div className="date-container">
          <h1>{formatDate(day.date)}</h1>
          <button className="button-edit" onClick={handleEdit}><img src={edit} height='25px'/></button>
        </div>
      <h2>Day Rating: {day.rating}</h2>
    </div>
  </>
)

return (
  <>
    <div className='details-container' style={getCardColor(day.rating)}>
      {editMode ?  editView : saveView}
      <SleepCard day={day}/>
      <MealCard day={day}/>
      <ExerciseCard day={day}/>
      <NoteCard day={day}/>
      <button className="button-delete" onClick={() => props.handleDeleteDay(dayId)}><img src={deleteIcon} height='30px' /></button>
    </div>
  </>
)
}

export default DayDetails