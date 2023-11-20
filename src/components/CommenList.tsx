import React, {FC, ChangeEvent, useState, useEffect} from 'react'
import { IComment } from '../types'
import { db } from '../firebase/firebase'
import { doc, getDoc  } from 'firebase/firestore'
import CommentItem from './CommentItem'

interface ICommentsList {
  postName: string

}
const CommentList: FC<ICommentsList> = ({ postName}) => {
  const [commentsList, setcommentsList] = useState<IComment[]>([])
  try {
    const getComments =  async(postName:string) =>{
      const postRef = doc(db, 'posts', postName)
      const post = await getDoc(postRef);
      const postdata = post.data()
      const commentsArr:[] = postdata?.comments
      setcommentsList(commentsArr);
    }
    getComments(postName)

  }
  catch{
    console.log('Прои');
    
  }
    

  
  return commentsList !== undefined  ? (
    <div style={{margin:'auto'}}>
    
      {commentsList.map(comment =>(
       
        <CommentItem {...comment} />
      ))}
    
    </div>
      
    
  ) : (
    <div>Комментариев нет</div>
  )
}

export default CommentList