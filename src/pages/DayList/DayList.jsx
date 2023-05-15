import DayCard from "../../components/DayCard/DayCard"
import QuoteCard from '../../components/QuoteCard/QuoteCard'
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu"
import { useState } from "react"


const DayList = (props) => {
  const sortedDays = [...props.days]
  .sort((a,b) => new Date(b.date) - new Date(a.date))


  const [displayCount, setDisplayCount] = useState(7)
  const [currIdx, setCurrIdx] = useState(0)

  const filteredDays = sortedDays
    .slice(currIdx, currIdx + displayCount)
    .map((day) => <DayCard key={day._id} day={day} />);

  function handleDisplayCountChange(newDisplayCount) {
    setDisplayCount(newDisplayCount)
  }

  function filterDayData (newIdx, newDisplayCount) {
    const filteredData = sortedDays.filter((days, idx) => {
      return  idx >= newIdx && idx < newIdx + displayCount
    })
    return filteredData
  }

  
  return (
    <>
      <QuoteCard />
      <h1 className="all-days">Days</h1>
      <div className="dropdown-container">
        <DropdownMenu onDisplayCountChange={handleDisplayCountChange} days={props.days} />
      </div>
      <main>
        <div className="container">
          {filteredDays}
        </div>
      </main>
    </>
  )
}

export default DayList