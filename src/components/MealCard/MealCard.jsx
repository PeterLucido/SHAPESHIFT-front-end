import { useState } from "react"
import { update } from "../../services/dayService"

const MealCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)
  const [mealData, setMealData] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: ""
  })

  const { breakfast, lunch, dinner, snacks, } = day.meal[0]

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
      <h2>
        Meals
        <button onClick={() => handleSave()}>Save</button>
      </h2>
      <h4>
        <label htmlFor="breakfast-input">Breakfast</label>
        <textarea 
          name="breakfast" 
          id="breakfast-input" 
          value={mealData.breakfast}
          onChange={handleChange}
        >
        </textarea>
      </h4>
      <h4>
        <label htmlFor="lunch-input">Lunch</label>
        <textarea 
          name="lunch" 
          id="lunch-input" 
          value={mealData.lunch}
          onChange={handleChange}
        >
        </textarea>
      </h4>
      <h4>
        <label htmlFor="dinner-input">Dinner</label>
        <textarea 
          name="dinner" 
          id="dinner-input" 
          value={mealData.dinner}
          onChange={handleChange}
        >
        </textarea>
      </h4>
      <h4>
        <label htmlFor="snacks-input">Snacks</label>
        <textarea 
          name="snacks" 
          id="snacks-input" 
          value={mealData.snacks}
          onChange={handleChange}
        >
        </textarea>
      </h4>
    </>
  )
  const saveView = (
    <>
      <h2>
        Meals
        <button onClick={() => handleEdit()}>Edit</button>
      </h2>
      <h4>Breakfast
        <ul>
          {breakfast.split(',').map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </h4>
      <h4>Lunch
        <ul>
          {lunch.split(',').map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </h4>
      <h4>Dinner
        <ul>
          {dinner.split(',').map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </h4>
      <h4>Snack
        <ul>
          {snacks.split(',').map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </h4>
    </>
  )


  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}

export default MealCard