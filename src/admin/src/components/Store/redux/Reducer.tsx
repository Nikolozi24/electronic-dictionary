import { SET_AUTH } from "./actionTypes.tsx"
const initialState = {auth:{username:"" ,password:"" , roles:[] , accessToken:"" }}

function Reducer (state = initialState, action:any){
  switch (action.type) {

  case SET_AUTH:
    return { ...state, auth: {username:action.payload.username , password:action.payload.password , roles: action.payload.roles , accessToken:action.payload.accessToken }}
  default:
    return state
         }
}
export default Reducer