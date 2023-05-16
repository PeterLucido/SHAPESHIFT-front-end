import { useState } from "react"
// import * as dayService from '../../services/dayService'


const NewDay = (props) => {
  const [dayFormData, setDayFormData]= useState({
    date: new Date().toISOString().slice(0,10),
    rating: 3,
    owner: props.user._id,
    sleep: {totalSleep: 0},
    meal: {
      waterIntake: '',
      breakfast: '',
      lunch: '',
      dinner: '',
      snacks: ''
    },
    exercise: {
      timeSpent: 0,
      typeOfExercise: ''
    },
    notes: {
      content: ''
    }
  })

  const handleDayChange = (evt) => {
    setDayFormData({
      ...dayFormData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSleepChange = (evt) => {
    setDayFormData({
      ...dayFormData,
      sleep: { totalSleep: parseInt(evt.target.value) },
    })
  }

  const handleMealChange = (evt) => {
    setDayFormData({
      ...dayFormData,
      meal: {
        ...dayFormData.meal, [evt.target.name]: evt.target.value,
      },
    })
  }

  const handleExerciseChange = (evt) => {
    setDayFormData({
      ...dayFormData,
      exercise: {
        ...dayFormData.exercise, [evt.target.name]: evt.target.value,
      }
    })
  }

  const handleNotesChange = (evt) => {
    setDayFormData({
      ...dayFormData,
      notes: {
        ...dayFormData.notes, [evt.target.name]: evt.target.value,
      }
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddDay(dayFormData)
  }
  

  return (
    <main>
      <h1>Create Day</h1>
      
      <form className='add-day-form' onSubmit={handleSubmit}>
        <div>
          <label className="day-input" htmlFor='date-input'>Date</label>
          <input
            required
            type='date'
            name='date'
            id='date-input'
            value={dayFormData.date}
            onChange={handleDayChange}
          />
          <label className="day-input" htmlFor='rating-input'>Rating</label>
          <select
            name='rating'
            id='rating-input'
            value={dayFormData.rating}
            onChange={handleDayChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label className="sleep-input" htmlFor='sleep-input'>Hours of Sleep:</label>
          <input
            type='number'
            name='totalSleep'
            id='sleep-input'
            value={dayFormData.sleep.totalSleep}
            onChange={handleSleepChange}
          />
        </div>
        <div>
          <label className="meal-input" htmlFor='water-input'>Water Intake:</label>
          <input
            type='text'
            name='waterIntake'
            id='water-input'
            value={dayFormData.meal.waterIntake}
            onChange={handleMealChange}
          />
          <label className="meal-input" htmlFor='breakfast-input'>Breakfast:</label>
          <input
            type='text'
            name='breakfast'
            id='breakfast-input'
            value={dayFormData.meal.breakfast}
            onChange={handleMealChange}
          />
          <label className="meal-input" htmlFor='lunch-input'>Lunch:</label>
          <input
            type='text'
            name='lunch'
            id='lunch-input'
            value={dayFormData.meal.lunch}
            onChange={handleMealChange}
          />
          <label className="meal-input" htmlFor='dinner-input'>Dinner:</label>
          <input
            type='text'
            name='dinner'
            id='dinner-input'
            value={dayFormData.meal.dinner}
            onChange={handleMealChange}
          />
          <label className="meal-input" htmlFor='snacks-input'>Snacks:</label>
          <input
            type='text'
            name='snacks'
            id='snacks-input'
            value={dayFormData.meal.snacks}
            onChange={handleMealChange}
          />
        </div>
        <div>
          <label className="exercise-input" htmlFor='typeOfExercise-input'>Exercise:</label>
          <input
            type='text'
            name='typeOfExercise'
            id='typeOfExercise-input'
            value={dayFormData.exercise.typeOfExercise}
            onChange={handleExerciseChange}
          />
          <label className="exercise-input" htmlFor='timeSpent-input'>Time Spent:</label>
          <input
            type='number'
            name='timeSpent'
            id='timeSpent-input'
            value={dayFormData.exercise.timeSpent}
            onChange={handleExerciseChange}
          />
        </div>
        <div>
          <label className="notes-input" htmlFor='content-input'>Notes:</label>
          <input
            type='text'
            name='content'
            id='content-input'
            value={dayFormData.notes.content}
            onChange={handleNotesChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      {console.log(dayFormData)}
    </main>
  )
}

export default NewDay