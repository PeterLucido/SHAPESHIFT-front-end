import { useState } from "react"

function DropdownMenu({ onDisplayCountChange, daysInList }) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleSelectOption = (event) => {
    onDisplayCountChange(Number(event.target.value))
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectOption}>
        {/* <option value="">Select an option</option> */}
        <option value="7">7</option>
        <option value="14">14</option>
        <option value="30">30</option>
        <option value={daysInList.length}>All Days</option>
      </select>
      <p>{selectedOption} Results per page</p>
    </div>
  )
}

export default DropdownMenu