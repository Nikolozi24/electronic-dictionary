import React from 'react'
import "../../../styles/Quiz.css"
const Quiz = () => {
  return (
    <div className='container-quiz'>
        <h1>ქვიზი</h1>
        <h2>რომელი სიტყვა არის ძვალთან დაკავშირებული?</h2>
        <ul>
            <li className='quiz-item'>არტერია</li>
            <li className='quiz-item'>გული</li>
            <li className='quiz-item'>ხერხემალი</li>
            <li className='quiz-item'>პანკრეასი </li>
        </ul>
        <button className='quiz-button'>შემდეგი</button>
        <div className='index'> 1 / 5 კითხვა   </div>
    </div>
  )
}

export default Quiz