import React ,{useState} from 'react'
import "../../styles/Quiz.css"
import { data } from '../../Assets/Data/data'
const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question,setQuestion] = useState(data[index])
  const [isLock,setIsLock] = useState(false) 

  const checkAns = (e, ans)=>{
    question.ans === ans? e.target.classList.add("correct") : e.target.classList.add("wrong") 
  }  
  const protectedCheck = (e,ans)=>{
      if(!isLock){
        checkAns(e,ans)
        setIsLock(true)
      }
     
  }
  return (
    <div className='container-quiz'>
        <h1>ქვიზი</h1>
        <h2>{index+1 } {question.question}</h2>
        <ul>
            <li onClick={(e)=>{protectedCheck(e,1)}} className='quiz-item'>{question.option1}</li>
            <li onClick={(e)=>{protectedCheck(e,2)}} className='quiz-item'>{question.option2}</li>
            <li onClick={(e)=>{protectedCheck(e,3)}} className='quiz-item'>{question.option3}</li>
            <li onClick={(e)=>{protectedCheck(e,4)}} className='quiz-item'>{question.option4} </li>
        </ul>
        <button className='quiz-button' onClick={()=>{index<5 && (setIndex(prev=>prev+1) && setQuestion(data[index+1])) }}>შემდეგი</button>
        <div className='index'> {index+1} / 5 კითხვა   </div>
    </div>
  )
}

export default Quiz