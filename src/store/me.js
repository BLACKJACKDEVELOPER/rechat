import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const counterSlice = createSlice({
    name: 'me',
    initialState: {
      id: undefined,
      username:undefined,
      fullname:undefined,
      birth:undefined,
      email:undefined,
      profile:undefined,
      login:false
    },
    reducers: {
      setMe: (state , {payload:{ id , username , fullname , birth , email , profile , login }}) => {
        state.id = id
        state.username = username
        state.fullname = fullname
        state.birth = birth
        state.email = email
        state.profile = profile
        state.login = login
      },
      async req(path,data) {
        try {
          return await axios.post(path,data)
        }catch(e) {
          console.log(e)
        }
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setMe , req } = counterSlice.actions
  
  export default counterSlice.reducer
