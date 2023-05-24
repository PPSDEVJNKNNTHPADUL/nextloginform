import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    message: '',
  });

  const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    axios.post('https://641959af29e7e36438fb4e9b.mockapi.io/contactpage', formData)
      .then(response => {
        console.log('Form submission successful', response);
        // TODO: handle successful form submission, e.g. display a success message
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          contact: '',
          message: '',
        });
      })
      .catch(error => {
        console.error('Form submission error', error);
        // TODO: handle form submission error, e.g. display an error message
      });
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Box sx={{ marginTop: 12 }}>
      <Card style={{ maxWidth: 450, margin: 'auto', padding: '10px 5px' }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Contact us
          </Typography>
          <Typography component="p" variant="body2">
            Fill up the form and I will try to get back to you within 24 hours
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid item container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  name="contact"
                  type="number"
                  label="Contact"
                  placeholder="Enter phone number"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <TextField
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Enter your message"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  />
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
              </form>
            </CardContent>
          </Card>
        </Box>
        )
        }