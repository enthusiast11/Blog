import React, {useState} from 'react'
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../hooks/redux-hooks';
import { setUser } from '../store/slices/userSlice';
import Form from './Form';
import { useNavigate } from 'react-router';
import { collection, addDoc,setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { doc } from 'firebase/firestore';
import { useAuth } from '../hooks/use-auth';
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [newUser, setNewUser] = useState({})
    const  handleRegister = (e:React.MouseEvent<HTMLButtonElement>, email: string, password: string) => { 
        e.preventDefault() 

         
        const auth =  getAuth(); 
         createUserWithEmailAndPassword(auth, email, password) 
            .then(({user}) => { 
                console.log(user.uid); 
                setNewUser({user}) 
                dispatch(setUser({ 
                    email: user.email, 
                    id: user.uid, 
                    token: user.refreshToken, 
                }));
                
   
                localStorage.setItem(email, user.uid);
                navigate('/Post_Tape')
                setDoc(doc(db, "users",user.uid),{
                    name: email,
                    id: user.uid,
                    likes: 0,
                    posts: 0,
                    comments:0

                   })
                
               
            
                 
            }) 
            .catch(console.error) 
             
             
             
    } 
     
 
    return ( 
        <Form 
            title="Registration" 
            handleClick={handleRegister} 
        /> 
    )
}

export default Register





