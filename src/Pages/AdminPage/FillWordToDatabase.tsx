import React from 'react'
import "../../styles/FillWordToDatabase.css"
import { BsDatabaseAdd } from "react-icons/bs";

const FillWordToDatabase = () => {
  return (
    <div className='fillWordForm'>   
                <div className='background'>

                    <span className='database-logo'><BsDatabaseAdd size="middle"/></span>
                    <span className="text">Input to database</span>
                </div>

            <form className='form' method='post'>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
                <input type='text' placeholder='input'/>
              <button className='submit-button' type='submit'>Add word</button>


            </form>
            

    </div>
  )
}

export default FillWordToDatabase