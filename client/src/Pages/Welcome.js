import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';




function Welcome() {
  const navigate = useNavigate()
 
  return (
    <div>
      < Typography variant='h2' style={{paddingTop:'2rem', color:'#76B5C5'}}>Welcome to <span style={{fontWeight:'bold'}}>Doggone!</span></Typography> 
      <Typography variant='h5'style={{color:'#76B5C5', marginBottom:'8rem'}}>Helping owners reunite with their pets</Typography>
      <Grid2  container spacing={3} display={'flex'} justifyContent='space-between'  sx={{margin: '0 auto',width:'60%'}}>
        <Box sx={{backgroundColor:'#76B5C5', color:'black', height:'100%', width:'300px',  margin:'0',fontWeight:'bold',padding:'1.5rem', borderRadius:'5px'}}variant='contained'>I've lost my dog: please <Link onClick={()=>navigate('/-login')} style={{color:'#F6E89D'}}> Login </Link> or <Link  onClick={()=>navigate('/-signup')}style={{color:'#F6E89D'}}>Signup</Link></Box>
        <Box onClick={()=>navigate('/-new_sighting')} sx={{backgroundColor:'#F6E89D', color:'black', width:'300px', height:'100%', fontWeight:'bold', margin: '0', padding:'1.5rem', borderRadius:'5px' }}> I'd like to report a sighting (No account required)</Box>
      </Grid2>
     
       
    </div>
   
  )
}

export default Welcome;