import React from "react"

import { CHANGE_LANGUAGE, SET_AUTH} from "./ActionType"
 const reducer = (state , action)=>{
        switch(action.type){
               case CHANGE_LANGUAGE:
              return  {...state ,isEnglish:action.payload } 
              case SET_AUTH:
                return{...state , isAuth:action.payload}
                default:
                return {...state}
        }



}
export default reducer
