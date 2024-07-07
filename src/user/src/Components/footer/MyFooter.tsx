import { useState } from 'react'
import "./MyFooter.css"
import { FacebookFilled } from '@ant-design/icons'

interface SocialProps{
  id:number,
  text:string,
  link:string
  icon:any


}
const MyFooter = () => {
  const [social , ] = useState<SocialProps[]>([{
    id:1,
    text:'facebook',
    link:'https://www.facebook.com/TbilisiStateUniversity',
    icon:<FacebookFilled />
  },
  {
    id:2,
    text:"tsu.ge",
    link:'https://tsu.ge/',
    icon:""

  }
 ]) 
  return (<>

  <footer className='footer'>

          <ul className="footer-ul">
              <li className="social">
                <ul className="social">
                  {
                    social?.map((item)=>{
                      return <li key={item?.id}><a style={{color:'black'}} href={item.link}>{item.icon }{item.text}</a></li>
                    })
                  }
                
                </ul>
              </li>
              <li> @All right reserved. developed by TsuStudents </li>
              <li>
                <ul id="info">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </li>


          </ul>
  </footer>
  
  
  </>
  )
}

export default MyFooter