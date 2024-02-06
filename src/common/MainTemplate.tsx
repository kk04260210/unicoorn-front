import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';


import { useLoginUser } from '../_wheel/security/LoginUserProvider';

export const MainTemplate: FC = () => {
  const { logout } = useLoginUser();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', background: '#D21919' }}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <HomeRepairServiceIcon sx={{ mr: 2 }} />
              <Box>
                <label  style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="h6">JobNavi Account</Typography>
                </label>
              </Box>
            </Box>
            <Button type="submit" color="inherit" onClick={() => logout(false)}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container sx={{ marginTop: 10, marginBottom: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};
