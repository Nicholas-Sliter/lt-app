import { Alert, Snackbar } from '@mui/material';
import styles from './SnackAlert.module.scss';


interface SnackAlertProps {
    open: boolean;
    onClose: Function;
    message: string;
    severity: "error" | "success" | "info" | "warning";
    duration?: number;
    closeable?: boolean;
}


function SnackAlert({
    open,
    onClose,
    message,
    severity,
    duration = 10000,
    closeable = false
}: SnackAlertProps) {


    const alertClose = (closeable) ? () => {
        onClose();
    } : undefined;


    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={duration}
            onClose={() => {
                onClose();
            }}
        // action={action}
        >
            <Alert onClose={alertClose} severity={severity} className={styles.SnackAlert} >
                {message}
            </Alert>
        </Snackbar>
    );



}


export default SnackAlert;