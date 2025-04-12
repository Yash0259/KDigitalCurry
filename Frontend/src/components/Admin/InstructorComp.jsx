import React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const InstructorComp = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Filters</InputLabel>
            <Select label="Filters" defaultValue="">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="recent">Recently Added</MenuItem>
              <MenuItem value="active">Active</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" sx={{ backgroundColor: '#1e4db7' }}>
            Add Instructor
          </Button>
        </Box>
  
        <Typography variant="h6" mb={1}>Instructor</Typography>
  
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1e4db7' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Sr No.</TableCell>
                <TableCell sx={{ color: 'white' }}>Instructor Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructors.map((inst, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{inst.name}</TableCell>
                  <TableCell>{inst.phone}</TableCell>
                  <TableCell>{inst.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

export default InstructorComp;