import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useKeycloak } from '@react-keycloak-fork/ssr';
import Keycloak from 'keycloak-js';
import { Slide, useScrollTrigger } from '@mui/material';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const drawerWidth = 240;

export default function DrawerAppBar() {
  const { keycloak } = useKeycloak<Keycloak>();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = ['Home', 'Contact'];
  if (keycloak?.authenticated) {
    navItems.push('Profile');
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    keycloak?.logout({ redirectUri: 'http://localhost:3000/' });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            {item === 'Home' ? (
              <Link
                href="/"
                passHref
                style={{ textDecoration: 'none', color: '#000000' }}
              >
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </Link>
            ) : item === 'Contact' ? (
              <Link
                href="/contact"
                passHref
                style={{ textDecoration: 'none', color: '#000000' }}
              >
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </Link>
            ) : item === 'Profile' ? (
              <Link
                href="/profile"
                passHref
                style={{ textDecoration: 'none', color: '#000000' }}
              >
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </Link>
            ) : (
              <ListItemButton sx={{ color: '#000000' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
        {keycloak?.authenticated && (
          <Button
            variant="contained"
            sx={{ color: '#000000' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Serendipitous Snaps
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  key={item}
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <Button sx={{ color: '#fff' }}>{item}</Button>
                </Link>
              ))}
              {keycloak?.authenticated && ( // add the logout button if authenticated
              <Button sx={{ color: '#fff' }} onClick={handleLogout}>
                Logout
              </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </HideOnScroll>
  );
}
