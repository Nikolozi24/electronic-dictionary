import { createContext , useContext , useState } from "react";



export const myContext = createContext();

export const useStore = ()=>useContext(myContext);


const StoreProvider = ({children}) =>{

  const [thematics , setThematics] = useState([
    {
        id:1,
        GeorgianMeaning:"წაშლა",
        EnglishMeaning:"remove",
        subtopics:[""],
       
    },
    {
        id:2,
        GeorgianMeaning:"დამატება",
        EnglishMeaning:"add",
        subtopics:[""],
    },
    {
        id:3,
        GeorgianMeaning:"წაშლა",
        EnglishMeaning:"remove",
        subtopics:[""],
    },
    {
        id:4,
        GeorgianMeaning:"წაშლა",
        EnglishMeaning:"remove",
        subtopics:[""],
    },
    {
        id:5,
        GeorgianMeaning:"წაშლა",
        EnglishMeaning:"remove",
        subtopics:[""],
    },
    {
        id:6,
        GeorgianMeaning:"წაშლა",
        EnglishMeaning:"remove",
        subtopics:[""],
    },

])
  const [isOpen ,  setIsOpen] = useState(false)
    const onSave=  (Georgian, English, id)=>{
            console.log(English , Georgian, id , "onSave")
            navigate('/added')
    }
    const onCancel=()=>{
          setIsOpen(false)
          navigate(-1)
    }
  const [auth,setAuth] = useState({})
  const  store = {
        auth,
        setAuth,
        isOpen,
        setIsOpen,
        onSave,
        onCancel,
        thematics,
        setThematics
    }
return(
        <myContext.Provider  value={store} >{children}</myContext.Provider>
)
}
export default StoreProvider;

