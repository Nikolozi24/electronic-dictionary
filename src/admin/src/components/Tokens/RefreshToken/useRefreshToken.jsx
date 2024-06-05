
//// Refresh token-ის შექმნა
import React from 'react'
import axios from '../../API/axios'
// რომ მივწვდეთ auth-ის ხვლადს
import { useSelector } from 'react-redux'

//ეს იმისთვის არის რომ ცვლადი შევცალოთ
// გავაგქზავით რა მოთხოვნა გვინდა ტიპის მიხედვით და მერე რედიუსერი მიხედავს დანარჩენს
import { useDispatch } from 'react-redux'

import  {SET_AUTH} from "../../Store/redux/actionTypes"


const useRefreshToken = () => {
  //აკეთებს იმას რომ auth გლობალურ ცვლადს store-ში შენახულს  წამოიღებს და მიანიჭებს auth  ცვლადს
  const auth = useSelector(state=>state.auth)

  const dispatch = useDispatch()

  const refresh =  async () =>{
    const response = await axios.get('http://localhost/api/identity/refresh',{
      withCredentials:true
    })
    const newAuth =  {...auth , accessToken: response.accessToken}
      dispatch({type:SET_AUTH , payload: {...newAuth}})

      return response
  }
  return refresh;
}
export default useRefreshToken