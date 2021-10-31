import React from "react"

const Filter = ({ filter, filterHandler }) => {
  return (
    <div>
    Name filter:
    <input 
      value={filter}
      onChange={filterHandler}
    />
  </div>
  )
}

export default Filter
