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
        waterIntake: evt.target.value,
        breakfast: evt.target.value,
        lunch: evt.target.value,
        dinner: evt.target.value,
        snacks: evt.target.value
      },
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddDay(dayFormData)
  }
  

  return (
    <main>
      <h1>Create Day</h1>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor='date-input'>Date</label>
        <input
          required
          type='date'
          name='date'
          id='date-input'
          value={dayFormData.date}
          onChange={handleDayChange}
        />
        <label htmlFor='rating-input'>Rating</label>
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
        <label htmlFor='sleep-input'>Hours of Sleep:</label>
        <input
          type='number'
          name='totalSleep'
          id='sleep-input'
          value={dayFormData.sleep.totalSleep}
          onChange={handleSleepChange}
        />
        <label htmlFor='meal-input'>Water Intake:</label>
        <input
          type='text'
          name='waterIntake'
          id='meal-input'
          value={dayFormData.meal.waterIntake}
          onChange={handleMealChange}
        />
        <button type='submit'>Submit</button>
      </form>
      {console.log(dayFormData)}
    </main>
  )
}

export default NewDay