import {useNavigate} from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import {setUser} from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';


const Login = () => {
    const dispatch = useAppDispatch();
    const push = useNavigate();
    
    const handleLogin = (e:React.MouseEvent<HTMLButtonElement>, email: string, password: string) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                console.log(user.uid);
                
                
                
                push('/Post_Tape');
            })
            .catch(() => alert('Invalid user!'))
    }

   
    

    return (
        <Form
            title="Sign in"
            handleClick={handleLogin}
        />
    )
}

export default Login