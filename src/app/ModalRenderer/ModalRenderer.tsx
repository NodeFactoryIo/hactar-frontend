import React, {ReactElement} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog, ModalType} from "./ModalSlice";
import {EditNodeForm} from "../../containers/GeneralInfo/EditNode/EditNodeForm";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const {type} = state.modal;

    switch (type) {
        case ModalType.EditNode:
            return (
                <ConfirmationDialogContainer title="Edit node" showButtons={false}>
                    <EditNodeForm
                        onCancel={() => dispatch(removeConfirmationDialog())}
                    />
                </ConfirmationDialogContainer>
            );
        default:
            return <></>;
    }
};
