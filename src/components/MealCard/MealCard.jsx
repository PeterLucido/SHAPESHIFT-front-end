import { useState } from "react"

import edit from "../../assets/icons/edit.png"
import save from "../../assets/icons/save.png"

import * as dayService from "../../services/dayService"

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
    } catch (error) {
      console.log(error)
    }
  }

  if (!day ) return <h1>loading</h1>
  
  const editView = (
    <>
      <div className="form-headings">
        <h2>Meals</h2>
          <button className="button-save" onClick={() => handleSave()}><img src={save} height='25px'/></button>
      </div>
  
      <div className="meal-container">
        <h4>Water Intake: </h4>
        <textarea 
          name="waterIntake" 
          id="water-input" 
          value={mealData.waterIntake}
          onChange={handleChange}
        />
      </div>
      <div className="meal-container">
        <h4>Breakfast: </h4>
        <textarea 
          name="breakfast" 
          id="breakfast-input" 
          value={mealData.breakfast}
          onChange={handleChange}
        />
      </div>
      <div className="meal-container">
        <h4>Lunch: </h4>
        <textarea 
          name="lunch" 
          id="lunch-input" 
          value={mealData.lunch}
          onChange={handleChange}
        />
      </div>
      <div className="meal-container">
        <h4>Dinner: </h4>
        <textarea 
          name="dinner" 
          id="dinner-input" 
          value={mealData.dinner}
          onChange={handleChange}
        />
      </div>
      <div className="meal-container">
        <h4>Snacks: </h4>
        <textarea 
          name="snacks" 
          id="snacks-input" 
          value={mealData.snacks}
          onChange={handleChange}
        />
      </div>
    </>
  )
  
  const saveView = (
    <>
      <div className="form-headings">
        <h2>Meals</h2>
          <button className="button-edit" onClick={() => handleEdit()}><img src={edit} height='25px'/></button>
      </div>
      <div className="meal-container">
        <h4>Water Intake: </h4>
        <p>{waterIntake}</p>
      </div>
      <div className="meal-container">
        <h4>Breakfast: </h4>
        <p>{breakfast}</p>
      </div>
      <div className="meal-container">
        <h4>Lunch: </h4>
        <p>{lunch}</p>
      </div>
      <div className="meal-container">
        <h4>Dinner: </h4>
        <p>{dinner}</p>
      </div>
      <div className="meal-container">
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