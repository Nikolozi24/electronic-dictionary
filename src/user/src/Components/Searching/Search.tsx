import React, { useState } from 'react'
import "./Search.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Entry } from '../TypeDef/Types';
interface SearchProps{
 words:Entry[];
 setValue:(e:any) => void;
  value:string;
  styleAdditional:{};
}

const Search:React.FC<SearchProps> = ({words, value, setValue, styleAdditional}) => {

  function focuse(){
    const input = document.getElementById("Search")
    const div = document.querySelector('.container_search');
    const ul  = document.querySelector('.WordList')
    input?.addEventListener('focus', function() {
       div?.classList.add('focused');
       ul?.classList.add('focused');
    });
    
    input?.addEventListener('blur', function() {
      div?.classList.remove('focused');
      ul?.classList.remove('focused');
    });
    
  }
  focuse();
console.log(words)
  return (
    <div className="container_search"  style={styleAdditional}>
            <input type='text' id="Search" placeholder='მოძებნე სიტყვა...' value={value} onChange={(e)=>{
                const val = e.target.value;
                setValue(val)
            }}  />
           {
             value!=="" &&<ul className='WordList' style={{ position:"absolute" , zIndex:"50",top:'70px', padding:"20px 40px"}}>
             {
              words?.map(item=>{
                  return item.status=="Active"? <li key={item?.id}><Link style={{color:"black", margin:"2px"}} to={`/${item?.id}`}>{item?.georgianHeadword}  -  {item.englishHeadword}</Link></li>:<></>

              })}
            </ul>
    }
    </div>
  )
}

export default Search