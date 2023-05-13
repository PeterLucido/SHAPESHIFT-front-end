import DayCard from "../../components/DayCard/DayCard"

const DayList = (props) => {
  return (
    <main>
      <h1>Index of Days</h1>
      {props.days.map(day => (
        <DayCard key={day._id} day={day} />
      ))}
    </main>
  )
}

export default DayList