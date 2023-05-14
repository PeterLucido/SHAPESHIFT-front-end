import { useState} from "react"

const SleepCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    setEditMode(false)
  }

  if (!day ) return <h1>loading</h1>

  console.log(day)
  
  const editView = (
    <>
      <h1>Edit Card View</h1>
      <input type="text"/>
      <button onClick={() => handleSave()}>Save</button>
    </>
  )
  const saveView = (
    <>
      <h1>Sleep Card Info<button onClick={() => handleEdit()}>Edit</button></h1>
      
    </>
  )


  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}

export default SleepCard