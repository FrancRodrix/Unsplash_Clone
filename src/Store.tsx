import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Redux/AuthSlice'

export const store = configureStore({
    reducer: {
        userAuth: authSlice
    },
})
