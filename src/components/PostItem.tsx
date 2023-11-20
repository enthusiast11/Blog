import React, {FC, useState} from 'react'
import CreateComment from './CreateComment'
import { DocumentData } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { doc, getDoc, updateDoc, increment  } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import like from './icons/like.svg'
import { MdFavorite } from "react-icons/md";

import { Card, CardHeader, CardContent, CardActions, Collapse, Avatar, Typography, MenuItem, ListItem , Chip, createTheme, ThemeProvider  } from '@mui/material'
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IData {
  comments: [{data: string, name: string, value: string}]
  hashteg: [{ key: number, label: string }];
  header: string;
  liked: string;
  main: string;
  owner: string;
  postKey: string;
}

export const PostItem = ({item}: {item: DocumentData }) => {
  const userd = getAuth().currentUser?.uid as string

  const [like, setLike] = useState(localStorage.getItem(item.header))
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(item);
  
  async function likeStatistics(value: number) {
      const userRef = doc(db, 'users', userd )
      await updateDoc(userRef, {
        likes: increment(value)
      }).then(()=> console.log('Данные обновились')
      )
  }
    // const storage = getStorage();
    // const imagesRef = ref(storage, 'images'); - ссылка на репозиторий с картинками внутири Storage
    // const spaceRef = ref(storage, 'images/space.jpg') - ссылка на конкретный элемент в нутри этого репозитория
  
  const toggleLike =() => {
        if (like == 'gray') {
          localStorage.setItem(item.header, 'red');
          setLike('red')
          
          likeStatistics(+1)

          
        } else {
          localStorage.setItem(item.header, 'black');
          setLike('gray')
          
          likeStatistics(-1)

        }
  }
  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            width: '80%',
            margin: ' auto',
            marginBottom: '40px'
          },
        },
      },
    },
  });

          
  return (
    <ThemeProvider theme={theme}>
      <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.header}
        subheader="September 14, 2016"
      />
     
      <CardContent>
        <Typography sx={{display: 'flex', justifyContent: 'flex-start'}}>
          {Array.isArray(item.hashteg) ?

          item.hashteg.map((data: { key: number, label: string }) => {
          


            return (
              <div >
                <ListItem  key={data.key}>
                  <Chip
                    label={data.label}

                  />
                </ListItem>
              </div>

            );
          }): 'Это не то'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {item.main}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <MdFavorite  color={like!} onClick={toggleLike}/>
        </IconButton>
        <IconButton aria-label="share">
          
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
         <CommentOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <CreateComment show={'block'} name={item.header}/>

        </CardContent>
      </Collapse>
    </Card>

    </ThemeProvider>
   

  
  )
}
