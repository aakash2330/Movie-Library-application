"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './sidenav.css';
import { grey } from '@mui/material/colors';
// import BugLogo from '../buGamersLogo/bugLogo';
import Glitch from '../glitch/glitch';
import { Button } from '../button';
import Image from 'next/image';
import menuIcon from "./icons8-menu-64.png"
import Link from 'next/link'

export default function TemporaryDrawer() {

 
  const [navMenuState,setNavMenuState]=React.useState([
    {
      title:'HOME',
      page:'/'
    },
    {
    title:'GALLERY',
    page:'/movies-list'
  },
  {

    title:'ADD-MOVIES',
    page:'/add-movies'
  },
  {
    title:'DOWNLOAD LIST',
    page:'/download'
  },

  
  ])


  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor:any, open:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  

  const list = (anchor:any) => (
    
    <div id='drawer'>
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>   
         {navMenuState.map((text, index) => (
          <ListItem key={text.title} disablePadding>
            <ListItemButton>
            {/* <ListItemText ><h1>{text}</h1></ListItemText> */}
            
            <ListItemText style={{fontWeight:"bold"}} onClick={()=>{
             
            }}><Link href={text.page}><Glitch GlitchText={text.title}></Glitch></Link></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Divider />
      <List>
        {[].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText><Glitch GlitchText={text}></Glitch></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}


        {/* {localStorage.getItem("token")? <ListItem key={"LOGOUT"} disablePadding>
            <ListItemButton>
              <ListItemText onClick={handleLogout} ><Glitch GlitchText={"LOGOUT"}></Glitch></ListItemText>
            </ListItemButton>
          </ListItem>:<></>}
        */}


      </List>
    </Box>
    </div>
  );

  return (
    <>
    <div >
      {/* {['L'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button id="sideMenuOpener" onClick={toggleDrawer("left", true)}></Button>
          <Drawer id='draw'
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}
        <React.Fragment key={"left"}>
        <Image className='fixed' src={menuIcon} alt="SideMenuOpener"id="sideMenuOpener"  onClick={toggleDrawer("left", true)} priority={true}/>
          <Drawer id='draw'
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
        <div onClick={toggleDrawer("left", true)} style={{color:"green" , backgroundColor:"black"}}>
           
        </div>
    </>
  );
}