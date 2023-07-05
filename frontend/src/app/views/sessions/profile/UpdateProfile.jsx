import React from 'react'
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { UpdateAccountProfile } from './updateprofile-account/updateaccount-profile';
import { UpdateAccountProfileDetails } from './updateprofile-account/updateaccount-profile-details';

const UpdateProfile = () => {
  return (
    <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
             SETTINGS
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <UpdateAccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <UpdateAccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
  )
}

export default UpdateProfile
