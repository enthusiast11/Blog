import React, {useState, ChangeEvent, MouseEventHandler, useEffect} from 'react'
import CommentItem from './CommenList'
import CommentList from './CommenList'
import {  doc, updateDoc, getDoc,  arrayUnion } from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { getAuth } from 'firebase/auth'
import { curentDate } from '../store';
import { IComment } from '../types';

import {OutlinedInput, Button, } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


const CreateComment = ({show, name}: {show:string, name: string}) => {
  const [commentValue, setCommentValue] = useState('')
  const [click, setClick] = useState(false)
  
  const userd = getAuth().currentUser?.uid as string


    async function addComment() {
      let userref = doc(db, 'users', userd )
      const userDocumentSnapshot = await getDoc(userref);
      const userdata = userDocumentSnapshot.data();
      const username = await userdata!.name
      

      let commentsref = doc(db, 'posts', name )
    
      
      const commentDocumentSnapshot = await getDoc(commentsref)
      const commentdata = commentDocumentSnapshot.data();
      let commentsList = await commentdata!.comments;
      console.log(commentsList);
    
        await updateDoc(commentsref,{
          comments: arrayUnion({
            value: commentValue,
            data: curentDate(),
            name: username})
        })

    }

  function Add() {
    setClick(true)
    addComment()
    
    setCommentValue('')
  }
  const searchBarProps = { // make sure all required component's inputs/Props keys&types match
    postName: name
  }
  return (

    <div style={{display: show}}>
      <CommentList {...searchBarProps} />
      <div style={{display: "flex", justifyContent: 'space-between'}}>
        
        <OutlinedInput onChange={e=> setCommentValue(e.target.value)} sx={{width:'100%'}} size='small' />
        <Button size='small' onClick={() =>Add() } variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
        
      </div>
    </div>
   
  )
}

export default CreateComment


//<div style={{padding: '20px'}}>
    //   <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //     <div style={{display: 'flex', justifyContent: 'space-between'}}>
    //       <img src="" alt="" className='avatar' />
    //       <div className='nickname'></div>
    //     </div>
    //     <div className='comment' style={{marginTop: "40px"}}>
    //       <input type="text" placeholder='...Комментарий' />
    //     </div>
    //   </div>

    // </div>