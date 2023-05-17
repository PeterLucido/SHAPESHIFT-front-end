import { useState } from "react"
import * as dayService from "../../services/dayService"

const ExerciseCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)
  const [exerciseData, setExerciseData] = useState({
    typeOfExercise: '',
    timeSpent: '',
  })

  const handleChange = (evt) => {
    const {name, value} = evt.target
    setExerciseData((prevData) => ({
      ...prevData, [name]: value
    }))
  }
  
  const handleEdit = () => {
    setEditMode(true)
    setExerciseData({
      timeSpent,
      typeOfExercise,
    })
  }
  
  const handleSave = async () => {
    const updatedDay = {...day}
    updatedDay.exercise[0] = exerciseData
    try {
      await dayService.update(day)
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  const { typeOfExercise, timeSpent } = day.exercise[0]

  if (!day ) return <h1>loading</h1>

  const editView = (
    <>
      <div className="form-headings">
        <h2>Exercise</h2>
          <button className="button-save" onClick={() => handleSave()}></button>
      </div>
      <h2>
        <label htmlFor="typeOfExercise-input">Exercises: </label>
        <textarea 
        name="typeOfExercise" 
        id="typeOfExercise-input" 
        value={exerciseData.typeOfExercise} 
        onChange={handleChange}
        />
        <input 
        type="number" 
        name="timeSpent"
        value={exerciseData.timeSpent}
        onChange={handleChange}
        />
      </h2>
    </>
  )

  const saveView = (
    <>
    <div className="form-headings">
        <h2>Exercise</h2>
          <button className="button-edit" onClick={() => handleEdit()}></button>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Type of Exercise:</td>
            <td>
              <ul>
                {typeOfExercise.split(",").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Time Spent:</td>
            <td>{timeSpent}</td>
          </tr>
        </tbody>
      </table>
    </>
  )

  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}
export default ExerciseCard