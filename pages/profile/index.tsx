import { useKeycloak } from '@react-keycloak-fork/ssr';
import type { KeycloakTokenParsed } from 'keycloak-js';
import Keycloak from 'keycloak-js';
import type { NextPage } from 'next';
import * as React from 'react';
import { Typography, Card, CardContent, Avatar, Divider, Button, Box, Popover } from '@mui/material';

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
};


const ProfilePage: NextPage = () => {
  const { keycloak } = useKeycloak<Keycloak>();
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

  const isLoggedIn = keycloak?.authenticated;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const profile = isLoggedIn ? (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Card sx={{
        width:"200px",
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        maxWidth: anchorEl?.clientWidth,
      }}>
        <Box
          sx={{
            borderRadius: '10px 10px 0 0',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: '50px',
              height: '50px',
              marginRight: '10px',
            }}
          >
            {parsedToken?.given_name?.charAt(0)}
            {parsedToken?.family_name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5"> {parsedToken?.preferred_username ?? ''}</Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 18,
              marginBottom: '10px',
            }}
          >
            <strong>First Name:</strong> {parsedToken?.given_name ?? ''}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 18,
              marginBottom: '10px',
            }}
          >
            <strong>Last Name:</strong> {parsedToken?.family_name ?? ''}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 18,
              marginBottom: '10px',
            }}
          >
            <strong>Email:</strong> {parsedToken?.email ?? ''}
          </Typography>
        </CardContent>
      </Card>
    </Popover>
  ) : (
    <Typography variant="body1" color="textSecondary">Please login to view profile.</Typography>
  );

  return (
    <>
      <Button
      variant='contained'
  onClick={handleClick}
  sx={{
    width: '200px',
    marginTop: '60px',
    marginLeft: '15px',
    position: 'absolute',
    top: '0',
    left: '0',
  }}
>
  Show Profile
</Button>
      {profile}
    </>
  );
};
export default ProfilePage