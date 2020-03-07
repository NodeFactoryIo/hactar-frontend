import React, {ReactElement} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog, ModalType} from "./ModalSlice";
import {EditNodeForm} from "../../containers/GeneralInfo/EditNode/EditNodeForm";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const {selectedNodeId} = state.app;
    const {type} = state.modal;

    if (selectedNodeId) {
        switch (type) {
            case ModalType.EditNode:
                return (
                    <ConfirmationDialogContainer title="Edit node" confirmationButtonLabel="SAVE" showButtons={false}>
            >
                <EditNodeForm
                            onCancel={() => dispatch(removeConfirmationDialog())}
                            selectedNodeId={selectedNodeId}
                />
                    </ConfirmationDialogContainer>
                );
            default:
                return <></>;
        }
    } else return <></>;
        
};
