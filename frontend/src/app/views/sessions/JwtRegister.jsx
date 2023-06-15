import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { Formik } from 'formik';
import { useEffect , useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import ErrorSnackbar from "../material-kit/utility-kit/snackbar/ErrorSnackbar"
import SucessSnackbar from "../material-kit/utility-kit/snackbar/SucessSnackbar"
// import  PositionedSnackbar from  "../material-kit/snackbar/PositionedSnackbar";


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  confirmPwd: '',
  username: '',
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
    confirmPwd: Yup.string()
    .required('confirm Password is mendatory')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
  username: Yup.string().required('username is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!')
});

const JwtRegister = () => {

  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarright, setSnackbarright] = useState(false);
  const [snackbarerror, setSnackbarError] = useState("");
  const [snackbarsucess, setSnackbarSucess] = useState("");
  const { error, loading, isRegisterd } = useSelector(
    (state) => state.user
  );

  const theme = useTheme();
 
  const navigate = useNavigate(); 
 
  const handleFormSubmit = (values) => {
   
    const myForm = {
      "name": values.username,
      "email": values.email,
       "password" : values.password
    }    
      dispatch(register(myForm));  
      values.username = "";
      values.email = ""; 
      values.password = ""; 
      values.confirmPwd = "";    
  };

  useEffect(() => {
    if (error) {
      setSnackbar(true);
      setSnackbarError(error);
      dispatch(clearErrors());
      setInterval(function() {
        window.location.reload();
      } , 7000);
    }

    if (isRegisterd) {
      setSnackbarright(true)
      setSnackbarSucess("USER REGISTERED SUCCESSFULLY !!!!")
      setInterval(function() {
          navigate('/session/signin');
        } , 5000)
      // history.push(redirect);
    }
  }, [dispatch, error, isRegisterd, navigate]);


  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
          {  snackbar ?  <ErrorSnackbar snackbarerror={snackbarerror} /> : "" }
          {  snackbarright ?  <SucessSnackbar snackbarsucess={snackbarsucess} /> : "" }
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />
                      <TextField
                      fullWidth
                      size="small"
                      name="confirmPwd"
                      type="password"
                      label="confirm Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.confirmPwd}
                      onChange={handleChange}
                      helperText={touched.confirmPwd && errors.confirmPwd}
                      error={Boolean(errors.confirmPwd && touched.confirmPwd)}
                      sx={{ mb: 2 }}
                    />

                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
