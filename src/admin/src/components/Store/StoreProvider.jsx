
import { createContext , useContext , useState } from "react";

export const myContext = createContext();

export const useStore = ()=>useContext(myContext);


const StoreProvider = ({children}) =>{
    const onSave=  (Georgian, English, id)=>{
            console.log(English , Georgian, id , "onSave")
            navigate('/added')
    }
    const onCancel=()=>{
          setIsOpen(false)
          navigate(-1)
    }
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

