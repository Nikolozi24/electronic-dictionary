import React from 'react'
import "./Word.css"
import { Link } from 'react-router-dom';
import { Entry } from '../TypeDef/Types';

interface WordPorps{
  word:Entry
}
const Word:React.FC<WordPorps> = (props) => {
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