import React ,  { useState , useContext,createContext ,useReducer, useEffect } from "react";
import reducer from "./Reducer";
import Cookies from "universal-cookie";

const initialState = {isEnglish:true , isAuth:{user:"", pwd:"",roles:0, accessToken:undefined}}
 const cookies = new Cookies()
export const Context = createContext();
export const useStore =()=> useContext(Context);

const StoreProvider = ({children})=>{
 
    const [state , dispatch ] = useReducer(reducer , initialState)   
const store ={
    ...state,
  cookies,
    dispatch,
}
    return(
                <Context.Provider value={store} >{children}</Context.Provider>   
        )

}

export default StoreProvider

