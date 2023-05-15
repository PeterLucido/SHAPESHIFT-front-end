import DayCard from "../../components/DayCard/DayCard"
import QuoteCard from '../../components/QuoteCard/QuoteCard'


const DayList = (props) => {
  const sortedDays = [...props.days]
  .sort((a,b) => new Date(b.date) - new Date(a.date))

  
  return (
    <>
      <QuoteCard />
      <h1 className="all-days">All Days</h1>
      <main>
        <div className="container">
          {sortedDays.map(day => (
            <DayCard
              key={day._id}
              day={day}
            />
            ))}
        </div>
      </main>
    </>
  )
}

export default DayList