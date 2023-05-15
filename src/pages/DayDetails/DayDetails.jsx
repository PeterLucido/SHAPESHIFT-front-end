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

  useEffect(() => {
    const fetchDay = async () => {
      const data = await dayService.show(dayId)
      setDay(data)
    }
    fetchDay()
  }, [dayId])

  console.log(day)

  if (!day ) return <h1>loading</h1>

  return (
    <>
      <div className='details-container'>
        {day.date.slice(0,10)}
        <SleepCard day={day}/>
        <MealCard />
        <ExerciseCard />
        <NoteCard />
        <button onClick={() => props.handleDeleteDay(dayId)}>Delete</button>
        <h1>{day.rating}</h1>
      </div>
    </>
  )
}

export default DayDetails