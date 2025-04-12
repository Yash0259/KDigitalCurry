import React from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function EduDashDrawer({ role }) {
  const navigate = useNavigate();

  const adminMenuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/admin' },
    { text: 'Instructor List', icon: <PeopleIcon />, path: '/admin/instructors' },
    { text: 'Courses', icon: <BookIcon />, path: '/admin/courses' },
    { text: 'Lectures', icon: <VideoLibraryIcon />, path: '/admin/lectures' },
  ];

  const instructorMenuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/instructor' },
    { text: 'Lectures', icon: <VideoLibraryIcon />, path: '/instructor/lectures' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : instructorMenuItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      {/* Header */}
      <Typography 
        variant="h6" 
        sx={{ 
          p: 2, 
          fontWeight: 'bold', 
          color: '#1976d2', 
          textAlign: 'center' 
        }}
      >
        EduDash {role && `(${role})`}
      </Typography>
      
      <Divider />
      
      {/* Main Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: '#555' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: 'medium', 
                  color: '#333' 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {/* Logout */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon sx={{ color: '#555' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontWeight: 'medium', 
                color: '#333' 
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}