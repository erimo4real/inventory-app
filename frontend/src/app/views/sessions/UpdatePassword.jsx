import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { Formik } from 'formik';
import { useState , useEffect} from 'react';
import { NavLink, } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import ErrorSnackbar from "../material-kit/utility-kit/snackbar/ErrorSnackbar"
import SucessSnackbar from "../material-kit/utility-kit/snackbar/SucessSnackbar"


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
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
    oldPassword : '',
    newPassword: '',
    confirmPassword: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
    newPassword: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
    confirmPassword: Yup.string()
    .required('confirm Password is mendatory')
    .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
});

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarerror, setSnackbarError] = useState("");
  const [snackbarright, setSnackbarright] = useState(false);
  const [snackbarsucess, setSnackbarSucess] = useState("");

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const theme = useTheme();

  const navigate = useNavigate(); // <-- access navigate function
  const { token } = useParams(); // <-- access token path parameter
 

  const updatePasswordSubmit = async (values) => {

    const myForm = new FormData();

    myForm.set("oldPassword", values.oldPassword);
    myForm.set("newPassword", values.newPassword);
    myForm.set("confirmPassword", values.confirmPassword);

     dispatch(updatePassword(myForm));

  };

  useEffect(() => {
    if (error) {
        setSnackbar(true);
        setSnackbarError(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {

        setSnackbarright(true);
        setSnackbarSucess("Profile Updated Successfully !!!!")
        setInterval(function() {
          navigate("/session/signin"); // <-- call navigate here
          // history.push("/session/signin");
          } , 9000)
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
        {  snackbar ?  <ErrorSnackbar snackbarerror={snackbarerror} /> : "" }
        {  snackbarright ?  <SucessSnackbar snackbarsucess={snackbarsucess} /> : "" }
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={updatePasswordSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="oldPassword"
                      label="oldPassword"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      onChange={handleChange}
                      helperText={touched.oldPassword && errors.oldPassword}
                      error={Boolean(errors.oldPassword && touched.oldPassword)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="newPassword"
                      type="password"
                      label="newPassword"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.newPassword}
                      onChange={handleChange}
                      helperText={touched.newPassword && errors.newPassword}
                      error={Boolean(errors.newPassword && touched.newPassword)}
                      sx={{ mb: 1.5 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="confirmPassword"
                      type="password"
                      label="confirmPassword"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      sx={{ mb: 1.5 }}
                    />

                    <LoadingButton
                      fullWidth
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Update Password
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
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
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default UpdatePassword;
