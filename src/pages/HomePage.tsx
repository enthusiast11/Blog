import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/redux-hooks'
import { useAuth } from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'
import { Navigate } from 'react-router'
import { collection,  setDoc, doc, updateDoc, increment, getDoc} from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth'

const HomePage = () => {
    const dispatch = useAppDispatch()
    const userd = getAuth().currentUser?.uid as string
    const [username, setUserName] = useState('')
    function logOut() {
        localStorage.clear()
        dispatch(removeUser())
    }
    async function getData() {
        try{
            let userref = doc(db, 'users', userd )
            const userDocumentSnapshot = await getDoc(userref);
            const userdata = userDocumentSnapshot.data();
             let user = await userdata!.name 
             setUserName(user)
        }catch{
            console.log('ошибка');
            
        }
        
    }
    useEffect(() => {
        getData()
    })

 
  const {isAuth, email} = useAuth()
  return isAuth ? (
    <div>
        <h1>Welcome</h1>

        <button
            onClick={()=> logOut() }
        >Log out from {username}</button>
    </div>
) : (
   <Navigate replace to="/Login" />
)
}

export default HomePage