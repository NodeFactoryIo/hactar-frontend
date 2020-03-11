import React from "react";
import {Button} from "../Button/Button";
import classNames from "classnames";
import {removeConfirmationDialog} from "../../app/ModalRenderer/ModalSlice";
import {useDispatch} from "react-redux";

interface IConfirmationDialogProps {
    title: string;
    children: any;
    onConfirmation?: () => void;
    showButtons: boolean;
    confirmationButtonLabel?: string;
}

export const ConfirmationDialogContainer: React.FC<React.PropsWithChildren<IConfirmationDialogProps>> = (
    props: IConfirmationDialogProps,
) => {
    const dispatch = useDispatch();
    return (
        <div className="centered confirmation-dialog-screen">
            <div className="flex-column confirmation-dialog-container">
                <h2>{props.title}</h2>
                <div className="children">{props.children}</div>

                {props.showButtons ? (
                    <div className={classNames("row", "button-container")}>
                        <Button onClick={() => dispatch(removeConfirmationDialog())} type="secondary">
                            Cancel
                        </Button>
                        <Button onClick={props.onConfirmation} type="primary">
                            {props.confirmationButtonLabel}
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
