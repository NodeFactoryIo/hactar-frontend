import React from "react";
import {Button} from "../Button/Button";

export interface IConfirmationDialogProps {
    children?: any;
    title: string;
    confirmationButtonLabel: string;
    onConfirmation: () => void;
}

export const ConfirmationDialog: React.FC<React.PropsWithChildren<IConfirmationDialogProps>> = (
    props: IConfirmationDialogProps
) => {
    return (
        <div className="centered confirmation-dialog-screen">
            <div className="flex-column confirmation-dialog-container">
                <h2>{props.title}</h2>
                <div>{props.children}</div>
                <div className="row button-container">
                    <Button type="primary">Cancel</Button>
                    <Button type="primary">{props.confirmationButtonLabel}</Button>
                </div>
            </div>
        </div>
    );
};
