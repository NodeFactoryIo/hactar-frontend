import React, {ReactElement} from "react";
import _ from "lodash";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../rootReducer";
import {ConfirmationDialogContainer} from "../../components/ConfirmationDialog/ConfirmationDialog";
import {removeConfirmationDialog, ModalType} from "./ModalSlice";
import {EditNodeForm} from "../../containers/GeneralInfo/EditNode/EditNodeForm";
import {submitEditNode, submitDeleteNode} from "../../containers/NodeList/NodeListSlice";
import {INodesDetails} from "../../@types/ReduxStates";

export const ModalRenderer: React.FC = (): ReactElement | null => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const selectedNode = _.find(
        state.nodeList.data,
        (node: INodesDetails) => node.node.id === state.app.selectedNodeId,
    );
    const {type} = state.modal;

    const handleNotificationsSubmit = (): void => {
        dispatch(
            submitEditNode(selectedNode!.node.id, {
                hasEnabledNotifications: !selectedNode!.node.hasEnabledNotifications,
            }),
        );
        dispatch(removeConfirmationDialog());
    };
    const notificationContent = (): string => {
        return selectedNode!.node.hasEnabledNotifications ? "Disable" : "Allow";
    };
    const handleRemoveNode = (): void => {
        if (selectedNode) dispatch(submitDeleteNode(selectedNode.node.id));
        dispatch(removeConfirmationDialog());
    };

    switch (type) {
        case ModalType.EditNode:
            return (
                <ConfirmationDialogContainer title="Edit node" showButtons={false}>
                    <EditNodeForm onSubmit={() => dispatch(removeConfirmationDialog())} />
                </ConfirmationDialogContainer>
            );
        case ModalType.Notifications:
            return (
                <ConfirmationDialogContainer
                    title={`${notificationContent()} notifications`}
                    confirmationButtonLabel={notificationContent()}
                    showButtons={true}
                    onConfirmation={handleNotificationsSubmit}
                >
                    {notificationContent()} notifications on your email from {selectedNode!.node.name}?
                </ConfirmationDialogContainer>
            );
        case ModalType.DeleteNode:
            return (
                <ConfirmationDialogContainer
                    title="Remove node"
                    confirmationButtonLabel="remove"
                    showButtons={true}
                    onConfirmation={handleRemoveNode}
                >
                    Are you sure you want to remove {selectedNode!.node.name}?
                </ConfirmationDialogContainer>
            );
        default:
            return <></>;
    }
};
