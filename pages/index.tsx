import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { useKeycloak } from '@react-keycloak-fork/ssr';
import Keycloak from 'keycloak-js';
import { LoremIpsum } from '@/components/LoremIpsum';
import { useTheme } from 'next-themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const variantButton = {
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const cards = [
  {
    image: 'https://source.unsplash.com/random/800x600',
    heading: 'Card 1',
    description: 'This is the first card',
  },
  {
    image: 'https://source.unsplash.com/random/800x601',
    heading: 'Card 2',
    description: 'This is the second card',
  },
  {
    image: 'https://source.unsplash.com/random/800x602',
    heading: 'Card 3',
    description: 'This is the third card',
  },
  {
    image: 'https://source.unsplash.com/random/800x603',
    heading: 'Card 4',
    description: 'This is the first card',
  },
  {
    image: 'https://source.unsplash.com/random/800x604',
    heading: 'Card 5',
    description: 'This is the second card',
  },
  {
    image: 'https://source.unsplash.com/random/800x605',
    heading: 'Card 6',
    description: 'This is the third card',
  },
];

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const { keycloak } = useKeycloak<Keycloak>();
  return (
    <>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 5,
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                  },
                },
              }}
            >
              <Typography
                variant="h1"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Serendipitous Snaps
              </Typography>
            </motion.div>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Serendipitous Snaps is a website featuring a diverse collection of
              random images captured by amateur and professional photographers
              from around the world. The images are curated to showcase the
              creativity and skill of the photographers and to inspire viewers
              to appreciate the art of photography. Whether youre a photography
              enthusiast or simply looking for a visual escape, Serendipitous
              Snaps has something for everyone.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                endIcon={
                  resolvedTheme === "light" ? (
                    <DarkModeIcon />
                  ) : (
                    <LightModeIcon />
                  )
                }
                onClick={() =>
                  setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
              />
              <Button
                component={motion.button}
                variants={variantButton}
                whileHover="hover"
                variant="contained"
                onClick={() => {
                  if (keycloak) {
                    window.location.href = keycloak.createLoginUrl({
                      redirectUri: `${window.location.origin}/profile`,
                    });
                  }
                }}
              >
                Sign-in
              </Button>
              <Button
                component={motion.button}
                variants={variantButton}
                whileHover="hover"
                variant="outlined"
                onClick={() => {
                  if (keycloak) {
                    window.location.href = keycloak.createRegisterUrl({
                      redirectUri: `${window.location.origin}/profile`,
                    });
                  }
                }}
              >
                Sign-up
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, cardindex) => (
              <Grid item xs={12} sm={6} md={4} key={cardindex}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <motion.div
                    key={cardindex}
                    className="card"
                    whileHover={{
                      position: "relative",
                      zIndex: 1,
                      background: "white",
                      scale: [1, 1.4, 1.2],
                      rotate: [0, 10, -10, 0],
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        objectFit: "cover",
                      }}
                      image={card.image}
                      alt="random"
                    />
                  </motion.div>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="body1">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      component={motion.button}
                      variants={variantButton}
                      whileHover="hover"
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      component={motion.button}
                      variants={variantButton}
                      whileHover="hover"
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container>
          <LoremIpsum />
        </Container>
      </main>
    </>
  );
}
