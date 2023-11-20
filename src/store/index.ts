import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: useReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState =ReturnType<typeof store.getState>;

export function curentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`
}
