
// npm modules
import { Link } from "react-router-dom"


const DayCard = ({day}) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  console.log('day card')
  
  const getCardColor = (rating) => {
    if (rating <= 1) return { backgroundColor: "red" }
    if (rating <= 2) return { backgroundColor: "orange" }
    if (rating <= 3) return { backgroundColor: "yellow" }
    if (rating <= 4) return { backgroundColor: "lightgreen" }
    return { backgroundColor: "green" }
  }

  return (
    <>
      <div className="day-container" style={getCardColor(day.rating)}>
        <Link to={`/days/${day._id}`}>
          <h4>{formatDate(day.date)}</h4>
        </Link>
        <h4>Rating: {day.rating} out of 5</h4>
      </div>
    </>
  )
}

export default DayCard