import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbar } from '../util/useSnackbar';
import Slide from '@mui/material/Slide';
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide ref={ref} {...props} direction='left' timeout={{enter: 500, exit:300}}/>;
});


const SnackbarComponent = () => {
    const { message, hideMessage } = useSnackbar();
    return (
        <Snackbar sx={{ top: '80px !important' }} anchorOrigin={{ vertical: 'top', horizontal: message?.position ? message?.position : 'right' }} open={message !== null} autoHideDuration={3000} onClose={hideMessage} TransitionComponent={Transition}>
            <Alert severity={message?.severity} sx={{ width: '100%', fontSize: 17 }} onClose={hideMessage}>
                {message?.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;
