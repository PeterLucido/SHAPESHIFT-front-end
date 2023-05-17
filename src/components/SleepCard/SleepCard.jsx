import { useState} from "react"
import { update } from "../../services/dayService"

import edit from "../../assets/icons/edit.png"
import save from "../../assets/icons/save.png"

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
      <div className="form-headings">
        <h2>Sleep</h2>
          <button className="button-save" onClick={handleSave}><img src={save} height='25px'/></button>
      </div>
      <div className="sleep-container">
        <h4>Hours Slept:</h4>
        <input
          type='number'
          name='totalSleep'
          id='sleep-input'
          value={sleepData}
          onChange={handleChange}
        />
      </div>
    </>
  )

  const saveView = (
    <>
      <div className="form-headings">
        <h2>Sleep</h2>
          <button className="button-edit" onClick={handleEdit}><img src={edit} height='25px'/></button>
      </div>
      <div className="sleep-container">
        <h4>Hours Slept:</h4>
        <p>{day.sleep[0].totalSleep}</p>
      </div>
    </>
  )



  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}

export default SleepCard