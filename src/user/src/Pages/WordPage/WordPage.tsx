import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosErrorHandling from '../../Components/Utilities/ErrorHandling/AxiosErrorHandling'
import axios from 'axios'
import "./WordPage.css"
import {FacebookShareButton} from 'react-share'

const WordPage:React.FC = () => {
    const {id} = useParams()
  const [word, setWord ] = useState({})
  
    useEffect(()=>{
        try{
            const fun =  async () =>{
                const response = await axios.get(`http://localhost/api/entry/${id}`,{
                  headers:{
                    "Content-Type":"application/json"
                  }
                }).then(res=>res.data).then(data=>setWord(data))
            }
              fun();
        }
        catch(err:any){
            AxiosErrorHandling(err);
        }


    },[])
    
  return (
    
    
    <div className='wordPageForUser'>
        {word?.georgianHeadword!=="n/a" && <h1 className='georgianHeadword'><span>{word?.georgianHeadword}</span> </h1>}
       { word?.functionalLabel!=="n/a" &&  <h6 className='functionalLabel'><span>{word?.functionalLabel}</span></h6>}
        {word?.stylisticQualification!=="n/a"&& <h6 className='stlyeQualification'><span>{word?.stylisticQualification}</span></h6>}
          {word?.englishHeadword!=="n/a"&& <h2 className="englishHeadword"><span>{word?.englishHeadword}</span> </h2>}
          <h4> {word?.georgianDefinition} <br/> {word?.englishDefinition}</h4>
       {word?.georgianIllustrationSentence && <>
          <article>
            <span>{word?.georgianIllustrationSentence}</span>
           </article>
          <br></br>
          <article>
            <span>{word?.englishIllustrationSentence}</span>
          </article>
       </>
        }
          {word?.source!=="n/a"&& <h4> წყარო: {word?.source}</h4>}
        { word?.idiom!=="n/a" && <h4> იდიომა: { word?.idiom }</h4>}
        { word?.synonym!=="n/a" && <h4> სინონიმი: { word?.synonym}</h4>}
        { word?.usageNote!=="n/a" && <h4>დამატებითი კომენტარი: { word?.usageNote}</h4>}
        <hr/>
        <img src={word?.imageUrl} alt='sityvis foto' width={400} />
        
        <FacebookShareButton url={`youtube.com`}>share to youtube</FacebookShareButton>
        <FacebookShareButton url={`http://localhost:5174/${word?.id}`}>share to facebook</FacebookShareButton>
      </div>
  )
}

export default WordPage