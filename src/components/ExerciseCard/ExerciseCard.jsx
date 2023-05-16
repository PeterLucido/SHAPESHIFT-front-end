import { useState } from "react"

const ExerciseCard = ({day}) => {
  const [editMode, setEditMode] = useState(false)

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    setEditMode(false)
  }

  if (!day ) return <h1>loading</h1>
  
  const editView = (
    <>
      <h1>Edit Card View</h1>
      <button onClick={() => handleSave()}>Save</button>
    </>
  )
  
  const saveView = (
    <>
      <h1>Card Info</h1>
      <button onClick={() => handleEdit()}>Edit</button>
    </>
  )


  return (
    <>
      {editMode ?  editView : saveView}
    </>
  )
}
export default ExerciseCard