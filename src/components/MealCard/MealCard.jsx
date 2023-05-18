import { useState } from "react"

import edit from "../../assets/icons/edit.png"
import save from "../../assets/icons/save.png"

import * as dayService from "../../services/dayService"

// CSS
import styles from './MealCard.module.css'

const MealCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)
  const [mealData, setMealData] = useState({
    waterIntake: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  })

  const { waterIntake, breakfast, lunch, dinner, snacks, } = day.meal[0];

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setMealData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  const handleEdit = () => {
    setEditMode(true)
    setMealData({
      waterIntake,
      breakfast,
      lunch,
      dinner,
      snacks
    })
  }

  const handleSave = async () => {
    const updatedDay = {...day}
    updatedDay.meal[0] = mealData
    try {
      await dayService.update(day)
      setEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  if (!day ) return <h1>loading</h1>
  
  const editView = (
    <>
      <div className={styles.formHeadings}>
        <h2>Meals</h2>
        <button className={styles.buttonSave} onClick={() => handleSave()}>
          <img src={save} height='25px'/>
        </button>
      </div>
      <div className={styles.mealContainer}>
        <h4>Water Intake: </h4>
        <textarea 
          name="waterIntake" 
          value={mealData.waterIntake}
          onChange={handleChange}
        />
      </div>
      <div className={styles.mealContainer}>
        <h4>Breakfast: </h4>
        <textarea 
          name="breakfast" 
          value={mealData.breakfast}
          onChange={handleChange}
        />
      </div>
      <div className={styles.mealContainer}>
        <h4>Lunch: </h4>
        <textarea 
          name="lunch" 
          value={mealData.lunch}
          onChange={handleChange}
        />
      </div>
      <div className={styles.mealContainer}>
        <h4>Dinner: </h4>
        <textarea 
          name="dinner" 
          value={mealData.dinner}
          onChange={handleChange}
        />
      </div>
      <div className={styles.mealContainer}>
        <h4>Snacks: </h4>
        <textarea 
          name="snacks" 
          value={mealData.snacks}
          onChange={handleChange}
        />
      </div>
    </>
  )
  
  const saveView = (
    <>
      <div className={styles.formHeadings}>
        <h2>Meals</h2>
          <button className={styles.buttonEdit} onClick={() => handleEdit()}><img src={edit} height='25px'/></button>
      </div>
      <div className={styles.mealContainer}>
        <h4>Water Intake: </h4>
        <p>{waterIntake}</p>
      </div>
      <div className={styles.mealContainer}>
        <h4>Breakfast: </h4>
        <p>{breakfast}</p>
      </div>
      <div className={styles.mealContainer}>
        <h4>Lunch: </h4>
        <p>{lunch}</p>
      </div>
      <div className={styles.mealContainer}>
        <h4>Dinner: </h4>
        <p>{dinner}</p>
      </div>
      <div className={styles.mealContainer}>
        <h4>Snacks: </h4>
        <p>{snacks}</p>
      </div>
    </>
  )

  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}

export default MealCard