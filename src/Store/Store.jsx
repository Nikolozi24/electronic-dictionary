import React ,  { useState , useContext,createContext ,useReducer } from "react";
import reducer from "./Reducer";


const initalState = {isEnglish:true}

export const Context = createContext();
export const useStore =()=> useContext(Context);

const StoreProvider = ({children})=>{
    const [state , dispatch ] = useReducer(reducer , initalState)   
const store ={
    ...state,
    dispatch,
}
    return(
                <Context.Provider value={store} >{children}</Context.Provider>   
        )

}

export default StoreProvider

