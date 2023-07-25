import { configureStore } from '@reduxjs/toolkit'
import me from './me'

export default configureStore({
  reducer: {
    me: me
  }
})