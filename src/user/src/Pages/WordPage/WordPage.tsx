import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AxiosErrorHandling from '../../Components/Utilities/ErrorHandling/AxiosErrorHandling'
import axios from 'axios'
import "./WordPage.css"
import { HomeOutlined } from '@ant-design/icons'
import {FacebookShareButton} from 'react-share'
import Search from '../../Components/Searching/Search'
import { Entry } from '../../Components/TypeDef/Types'
import { motion } from 'framer-motion'
import MyFooter from '../../Components/footer/MyFooter'

const WordPage:React.FC = () => {
  /// for navigation
  const navigate = useNavigate();
  // get word object id
  const {id} = useParams()
// for sett word information
  const [word, setWord ] = useState<Entry>()
  // for loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //  control loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2 second loading delay
    return () => clearTimeout(timer);
  }, []);
  // send requets for word and set in state
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
    // for searching string
    const [value, setValue] = useState<string>("")
    //page number
     const [current, ] = useState<number>(1);
     // for searching, set word array
    const [words, setWords] = useState<Entry[]>([])
    // working with searching , when value changes
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
    //render word
    function renderWord (word:Entry){
      return     <>
       <div>
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
       {
          word.imageUrl &&  <img src={word?.imageUrl} alt='sityvis foto' width={400} style={{margin:'5px auto', }} />
      }

        <FacebookShareButton url={`http://localhost:5174/${word?.id}`}>share to facebook</FacebookShareButton>
        </div>
        </div>
        <MyFooter className='wordPage-pagination' />
        </>
    }
    //rendering if word doesn't exist
   function renderError(){
      return <>
              <h2>გვერდი ვერ მოიძებნა </h2>
            <button onClick={()=>{navigate(-1)}}>უკან დაბრუნება</button>
             </>
    }

// if it's loading show loading . esle if word exists  render word otherwise renderError.
  return  isLoading? <>
       <motion.div
  className="loader"
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1, rotate: 360 }}
  transition={{
    repeat:Infinity,
    type: 'spring',
    delay:0.2,
    stiffness: 260,
    damping: 20,
  }}
> </motion.div>
  Loading...
  </> : <>{(word?.status=="Active"? renderWord(word):renderError())}</>
}

export default WordPage