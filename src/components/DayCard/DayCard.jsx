
// npm modules
import { Link } from "react-router-dom"

// CSS
import styles from './DayCard.module.css'


const DayCard = ({day}) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }
  
  const getCardColor = (rating) => {
    if (rating <= 1) {
      return { backgroundColor: '#F15F61' }
    } else if (rating <= 2) {
      return { backgroundColor: '#F89C49' }
    } else if (rating <= 3) {
      return { backgroundColor: '#FBF17D' }
    } else if (rating <= 4) {
      return { backgroundColor: '#9DD089' }
    } else {
      return { backgroundColor: '#4F8C4F' }
    }
  }

  return (
    <>
      <div className={styles.dayContainer} style={getCardColor(day.rating)}>
        <Link to={`/days/${day._id}`}>
          <h4>{formatDate(day.date)}</h4>
        </Link>
        <h4>Rating: {day.rating} out of 5</h4>
      </div>
    </>
  )
}

export default DayCard