import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react"
import axios from "axios"
const InitialThematic = {
isOpen:false
}




export const thematicSlice = createSlice({
    name:"thematic",
    initialState:InitialThematic,
    reducers:{
        onClose(state){
                state.isOpen = false;
        }

    }
})


export const thematicActions = thematicSlice.actions;