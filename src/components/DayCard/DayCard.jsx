
// npm modules
import { Link } from "react-router-dom"


const DayCard = ({ day }) => {
  return (
    <Link to={`/days/${day._id}`} state={day}>
      <article>
        <header>
          <span>
            this is the day index
            {/* <h1>{ day.date }</h1> */}
           {/* This is the text inside the card, what should go here besides date? */}
          </span>
        </header>
      </article>
    </Link>
  )
}

export default DayCard