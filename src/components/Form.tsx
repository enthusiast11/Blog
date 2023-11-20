import React, {useState, FC} from 'react'
import { Button, Stack, TextField, createTheme, ThemeProvider } from '@mui/material'

interface IForm {
    title: string
    handleClick: (e:React.MouseEvent<HTMLButtonElement>,email: string, password: string) => void
}

const Form: FC<IForm> = ({title, handleClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  

  return (
      <Stack 
      component="form"
      sx={{
        width: '40%',
        margin: 'auto',
        mt: 10
      }}

    >
      <h1 style={{ textAlign:"center"}}>{title}</h1>
      <TextField variant="outlined" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} type="email" />
      <TextField variant="outlined" placeholder='email' value={password} type="password" onChange={e => setPassword(e.target.value)}/>
      <Button variant="contained" onClick={  (e)=> handleClick(e, email, password)}size='medium'>{title}</Button> 
    </Stack>

    
  )
}

export default Form




