import { useState } from 'react'

import styles from './DropdownMenu.module.css'

function DropdownMenu({ onDisplayCountChange, daysInList }) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleSelectOption = (event) => {
    onDisplayCountChange(Number(event.target.value))
    setSelectedOption(event.target.value)
  }

  return (
    <div className={styles.select}>
      <select value={selectedOption} onChange={handleSelectOption}>
        <option value='7'>7</option>
        <option value='14'>14</option>
        <option value='30'>30</option>
        <option value={daysInList.length}>All</option>
      </select>
      <p>results per page</p>
    </div>
  )
}

export default DropdownMenu