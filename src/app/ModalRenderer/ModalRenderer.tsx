import React, {ReactElement, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog, ModalType} from "./ModalSlice";
import {EditNodeForm, IEditNodeFormData} from "../../containers/GeneralInfo/EditNode/EditNodeForm";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const {confirmationDialog} = state.modal;

    const handleEditNode = (submitData: IEditNodeFormData) => {
        console.log("clicked");
        console.log(submitData);
        dispatch(removeConfirmationDialog());
    }

    // useEffect(() => {}, [confirmationDialog]);
            
    switch (confirmationDialog) {
        case "EDITNODE" : return <ConfirmationDialogContainer
                title="Edit node"
                confirmationButtonLabel="SAVE"
                showButtons={false}
            >
                <EditNodeForm
                    // onEditNodeSubmit={(submitData) => handleEditNode(submitData)}
                    onCancel={() => dispatch(removeConfirmationDialog())}
                />
            </ConfirmationDialogContainer>
        default: return <></>
    }
        
};
