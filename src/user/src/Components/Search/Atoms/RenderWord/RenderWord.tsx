import React from 'react'
import { Card , Typography} from 'antd'
import "../wordRender.css"
import axios from 'axios';

const RenderWord:React.FC = (props) => {
    const {Title} = Typography;
    const {word} = props;

const RenderWord = ()=>{
    const image = axios.get(`${word?.imageUrl}`).then(res=>res.data).then(data=>console.log(data))
    return  <Card  className='wordRender'   bordered={true} style={{ width:'100%',height:"70px", }}>
          <Title level={4}><span style={{color:"#fc914e"}}>{`${word?.georgianHeadword}`}</span> - {`${word?.englishHeadword}`}</Title>
        
         <img src={word?.imageUrl}/>
</Card>
}
    return word?.status == "Active"? RenderWord(): <></>

}

export default RenderWord