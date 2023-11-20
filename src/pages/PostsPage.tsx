import React, {useState, FC} from 'react'
import PostList from '../components/PostList'



import {AppBar, Toolbar, InputBase, styled, alpha, TextField, Container} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const PostsPage = () => {
  const [data, setData] = useState('');

  const handleData = (childData: string) => {
    
    setData(childData);
    console.log(childData);
    
  };
  


  interface IData {
    onData: (childData: string) => void
  }
 
  

    const [searchValue, setSearchValue] = useState('')
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          
        },
      }));
      


  return (
    <Container >


        <TextField  value={data} size='medium' onChange={e=> setData(e.target.value)} type='search'  sx={{mt:"70px", backgroundColor: 'white', ml: 16.6, width:'100ch', }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      
      >

      </TextField>

      

      
        <div style={{marginTop: '50px', }}>
          <PostList search={data} />
        </div>
        
    </Container>
  )
}

export default PostsPage