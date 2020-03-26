import React from "react";
import Alert, {AlertProps} from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

interface INotificationProps extends AlertProps {
    type: "success" | "error" | "warning" | "info";
    message: string;
}

export const Notification = (props: INotificationProps) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
            <Alert {...props} elevation={6} variant="filled" severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};
