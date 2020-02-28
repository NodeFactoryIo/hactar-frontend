import React from "react";
import {Button} from "../Button/Button";
import {IConfirmationDialogProps} from "../../app/ModalRenderer/ModalSlice";

interface IConfirmationDialogContainerProps extends IConfirmationDialogProps {
    onCancel: () => void;
}

export const ConfirmationDialogContainer: React.FC<React.PropsWithChildren<IConfirmationDialogContainerProps>> = (
    props: IConfirmationDialogContainerProps,
) => {
    return (
        <div className="centered confirmation-dialog-screen">
            <div className="flex-column confirmation-dialog-container">
                <h2>{props.title}</h2>
                <div className="children">{props.children}</div>
                <div className="row button-container">
                    <Button onClick={props.onCancel} type="secondary">
                        Cancel
                    </Button>
                    <Button onClick={props.onConfirmation} type="primary">
                        {props.confirmationButtonLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};
