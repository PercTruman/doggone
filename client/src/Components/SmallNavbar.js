import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function SmallNavbar() {
    const navigate = useNavigate();
    const theme = useTheme();

  return (
    <div>
    <AppBar position='static'>
        <Toolbar color={theme.palette.primary.light}>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                }}
            >
                <Button
                    onClick={() => navigate('/')}
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                    }}
                >
                    Home
                </Button>
                <Button variant='text' sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                        }}onClick={() => navigate('/-login')}>
                    Login
                </Button>
                <Button variant='text' sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                        }}onClick={() => navigate('/-signup')}>
                    Signup
                </Button>
            </Box>
        </Toolbar>
    </AppBar>
</div>
  )
}

export default SmallNavbar