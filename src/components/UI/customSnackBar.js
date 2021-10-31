import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackbar = ({type, message}) => {
  const [snackState, setSnackState] = useState({
    open: true,
    Transition: Slide,
    vertical: 'bottom',
    horizontal: 'right'
  });

  const vertical = snackState.vertical;
  const horizontal = snackState.horizontal;
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackState((prev)=>{
        let snackState = {...prev};
        snackState.open = false;
        return snackState;
        }
      );
    };
    return (
        <Snackbar open={snackState.open} autoHideDuration={4000} onClose={handleClose} 
          TransitionComponent={snackState.Transition} anchorOrigin={{ vertical, horizontal}} 
          sx={{ height:'3rem' , alignItems: 'center'}}>
          
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%',height:'100%', zIndex:1500 }}>
            {message}
          </Alert>

        </Snackbar>
    )
}

export default CustomSnackbar;