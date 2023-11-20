import React, {FC} from 'react'

import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded';
import { Card, Avatar, CardActionArea, CardHeader, CardContent, Typography, CardActions, makeStyles, Button } from '@mui/material';

interface IComment {
    name: string
    data: string
    value: string

}

const CommentItem: FC<IComment> = (comment) => {

  return (
    <Card  sx={{width: 600, borderRadius: 5, height: 180, marginBottom: 5, }}>
    <CardHeader
      avatar={
        <Avatar  aria-label="recipe">
          R
        </Avatar>
      }
      
      title={comment.name}
      subheader={comment.data}
    />

     
      <CardContent >
        
        <Typography variant="body2" color="text.secondary">
          {comment.value}
        </Typography>
      </CardContent>

    <Button>
        <ShortcutRoundedIcon />

    </Button>
        
  </Card>
  )
}

export default CommentItem