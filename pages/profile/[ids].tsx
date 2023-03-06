import { GetStaticPaths, GetStaticProps } from 'next';
import axios from 'axios';
import useMe from "../../hooks/use-me";
import Router from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Button, Typography } from '@mui/material';

const DynamicHeader = dynamic(() => import("../../components/header"), {});

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
  return fetch("/api/logout", { method: "POST" });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get('https://63e1d7b34324b12d963f6754.mockapi.io/test/');
  const data: User[] = res.data;

  // map data to an array of path objects with params (id)
  const paths = data.map((user) => {
    return {
      params: { ids: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<DetailsProps> = async (context) => {
  const id = context.params?.ids as string;
  const res = await axios.get(`https://63e1d7b34324b12d963f6754.mockapi.io/test/${id}`);
  const data: User = res.data;

  return {
    props: { user: data },
  };
};

const Details = ({ user }: DetailsProps) => {
  const { data: res, mutate } = useMe();

  useEffect(() => {
    if (!res || res.error) Router.replace("/Auth");
  }, [res]);

  if (!res || res.error) {
    return null;
  }

  function handleLogout() {
    logout().then(() => mutate());
  }

  return (
    <>
    <DynamicHeader/>
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        mt:'12',
    }}>
      <Typography variant="h1">{user.username}</Typography>
      <Typography variant="body1">{user.firstName}</Typography>
      <Typography variant="body1">{user.middleName}</Typography>
      <Typography variant="body1">{user.lastName}</Typography>
      <Typography variant="body1">{user.emailAdd}</Typography>
      <Typography variant="body1">{user.contact}</Typography>
      <Button
        variant="contained"
        sx={{marginTop: '2rem',}}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
    </>
  );
};

export default Details;

