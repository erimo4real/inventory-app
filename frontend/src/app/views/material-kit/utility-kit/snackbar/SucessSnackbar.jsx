import { Alert, Box, Button, Snackbar } from "@mui/material";
import React from "react";

export default function SucessSnackbar({snackbarsucess}) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };

  function handleClose() {
    setState({ ...state, open: false });
  }

  return (
    <Box>
       <Snackbar open={open} 
       autoHideDuration={6000}
        onClose={handleClose}
        key={`${vertical},${horizontal}`}
        anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
         { snackbarsucess }
        </Alert>
      </Snackbar>
    </Box>
  );
}
