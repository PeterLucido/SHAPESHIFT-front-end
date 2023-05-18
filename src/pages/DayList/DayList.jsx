import DayCard from "../../components/DayCard/DayCard"
import QuoteCard from '../../components/QuoteCard/QuoteCard'
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu"
import { useState } from "react"
import { useEffect } from "react"
import * as dayService from '../../services/dayService'

// CSS
import styles from './DayList.module.css'

const DayList = ({ user, getAverageRating}) => {
  
  const [daysInList, setDaysInList] = useState([])
  const [displayCount, setDisplayCount] = useState(7)
  const [currIdx, setCurrIdx] = useState(0)
  // const [displayedDays, setDisplayedDays] = useState(filterData(0))
  
  // function filterData(newIdx) {
  //   const filteredData = daysInList.filter((day, idx) => {
  //     return idx >= newIdx && idx < newIdx + displayCount
  //   })
  //   return filteredData
  // }

  function handleIncrease() {
    let newIdx = currIdx
    newIdx = newIdx + displayCount
    if (newIdx > daysInList.length) {
      return
    }
    // const data = filterData(newIdx)
    setCurrIdx(newIdx)
    // setDisplayedDays(data)
  }

  function handleDecrease() {
    let newIdx = currIdx
    newIdx = newIdx - displayCount
    if (newIdx < 0) {
      return
    }
    // const data = filterData(newIdx)
    setCurrIdx(newIdx)
    // setDisplayedDays(data)
  }


  useEffect(() => {
    const fetchAllDays = async () => {
      const data = await dayService.index()
      setDaysInList(data)
      const totalRating = data.reduce((sum, day) => sum + day.rating, 0)
      const averageRating = totalRating / data.length
      getAverageRating(averageRating)
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
      <h1 className="all-days">
        <button className={styles.forwardBack} onClick={()=>handleDecrease()}>⬅️</button>
        Days
        <button className={styles.forwardBack} onClick={()=>handleIncrease()}>➡️</button>
      </h1>
      <div className="dropdown-container">
        <DropdownMenu onDisplayCountChange={handleDisplayCountChange} daysInList={daysInList} />
      </div>
      <main>
        <div className="daylist-container">
          {filteredDays}
        </div>
      </main>
    </>
  )
}

export default DayList