import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { Typography } from '@mui/material'

export const LoginPage = () => {
   

   return (
            <div>
                <Login/>
                <Typography textAlign='center' variant="h6"  gutterBottom>
                    No account ?
                    <Link to='/Register' >Registration</Link>
                </Typography>
                
            </div>
        
      
    )
  
}
