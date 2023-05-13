import DayCard from "../../components/DayCard/DayCard"

const DayList = (props) => {
  const sortedDays = [...props.days]
  .sort((a,b) => new Date(b.date) - new Date(a.date))

  
  return (
    <>
      <h1>Index of days</h1>
      <main>
        {sortedDays.map(day => (
          <DayCard
            key={day._id}
            day={day}
          />
        ))}
      </main>
    </>
  )
}

export default DayList