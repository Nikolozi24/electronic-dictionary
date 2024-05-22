import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"
import axios from "../../API/axios"
const InitialThematic = {thematic:[
{
    id:1, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:2, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:3, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:4, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:5, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:6, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:7, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:8, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:9, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:10, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:11, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:12, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:13, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:14, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:15, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:16, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:17, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:18, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:19, GeorgianMeaning:"ცი", EnglishMeaning:"ელლო" 
    ,subtopics:[""]
},
{
    id:20, GeorgianMeaning:"ცი", EnglishMeaning:"ელgfdgfdო" 
    ,subtopics:[""]
},

]
,
isOpen:false
}




export const thematicSlice = createSlice({
    name:"thematic",
    initialState:InitialThematic,
    reducers:{
        setThematicData(state, action){
              state.thematic = action.payload
        },
        setSubThematic(state, action){
                state.thematic[action.payload.index].subtopics = action.payload.value;              
        },
        addNewSubThematic(state, action){
              state.thematic[action.payload.index].subtopics = [action.payload.value ,...state.thematic[action.payload.index].subtopics]
        },
        onClose(state){
                state.isOpen = false;
        }

    }
})


export const thematicActions = thematicSlice.actions;