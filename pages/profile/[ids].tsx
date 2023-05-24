import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import Router from 'next/router';
import {
  Button, Card, CardContent, Typography,
} from '@mui/material';
import { deleteCookie } from 'cookies-next';
import useMe from '../../hooks/use-me';

interface User {
  id: number;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAdd: string;
  contact: string;
}

interface DetailsProps {
  user: User;
}

function logout() {
  return fetch('/api/logout', { method: 'POST' });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('https://63e1d7b34324b12d963f6754.mockapi.io/test/');
  const { data } = res;

  // map data to an array of path objects with params (id)
  const paths = data.map((user: { id: { toString: () => any; }; }) => ({
    params: { ids: user.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
  const id = context.params?.ids as string;
  const res = await axios.get(`https://63e1d7b34324b12d963f6754.mockapi.io/test/${id}`);
  const { data } = res;

  return {
    props: { user: data }, revalidate: 10,
  };
};

function Details({ user }: DetailsProps) {
  const { data: res, mutate } = useMe();

  useEffect(() => {
    if (!res || res.error) Router.push('/auth');
  }, [res]);

  if (!res || res.error) {
    return null;
  }

  function handleLogout() {
    logout().then(() => mutate());
    deleteCookie('isLogin');
  }

  return (
    <Card sx={{
      minWidth: 275,
      backgroundColor: '#f5f5f5',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      margin: 'auto',
      marginTop: '100px',
      maxWidth: '500px',
    }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Username:
          {' '}
          {user.username}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: 18,
            marginBottom: '10px',
          }}
        >
          Fullname:
          {user.firstName}
          {' '}
          {user.middleName}
          {' '}
          {user.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: 18,
            marginBottom: '10px',
          }}
        >
          Email:
          {user.emailAdd}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: 18,
            marginBottom: '10px',
          }}
        >
          Contact:
          {user.contact}
        </Typography>

        <Button
          variant="contained"
          sx={{ marginTop: '2rem' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}

export default Details;
