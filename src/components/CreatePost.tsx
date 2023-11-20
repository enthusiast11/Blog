import React, {Dispatch, ReactNode, useState, FC} from 'react'
import Postlist from './PostList'
import { IPost, IPosts } from '../types'
import { ChangeEvent, KeyboardEvent} from 'react'
import { collection,  setDoc, doc, updateDoc, increment} from "firebase/firestore"; 
import { db } from '../firebase/firebase'
import { getAuth } from 'firebase/auth'
import { log } from 'console'
import { Navigate } from 'react-router'

import { useAuth } from '../hooks/use-auth'

import { styled } from '@mui/material/styles';
import {Button, Card, CardContent, Box, TextField, Typography, CardActions, Container} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Hashteg from './Hashteg';

import { ChipData } from './Hashteg';





export const CreatePost = () => {
    const {isAuth, email} = useAuth() 

    const [value, setValue] = useState('')

    

    const [header, setHeader] = useState('')
    const [hashteg, setHashteg] = useState<ChipData[]>([])
    const [main, setMain] = useState('')
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();

    const [options, setOptions] = useState<string[]>([])


    const [toggle, setToggle] = useState(false)

    

    const isVisible = true

    const userd = getAuth().currentUser?.uid as string
    

   
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event ) => {
        if (event.key=== "Enter") addnewHashteg() 
      };
    
   
    function addnewHashteg () {
        setOptions([...options, value])
        setValue('')
           
    } 
    function addData (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, func:(e:string)=> void )  {
        func(e.target.value)
        
    }
    function clearData() {
        setHashteg([])
        setHeader('')
        setMain('')
    }
    
    function getImage(img: File, srsImg:string){

        setImage(img)
        setImageUrl(srsImg)
        
    }
    const postObject =  {
        owner: userd,
        header: header,
        hashteg: hashteg,
        main: main,
        postKey: Date.now().toString(),
        comments: [],
        liked: 'black'

    }
     async function addPost(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)  {
        e.preventDefault()
        if( header && hashteg && main  ) {
            const collectionRef = collection(db, 'posts',);         
            const newSubDocumentRef = await setDoc(doc(collectionRef, header),postObject).then((col)=>{
                console.log("Новая подколлекция создана");
            });

                const userRef = doc(db, 'users', userd )
                await updateDoc(userRef, {
                  posts: increment(1)
                })
            clearData()
        }     
    }
    function getHashteg(hash: ChipData[]){
        setHashteg(hash)
        
    }
    // const storage = getStorage();
    // const imagesRef = ref(storage, 'images'); - ссылка на репозиторий с картинками внутири Storage
    // const spaceRef = ref(storage, 'images/space.jpg') - ссылка на конкретный элемент в нутри этого репозитория
    // uploadBytes(spaceRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   });
    function toggleVisible (func:(value: boolean)=> void, value: boolean) {
        func(!value)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      
    return isAuth ? (
        <Container sx={{mt: '80px', textAlign:'center'}}>
              <Card>
                <CardContent>
                
              
              <TextField
                  value={header}
                  onChange={e=> addData(e, setHeader) }
                  id="outlined-disabled"
                  placeholder='Введите заголовок'
                  sx={{mb:2, width:'100%'}}
                  
                />
           
   
                  <Hashteg  onHashteg={getHashteg}/>

         
           
                <TextField
                  onChange={e => addData(e, setMain)}
                  id="outlined-multiline-static"
                  value={main}
                  placeholder='Чем вы хотите поделиться?'
                  multiline
                  rows={4}
                  sx={{mb:10, width:'100%'}}
                />

                </CardContent >
                <CardActions  sx={{display: 'flex', justifyContent:'space-between'}}>
                <Button component="label" variant="contained" size='small' style={{height: '32px'}} startIcon={<CloudUploadIcon />}>
                    <VisuallyHiddenInput   type="file" />
                </Button>
                <Button variant="contained" size='small' onClick={(e)=> addPost(e)} href="#contained-buttons">
                    Create
                </Button>
              </CardActions>
              </Card>
        </Container>
     
              
             
          
              
         
        
       
        
        
      ): (
        <Navigate replace to="/Login" />
      )
}

// 


