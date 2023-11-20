import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router'
 import { useAuth } from '../hooks/use-auth'
 import { getAuth } from 'firebase/auth'
 import { DocumentData } from 'firebase/firestore'
 import {  doc, updateDoc, getDoc,  arrayUnion } from "firebase/firestore";
import { db } from '../firebase/firebase'

import {Card, CardContent, Typography, Box, Grid, Button, Avatar, TextField, Container, ThemeProvider, createTheme} from '@mui/material'

const Profile = () => {
    const [toggle, setToggle] = useState(false)
    const [likes, setLikes] = useState(0)
    const [postsLength, setPostLength] = useState(0)
    const [userName, setUserName] = useState('')
    const [canIWrite, setCanIWrite] = useState('')
    const {isAuth, email} = useAuth() 
    

    const userd = getAuth().currentUser?.uid as string

    const statObject: DocumentData ={}
  

    async function getData() {
        try {
            let userref = doc(db, 'users', userd )
        console.log(userd);
        
        const userDocumentSnapshot = await getDoc(userref);
        const userdata = userDocumentSnapshot.data();
        const username = await userdata!.name
        const userlikes = await userdata!.likes
        const userposts = await userdata!.posts
        console.log(userlikes); 
        setLikes(userlikes)
        setPostLength(userposts)
        setUserName(username)
        } catch{
            console.log('Что то пошло не так');
            
        }
        

        
    }
    console.log(userName);
    

    async function changeName(e:React.ChangeEvent<HTMLInputElement>) {
        let userref = doc(db, 'users', userd )
        const userDocumentSnapshot = await updateDoc(userref, {
            name: e.currentTarget.value
        }).then(()=>{
            
            
            
            console.log('Всё ок');
            
        });
    }
    useEffect(() =>{
        getData()
    })

    function toggleVisible (func:(value: boolean)=> void, value: boolean) {
        func(!value)
        canIChange()
        const element =document.getElementById('nameOfUser')
        console.log(element!.hasAttribute("readonly"));
        
    }
    function canIChange () {
        const element =document.getElementById('nameOfUser')
        if (element!.hasAttribute("readonly")) {
            element!.removeAttribute("readonly");
            console.log('Тест');
            
          } else {
            element!.setAttribute("readonly", "readonly");
          }
    }

    const handleSaveClick = () => {
        setToggle(false);
        
    };
    const handleEditClick = () => {
        setToggle(true);
      };

    
  return isAuth ? (
    <Container sx={{mt:'80px', ml:'auto', mr: 'auto'}}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt="User Avatar"
            src="/path/to/avatar.jpg"
            sx={{ width: 100, height: 100, mb:2 }}
          />
        </Grid>
        <Grid item>
          {toggle ? (
            <TextField
              label="Имя пользователя"
              value={userName}
              onChange={e=>setUserName(e.currentTarget.value)}
              fullWidth
            />
          ) : (
            <Typography variant="h5">{userName}</Typography>
          )}
          
          {toggle ? (
            <Button variant="outlined" color="primary" onClick={handleSaveClick}>
              Сохранить
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={handleEditClick}>
              Редактировать профиль
            </Button>
          )}
        </Grid>
      </Grid>

    

        <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cтатистика
              </Typography>
              <Typography variant="body1">
                Количество постов: {postsLength}
              </Typography>
              <Typography variant="body1">
                Количество лайков: {likes}
              </Typography>
            </CardContent>
    </Card>
        
    </Container>
  ) : (
    <Navigate replace to="/Login" />
  )
}

export default Profile

//<TextField variant="standard" label="Username" /> - для имени

// {/* <Avatar
//   alt="Remy Sharp"
//   src="/static/images/avatar/1.jpg"
//   sx={{ width: 56, height: 56 }}
// /> */}  - 'для аватара'

// onClick={()=> toggleVisible(setToggle, toggle) }>{toggle ? 'Сохранить' : 'Редактировать'}
// onChange={(e) =>{changeName(e); setUserName(e.currentTarget.value!)}} 