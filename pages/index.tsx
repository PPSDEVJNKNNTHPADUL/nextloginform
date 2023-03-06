import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/header"), {});

const cards = [
  {
    image: "https://source.unsplash.com/random/800x600",
    heading: "Card 1",
    description: "This is the first card",
  },
  {
    image: "https://source.unsplash.com/random/800x601",
    heading: "Card 2",
    description: "This is the second card",
  },
  {
    image: "https://source.unsplash.com/random/800x602",
    heading: "Card 3",
    description: "This is the third card",
  },
  {
    image: "https://source.unsplash.com/random/800x603",
    heading: "Card 4",
    description: "This is the first card",
  },
  {
    image: "https://source.unsplash.com/random/800x604",
    heading: "Card 5",
    description: "This is the second card",
  },
  {
    image: "https://source.unsplash.com/random/800x605",
    heading: "Card 6",
    description: "This is the third card",
  },
];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DynamicHeader />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 5,
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Serendipitous Snaps
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Serendipitous Snaps is a website featuring a diverse collection of
              random images captured by amateur and professional photographers
              from around the world. The images are curated to showcase the
              creativity and skill of the photographers and to inspire viewers
              to appreciate the art of photography. Whether you're a photography
              enthusiast or simply looking for a visual escape, Serendipitous
              Snaps has something for everyone.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="/Auth">Sign-in</Button>
              <Button variant="outlined" href="/Registration">Sign-up</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card,index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
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

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
