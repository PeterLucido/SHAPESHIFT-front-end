import { useState } from "react"
import { update } from "../../services/dayService"

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
    console.log(mealData)
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
      await update(day)
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
          <button className="button-save" onClick={() => handleSave()}></button>
      </div>
  
      <div className="meal-container">
        <h4>Water Intake:</h4>
        <textarea 
          name="water" 
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
          <button className="button-edit" onClick={() => handleEdit()}></button>
      </div>
      <div className="meal-container">
        <h4>Water Intake: </h4>
        <p>{mealData.waterIntake}</p>
      </div>
      <div className="meal-container">
        <h4>Breakfast: </h4>
        <p>{mealData.breakfast}</p>
      </div>
      <div className="meal-container">
        <h4>Lunch: </h4>
        <p>{mealData.lunch}</p>
      </div>
      <div className="meal-container">
        <h4>Dinner: </h4>
        <p>{mealData.dinner}</p>
      </div>
      <div className="meal-container">
        <h4>Snacks: </h4>
        <p>{mealData.snacks}</p>
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