import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import MealCard from '../../components/MealCard/MealCard'
import NoteCard from '../../components/NoteCard/NoteCard'
import SleepCard from '../../components/SleepCard/SleepCard'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

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

  const editView = (
    <>
      <input
        type='date'
        name='date'
        id='date-input'
        value={day.date}
        onChange={handleEdit}
        placeholder='dick'
      />
      <h4>
        <input 
          type="number" 
          name="rating"
          min={1}
          max={5}
          value={day.rating}
          onChange={handleEdit}
        /> 
      </h4>
      <button onClick={handleSave}>save</button>
    </>
  )
  const saveView = (
    <>
      <h3>{formatDate(day.date)}</h3>
      <h3>Day Rating: {day.rating}</h3>
      <button onClick={handleEdit}>Edit</button>
    </>
  )

  return (
    <>
      <div className='details-container'>
        {editMode ?  editView : saveView}
        <SleepCard day={day}/>
        <MealCard day={day}/>
        <ExerciseCard day={day}/>
        <NoteCard day={day}/>
        <button onClick={() => props.handleDeleteDay(dayId)}>Delete</button>
      </div>
    </>
  )
}

export default DayDetails