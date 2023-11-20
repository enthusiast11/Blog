import React, { useState,  useEffect,} from 'react'
import { db } from '../firebase/firebase'
import { DocumentData,  collection, getDocs, } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { useAuth } from '../hooks/use-auth'
import { Navigate } from 'react-router-dom'
import { PostItem } from './PostItem'

import { Box, Container } from '@mui/material';

interface IData {
  comments: [{data: string, name: string, value: string}]
  hashteg: [{ key: number, label: string }];
  header: string;
  liked: string;
  main: string;
  owner: string;
  postKey: string;
}
const PostList= ({search}: {search: string}) => {
  const userd = getAuth().currentUser?.uid as string
  const {isAuth, email} = useAuth()
  
  
  
 
  const [posts, setPosts] = useState<DocumentData[] | IData[]>([])
 
  const some = collection(db, 'users')
  

  useEffect( ()=>{
    async function fetchData() {

      const collectionRef = collection(db, "posts");
      
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data()}));
      console.log(data);
      
      setPosts(querySnapshot.docs.map((doc)=> ({...doc.data()})));
      console.log(posts);
      
        
  
        
        
    }
    
      


  fetchData();
  },[])

      
    
  
    



  
  
  let searchPosts: IData[] | DocumentData[]
  console.log(posts);
  
  if(posts.length ==0 ) {
    searchPosts = [{
      header: 'ПОСТОВ ПОКА НЕТ',
      hashteg: "Дефолтный пост",
      main: "Пока не было создано ни одного поста",
      postKey: Date.now().toString(),
      }]
  } else {
    searchPosts = posts.filter(post =>{
      return post.header.toLowerCase().includes(search.toLowerCase())  || post.main.toLowerCase().includes(search.toLowerCase()) as React.ReactNode
    })
  }
  console.log(searchPosts[0]);
  
     

  

  
  
  return isAuth ? (
    <Container >
        {searchPosts.map(item=> {
          return (
            <PostItem  item={item}/>
          )
      })}
    </Container>
  ) : (
    <Navigate replace to="/Login" />
  )
}

export default PostList

{/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} />


<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={60} />
// <Skeleton variant="rounded" width={210} height={60} /> */} //- "использовать при загрузке постов с сервера, чтобы у пользователя не было пустого экрана"