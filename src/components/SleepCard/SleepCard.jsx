import { useState} from "react"
import { update } from "../../services/dayService"

const SleepCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)
  const [sleepData, setSleepData] = useState("")

  const handleChange = (evt) => {
    const updatedSleep = evt.target.value
    setSleepData(updatedSleep)
    console.log(updatedSleep)
    console.log(day)
    
  }

  const handleEdit = () => {
    setEditMode(true)
    setSleepData(day.sleep[0].totalSleep)
  }

  const handleSave = async () => {
    const updatedDay = {...day}
    updatedDay.sleep[0].totalSleep = sleepData
    try {
      await update(updatedDay)
      setEditMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!day ) return <h1>loading</h1>
  
  const editView = (
    <>
      <h1>Edit Card View</h1>
      <input
            type='number'
            name='totalSleep'
            id='sleep-input'
            value={sleepData}
            onChange={handleChange}
      />
      <button onClick={() => handleSave()}>Save</button>
    </>
  )
  const saveView = (
    <>
      <h1>Sleep Card Info<button onClick={() => handleEdit()}>Edit</button></h1>
      <h2>Hours of sleep {day.sleep[0].totalSleep}</h2>
      
    </>
  )


  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}

export default SleepCard