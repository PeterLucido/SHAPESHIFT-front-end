import { useState } from "react"



const NewDay = (props) => {
  const [dayFormData, setDayFormData]= useState({
    date: new Date().toISOString().slice(0,10),
    rating: 2,
    owner: props.user._id
  })

  const handleDayChange = (evt) => {
    setDayFormData({...dayFormData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddDay(dayFormData)
  }

  return (
    <main>
      <h1>Create Day</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date-input'>Date</label>
        <input
          required
          type='date'
          name='date'
          id='date-input'
          value={dayFormData.date}
          onChange={handleDayChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
      {console.log(dayFormData)}
    </main>
  )
}

export default NewDay