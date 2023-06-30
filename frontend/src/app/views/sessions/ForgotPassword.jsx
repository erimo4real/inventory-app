import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import ErrorSnackbar from "../material-kit/utility-kit/snackbar/ErrorSnackbar"
import SucessSnackbar from "../material-kit/utility-kit/snackbar/SucessSnackbar"

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarerror, setSnackbarError] = useState("");
  const [snackbarsucess, setSnackbarSucess] = useState("");
  const [snackbarright, setSnackbarright] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
     const myForm = new FormData();
     myForm.set("email", email);
      // Display the key/value pairs
      // for (var pair of myForm.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
     dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
       setSnackbar(true);
       setSnackbarError(error);
      dispatch(clearErrors());
      setInterval(function() {
        window.location.reload();
      } , 20000);
    }

    if (message) {
      setSnackbarright(true)
      setSnackbarSucess(message)
     // alert(message);
    }
  }, [dispatch, error, message]);


  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
        {  snackbar ?  <ErrorSnackbar snackbarerror={snackbarerror} /> : "" }
        {  snackbarright ?  <SucessSnackbar snackbarsucess={snackbarsucess} /> : "" }
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  required
                  name="email"
                  size="small"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                    <LoadingButton
                      fullWidth
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Reset Password
                    </LoadingButton>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
