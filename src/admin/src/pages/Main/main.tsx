import React from 'react'
import { Link } from 'react-router-dom'

const Main:React.FC = () => {
  return (
    <div>
            <ul>
                <li><Link to="/main"> main</Link></li>
                <li><Link to="/addUsers">AddUSer</Link></li>
                <li><Link to="/addTopic" >AddTopic</Link></li>
                <li><Link to="/addSubTopic">addSubtopic</Link></li>


            </ul>


    </div>
  )
}

export default Main