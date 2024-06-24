import React from 'react'
import "./Word.css"
import { Link } from 'react-router-dom';

const Word:React.FC<WordProps> = (props) => {
    const {word} = props;
  return (
      <div className='normalWordRender'>
        <Link to={`/${word?.id}`}>
           <h3 className='georgianHeadword'><span>{word?.georgianHeadword}</span> </h3>
           <h4 className='functionalLabel'><span>{word?.functionalLabel}</span></h4>
        </Link>
    </div>
  )
}

export default Word