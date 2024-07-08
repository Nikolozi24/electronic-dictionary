import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AxiosErrorHandling from '../../Components/Utilities/ErrorHandling/AxiosErrorHandling'
import axios from 'axios'
import "./WordPage.css"
import { HomeOutlined } from '@ant-design/icons'
import {FacebookShareButton} from 'react-share'
import Search from '../../Components/Searching/Search'
import { Entry } from '../../Components/TypeDef/Types'
import MyFooter from '../../Components/footer/MyFooter'
const WordPage:React.FC = () => {
  // ნავიგაციის ფუნქცია
  const navigate = useNavigate();
  // წამოვიღებთ აიდს იმ ობიექტისას რომელსაც ვარენდერებთ
    const {id} = useParams()
    //ობიექტის ჩასასმელად ცვლადი
  const [word, setWord ] = useState<Entry>()

// ფუნქცია რომელიც ობიექტის ID=ის ვცლილებისას  მოაქვს შესაბამისი აიდის მქონე 
// ობიექტი  
    useEffect(()=>{
        try{
            const fun =  async () =>{
               await axios.get(`http://localhost/api/entry/${id}`,{
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


    },[id])
    // მოსაძებნი სიტყვა ძებნისათვის
    const [value, setValue] = useState<string>("")
    const [current, ] = useState<number>(1);
    //სიტყვებიი , search კომპონენტისთვის
    const [words, setWords] = useState<Entry[]>([])
 // ფუნქცია რომელიც გვერდებზე და მნიშვნელობაზე იცვლება
    useEffect(()=>{
      const fun= async ()=>{
         await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}`,{
        headers:{
          "Content-Type":'application/json'
        }
      }).then(res=>res.data).then( data=>{
        setWords(data)
      })
    }
    fun()
  
    },[value, current])
    const SearchStyle = {
      width:'70%',
      margin:'2px auto'
    }
    // არენდერებს ობიექტს 
    function renderWord (word:Entry){
      return      <div>
        <div className='SearchingWordPage'>
          <Link style={{paddingLeft:'20px', color:"black"}} to="/"><HomeOutlined/>მთავარი</Link>
            <Search value={value} words={words} styleAdditional={SearchStyle} setValue={setValue}/>
        </div>

        <div className='wordPageForUser'>

        {word?.georgianHeadword!=="n/a" && <h1 className='georgianHeadword'><span>{word?.georgianHeadword}</span> </h1>}
       { word?.functionalLabel!=="n/a" &&  <h6 className='functionalLabel'><span>{word?.functionalLabel}</span></h6>}
        {word?.stylisticQualification!=="n/a"&& <h6 className='stlyeQualification'><span>{word?.stylisticQualification}</span></h6>}
          {word?.englishHeadword!=="n/a"&& <h2 className="englishHeadword"><span>{word?.englishHeadword}</span> </h2>}
          <h4> {word?.georgianDefinition} <br/> {word?.englishDefinition}</h4>
       {word?.georgianIllustrationSentence!="n/a" && <>
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
        
        {/* <FacebookShareButton url={`youtube.com`}>share to youtube</FacebookShareButton> */}
        <FacebookShareButton url={`http://localhost:5174/${word?.id}`}>share to facebook</FacebookShareButton>
        </div>
          <MyFooter/>
        </div>

     
    }
    // ობიექტის არ არსებობის შემთვხვევაში დარენდერებს ამას
   function renderError(){
      return <>
          <h1>სიტყვა ვერ მოიძებნა</h1>
            <button onClick={()=>{navigate(-1)}}>უკან დაბრუნება</button>
      </>
    }
    // თუ სიტყვა აქტიურია , მაშნ სიტყვას დაარენდერებს , თუ არა და შეცდომას
  return (word?.status=="Active"? renderWord(word):renderError()
  )
}

export default WordPage