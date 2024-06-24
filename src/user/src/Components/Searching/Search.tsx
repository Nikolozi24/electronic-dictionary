import React, { useState } from 'react'
import "./Search.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
interface SearchProps{
  words:[{}];
 setValue:(e:any) => void;
  value:string;
}

const Search:React.FC<SearchProps> = ({words, value, setValue}) => {

console.log(words)
  return (
    <div className="container_search">
            <input type='text' placeholder='მოძებნე სიტყვა...' value={value} onChange={(e)=>{
                const val = e.target.value;
                setValue(val)
            }}  />
           {
             value!=="" && <ul>
             {
              words?.map(item=>{
                  return item.status=="Active"? <li key={item?.id}><Link to={`/${item?.id}`}>{item?.georgianHeadword}</Link></li>:<></>

              })}
            </ul>
    }
    </div>
  )
}

export default Search