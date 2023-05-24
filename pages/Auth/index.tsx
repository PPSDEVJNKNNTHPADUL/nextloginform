import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { setCookie } from 'cookies-next';
import useMe from '../../hooks/use-me';

function login(userId: string) {
  return axios.post('/api/login', { userId });
}

export default function IndexPage() {
  const router = useRouter();
  const { data: res, mutate } = useMe();
  const [user, setUser] = useState('');
  const [password, setPass] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (res?.data) {
      router.push(`/profile/${res.data.id}`); // use the user ID in the redirect
    }
  }, [res, router]);

  if (res?.data) {
    return null;
  }
  if (isBlocked) {
    Swal.fire({
      icon: 'error',
      title: 'You have reached the maximum number of login attempts. Please try again after 30 minutes.',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/finduser', { username: user, password });
      if (response.data.message === 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Successful Login.',
          showConfirmButton: false,
          timer: 1500,
        });
        const userId = response.data.id;
        login(userId).then(() => mutate());
        setCookie('isLogin', 'ss');
      }
    } catch {
      setAttempts(attempts + 1);
      setCookie('loginAttempts', attempts, { maxAge: 1800 });
      if (attempts === 2) {
        setIsBlocked(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid User or Password',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card style={{ maxWidth: 450, margin: 'auto', padding: '20px 5px' }}>
          <CardContent>
            <Typography sx={{ textAlign: 'center' }} component="h6">Login</Typography>
            <TextField
              label="Username"
              variant="outlined"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              sx={{ margin: 1 }}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              sx={{ margin: 1 }}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{ margin: 2 }}
            >
              LogIn
            </Button>
            <Link href="/registration">
              <Typography>Dont have an account? Sign Up</Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
