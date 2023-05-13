
// npm modules
import { Link } from "react-router-dom"


const DayCard = ({ day }) => {
  return (
    <Link to={`/days/${day._id}`} state={day}>
        <header>
            <h1>{ day.date }</h1>
            <h2>{day.rating}</h2>
        </header>
    </Link>
  )
}

export default DayCard