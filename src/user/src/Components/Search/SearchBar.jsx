import React, { useEffect, useState } from 'react'
import "./Atoms/style.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchField from "./Atoms/SearchField";
import SearchButton from "./Atoms/SearchButton";
import { CgLayoutGrid } from 'react-icons/cg';
import { Card } from 'antd';
const SearchBar = () => {
      const [words, setWords] = useState([{      }])
      const [value , setValue ]  = useState("")
      useEffect(()=>{
        
        
        const fun = async ()=>{
          try{
           const resp = await axios.get(`http://localhost/api/entry/search?searchText=${value}`,
        ).then(resp =>resp.data).then(res=>
            {
              
                    const filteredData = res.map(item=>{
                        if(item.status==="Active"){
                          return item;
                        }
                      }
                )
                setWords(filteredData);
            }


        );
        console.log(words);



          }
          catch(err){
            console.log(err.response.status)
          }
        }
        fun();
      },[value])
      const handleSubmit=(e)=>{
        e.preventDefault();
        
        const fun = async ()=>{
          try{
           const resp = await axios.get(`http://localhost/api/entry/search?searchText=${value}`,
        ).then(resp =>resp.data).then(res=>
            {
              
                    const filteredData = res.map(item=>{
                        if(item.status==="Active"){
                          return item;
                        }
                      }
                )
                setWords(filteredData);
            }


        );
        console.log(words);



          }
          catch(err){
            console.log(err.response.status)
          }
        }
        fun();
    }

      
   return (

<>

    <div className="searchBar">
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
      <button>
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
      </button>
      <input className="input"  value={value}  onChange={(e)=>{
            const val = e.target.value;
            setValue(val)

      }} id="value" placeholder="მოძებნე სიტყვა"  required type="text"/>
      <button className="reset" type='button'  onClick={()=>{}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
  </form>
        
    </div>
        <div className='wordList'>

              {
                words.map(item=>{
                  return  <Link to={`/${item?.id}`}>
                      <Card title={`${item?.georgianHeadword} - ${item?.englishHeadword}`} bordered={true} style={{ width: 900 , margin:'10px 2px' }}>
                      <p>{item?.functionalLabel}</p>
                    </Card>
                    
                  </Link>
                 
                  
                })
              }
        </div>


        
</>
  
  )
}

export default SearchBar