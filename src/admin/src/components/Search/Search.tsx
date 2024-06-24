import React from 'react'
import "./Search.css"

const Search:React.FC = (props) => {
        const {value, handleChange} = props;
  return (
    <div className='handleSearching'>

<div className="InputContainer">
  <input placeholder="სიტყვის მოძებნა" id="input" value={value}  onChange={(e)=>handleChange(e)} className="inputSearch" name="text" type="text"/>
  
    </div>
</div>
  
  )
}

export default Search