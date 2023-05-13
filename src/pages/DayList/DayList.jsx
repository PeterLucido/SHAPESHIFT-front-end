import DayCard from "../../components/DayCard/DayCard"

const DayList = (props) => {
  return (
    <h1>Index of days</h1>
    <main>
      {props.days.map(day => (
        <DayCard key={day._id} day={day} />
      ))}
    </main>
  )
}

export default DayList