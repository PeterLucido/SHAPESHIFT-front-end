import { useState, useEffect } from 'react'

import * as dayService from '../../services/dayService'

import save from '../../assets/icons/save.png'

import styles from './NewDay.module.css'

const NewDay = (props) => {
  const [invalidDate, setInvalidDate] = useState([
    {date: ''}
  ])
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

  useEffect(() => {
    const fetchAllDays = async () => {
      const data = await dayService.index()
      setInvalidDate(data)
    } 
    if (props.user) fetchAllDays()
  }, [props.user])

  if (!invalidDate) return <h1>Loading...</h1>

  const slicedDates = invalidDate.map(obj => obj.date.slice(0,10))

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
    <div className={styles.container}>
      <div className={styles.addDay}>
        <h1>Create Day</h1>
        <form className={styles.addDayForm} onSubmit={handleSubmit}>
          <div>
            <div className={styles.inline}>
              <label className={styles.dateInput} htmlFor='date-input'>
                Date:
              </label>
              <input
                required
                type='date'
                name='date'
                id='date-input'
                value={dayFormData.date}
                onChange={handleDayChange}
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.dayInput} htmlFor='rating-input'>
                Rating:
              </label>
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
          </div>
          <div className={styles.inline}>
            <label className={styles.sleepInput} htmlFor='sleep-input'>
              Hours of Sleep:
            </label>
            <input
              type='number'
              name='totalSleep'
              id='sleep-input'
              default={0}
              min={0}
              max={24}
              value={dayFormData.sleep.totalSleep}
              onChange={handleSleepChange}
            />
          </div>
          <div>
            <div className={styles.inline}>
              <label className={styles.mealInput} htmlFor='water-input'>
                Water Intake:
              </label>
              <input
                type='text'
                name='waterIntake'
                id='water-input'
                value={dayFormData.meal.waterIntake}
                onChange={handleMealChange}
                autoComplete='off'
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.mealInput} htmlFor='breakfast-input'>
                Breakfast:
              </label>
              <input
                type='text'
                name='breakfast'
                id='breakfast-input'
                value={dayFormData.meal.breakfast}
                onChange={handleMealChange}
                autoComplete='off'
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.mealInput} htmlFor='lunch-input'>
                Lunch:
              </label>
              <input
                type='text'
                name='lunch'
                id='lunch-input'
                value={dayFormData.meal.lunch}
                onChange={handleMealChange}
                autoComplete='off'
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.mealInput} htmlFor='dinner-input'>
                Dinner:
              </label>
              <input
                type='text'
                name='dinner'
                id='dinner-input'
                value={dayFormData.meal.dinner}
                onChange={handleMealChange}
                autoComplete='off'
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.mealInput} htmlFor='snacks-input'>
                Snacks:
              </label>
              <input
                type='text'
                name='snacks'
                id='snacks-input'
                value={dayFormData.meal.snacks}
                onChange={handleMealChange}
                autoComplete='off'
              />
            </div>
          </div>
          <div>
            <div className={styles.inline}> 
              <label className={styles.exerciseInput} htmlFor='typeOfExercise-input'>
                Exercise:
              </label>
              <input
                type='text'
                name='typeOfExercise'
                id='typeOfExercise-input'
                value={dayFormData.exercise.typeOfExercise}
                onChange={handleExerciseChange}
                autoComplete='off'
              />
            </div>
            <div className={styles.inline}>
              <label className={styles.exerciseInput} htmlFor='timeSpent-input'>
                Time Spent:
              </label>
              <input
                type='number'
                name='timeSpent'
                id='timeSpent-input'
                default={0}
                min={0}
                max={24}
                value={dayFormData.exercise.timeSpent}
                onChange={handleExerciseChange}
              />
            </div>
          </div>
          <div className={styles.inline}>
            <label className={styles.notesInput} htmlFor='content-input'>
              Notes:
            </label>
            <input
              type='text'
              name='content'
              id='content-input'
              value={dayFormData.notes.content}
              onChange={handleNotesChange}
              autoComplete='off'
            />
          </div>
          <div className={styles.buttonSave}>
            {
              slicedDates.includes(dayFormData.date) ? 
              <p>You have already created a page for this day</p> :
              <div>
                <button className={styles.buttonAdd} type='submit'>
                  <img src={save} height='40px'/>
                  <p>ADD DAY</p>
                </button> 
              </div>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewDay