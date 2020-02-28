import React, {ReactElement, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog} from "./ModalSlice";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const {confirmationDialog} = state.modal;

    const handleConfirmation = (): void => {
        confirmationDialog[0].onConfirmation();
        dispatch(removeConfirmationDialog());
    };

    // useEffect(() => {}, [confirmationDialog]);
    if (confirmationDialog && confirmationDialog[0])
        return (
            <ConfirmationDialogContainer
                title={confirmationDialog[0].title}
                confirmationButtonLabel={confirmationDialog[0].confirmationButtonLabel}
                onConfirmation={handleConfirmation}
                onCancel={(): void => {
                    dispatch(removeConfirmationDialog());
                }}
            >
                {confirmationDialog[0].children}
            </ConfirmationDialogContainer>
        );
    else return null;
};
