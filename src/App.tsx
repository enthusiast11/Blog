import React, {useState, useEffect} from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import {CreatePost} from './components/CreatePost';
import Profile from './components/Profile';
import Registerpage from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import { useAppDispatch } from './hooks/redux-hooks';
import { removeUser } from './store/slices/userSlice';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';

import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';




function App() {
  const dispatch = useAppDispatch()
  const userd = getAuth().currentUser?.uid as string
  const [username, setUserName] = useState('')
  function logOut() {
      localStorage.clear()
      dispatch(removeUser())
  }
  async function getData() {
      try{
          let userref = doc(db, 'users', userd )
          const userDocumentSnapshot = await getDoc(userref);
          const userdata = userDocumentSnapshot.data();
           let user = await userdata!.name 
           setUserName(user)
      }catch{
          console.log('ошибка');
          
      }
      
  }
  useEffect(() => {
      getData()
  })


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }

  return (
    <div>

    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem key={'Tape'} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Button><Link style={{textDecoration:'none', color: 'black'}} to='/Post_Tape'>Tape</Link></Button></Typography>
                </MenuItem>
                <MenuItem key={'Create'}  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Button><Link style={{textDecoration:'none', color: 'black'}} to='/Create_Post'>Create</Link></Button></Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <MenuItem key={'Tape'} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Button><Link style={{textDecoration:'none', color: 'white'}} to='/Post_Tape'>Tape</Link></Button></Typography>
                </MenuItem>
                <MenuItem key={'Create'}  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Button><Link style={{textDecoration:'none', color: 'white'}} to='/Create_Post'>Create</Link></Button></Typography>
                </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={'Profile'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"> <Button><Link style={{textDecoration:'none', color: 'black'}} to='/Profile'>Profile</Link></Button></Typography>
                </MenuItem>
                <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Button style={{textDecoration:'none', color: 'black'}} onClick={()=> logOut() }>Logout</Button></Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      <Routes>

        <Route path='/Login' element={<LoginPage/>} />
        <Route path='/Register' element={<Registerpage/>} />
        <Route path='/Create_Post' element={<CreatePost  />} />
        <Route path='/Post_Tape' element={<PostsPage />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    

     </div> 
      

  );
}

export default App;

