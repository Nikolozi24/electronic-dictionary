
import { createSlice } from "@reduxjs/toolkit"

const initialState = {auth:{username:"" ,password:"" , roles:[] , accessToken:"" }, isOpen:false}

export const AuthSlice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{
        setAuth(state, action){
          state.auth = action.payload
        },
        setAccessToken(state, action){
            state.auth.accessToken = action.payload
        },
        setPassword(state,action){
          state.auth.password = action.payload
        },
        setUsername(state,action){
          state.auth.username = action.payload
        },
        setRoles(state, action){
          state.auth.roles = action.payload
        }
  }

})

export const authActions = AuthSlice.actions;