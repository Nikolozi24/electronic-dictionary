import { IoSearchOutline } from 'react-icons/io5'
import React from 'react'

const SearchButton = () => {
  return (
    <div>
        <button className='rounded-full h-10 w-10 bg-yellow-400 hover:bg-grey-400'><IoSearchOutline/></button>
    </div>
  )
}

export default SearchButton