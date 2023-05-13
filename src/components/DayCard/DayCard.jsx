
// npm modules
import { Link } from "react-router-dom"


const DayCard = ({ day }) => {

  
  return (
    <>
      <div>
        <Link to={`/days/${day._id}`}>
          <h4>{day.date.slice(0,10)}</h4>
        </Link>
        <h4>Rating: {day.rating}/5</h4>
      </div>
    </>
    // <Link to={`/days/${day._id}`} state={day}>
    //     <header>
    //         <h1>{ day.date }</h1>
    //         <h2>{day.rating}</h2>
    //     </header>
    // </Link>
  )
}

export default DayCard