import React from "react"

import { CHANGE_LANGUAGE } from "./ActionType"
 const reducer = (state , action)=>{
        switch(action.type){
               case CHANGE_LANGUAGE:
              return  {...state ,isEnglish:action.payload } 
                default:
                return {...state}
        }



}
export default reducer
