import React from 'react'
import "./style.css"
import { set } from 'react-hook-form';

const SearchField = (inputValue="" , setValue) => {
   
  return (
    <div>
            <input value={inputValue} onChange={(e)=>{
                    const value =e.target.value;
                    setValue(value)
            }} placeholder="search" className='border-2 h-10 text-center rounded-lg w-96 '/>
    </div>
  )
}

export default SearchField