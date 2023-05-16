import DayCard from "../../components/DayCard/DayCard"
import QuoteCard from '../../components/QuoteCard/QuoteCard'
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu"
import { useState } from "react"
import { useEffect } from "react"
import * as dayService from '../../services/dayService'

const DayList = ({days, user}) => {
  const [daysInList, setDaysInList] = useState([])
  const [displayCount, setDisplayCount] = useState(7)
  const [currIdx, setCurrIdx] = useState(0)
  
  useEffect(() => {
    const fetchAllDays = async () => {
      const data = await dayService.index()
      setDaysInList(data)
      console.log('Day Data', data)
    } 
    if (user) fetchAllDays()
  }, [user])

  const sortedDays = [...daysInList]
  .sort((a,b) => new Date(b.date) - new Date(a.date))
  
  const filteredDays = sortedDays
    .slice(currIdx, currIdx + displayCount)
    .map((day) => <DayCard key={day._id} day={day} />);

  function handleDisplayCountChange(newDisplayCount) {
    setDisplayCount(newDisplayCount)
  }

  return (
    <>
      <QuoteCard />
      <h1 className="all-days">Days</h1>
      <div className="dropdown-container">
        <DropdownMenu
          onDisplayCountChange={handleDisplayCountChange}
          daysInList={daysInList}
        />
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