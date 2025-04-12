import { Outlet } from 'react-router-dom';
import EduDashDrawer from './EduDashDrawer';
import Box from '@mui/material/Box';

function Layout({ role }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <EduDashDrawer role={role} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          backgroundColor: '#f9f9f9',
          minHeight: '100vh'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;