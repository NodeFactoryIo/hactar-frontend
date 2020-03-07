import React from "react";
import {Button} from "../Button/Button";
// import {IConfirmationDialogProps} from "../../app/ModalRenderer/ModalSlice";
import classNames from "classnames";

interface IConfirmationDialogProps {
    title: string;
    children: any;
    onCancel?: () => void;
    onConfirmation?: () => void;
    showButtons: boolean;
    confirmationButtonLabel: string;
}

export const ConfirmationDialogContainer: React.FC<React.PropsWithChildren<IConfirmationDialogProps>> = (
    props: IConfirmationDialogProps,
) => {
    return (
        <div className="centered confirmation-dialog-screen">
            <div className="flex-column confirmation-dialog-container">
                <h2>{props.title}</h2>
                <div className="children">{props.children}</div>
                <div className={classNames("row", "button-container", {hidden: !props.showButtons})}>
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
