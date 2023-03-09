import React, { useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import dynamic from "next/dynamic";
import useMe from "@/hooks/use-me";
import Router from "next/router";
import { hasCookie } from "cookies-next";

const DynamicHeader = dynamic(() => import("../components/header"), {});

export default function ContactPage() {
  // const { data: res } = useMe();

  // useEffect(() => {
  //   const isLogin = hasCookie("session");
  
  //   if (isLogin) {
  //     if (!res || res.error) {
  //       Router.push("/auth");
  //     }
  //   }
  // }, [res]);
  
  return (
    <>
    <DynamicHeader/>
    <Box sx={{marginTop:12}}>
        <Card style={{ maxWidth: 450, margin: "auto", padding: "10px 5px",}}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Contact us
            </Typography>
            <Typography component="p" variant="body2">
              Fill up the form and I will try to get back to you within 24 hours
            </Typography>
            <Grid item container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  label="First Name"
                  placeholder="Enter first name"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12}sx={{ p: 1 }}>
                <TextField
                  label="Last Name"
                  placeholder="Enter last name"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  type="number"
                  label="Contact"
                  placeholder="Enter phone number"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Enter your message"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Box>
    </>
  );
}
