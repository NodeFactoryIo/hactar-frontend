import React, {ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {ModalType, showConfirmationDialog} from "../../app/ModalRenderer/ModalSlice";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {RootState} from "../../app/rootReducer";
import {Dropdown} from "../../components/Dropdown/Dropdown";
import {NotificationBell} from "../GeneralInfo/NotificationBell/NotificationBell";
import {AgeTooltip} from "../../components/Tooltip/Tooltip";
import MoreVert from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Info from "@material-ui/icons/Info";

interface IGeneralInfoActionsProps {
    onNodeHeaderClick: () => void;
    setShowDropdown: (show: boolean) => void;
    showDropdown: boolean;
}

export const GeneralInfoActions = (props: IGeneralInfoActionsProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const selectedNode = _.find(state.nodeList.data, (node: any) => node.id === state.app.selectedNodeId);
    const dispatch = useDispatch();

    const onEditNodeClick = (): void => {
        dispatch(showConfirmationDialog(ModalType.EditNode));
        props.setShowDropdown(false);
    };

    const onDeleteClick = (): void => {
        dispatch(showConfirmationDialog(ModalType.DeleteNode));
        props.setShowDropdown(false);
    };

    return (
        <div className="row-spaced upper">
            <NodeNameTitle
                title={selectedNode.name}
                description={selectedNode.description}
                onClick={props.onNodeHeaderClick}
                arrowOpen={false}
            />

            <div className="node-options">
                <AgeTooltip content={selectedNode.createdAt}>
                    <Info />
                </AgeTooltip>
                <NotificationBell
                    onClick={() => dispatch(showConfirmationDialog(ModalType.Notifications))}
                    hasEnabledNotifications={selectedNode.hasEnabledNotifications}
                />
                <MoreVert onClick={() => props.setShowDropdown(true)} />
                <Dropdown
                    showDropdown={props.showDropdown}
                    elements={[
                        {
                            title: "Edit node",
                            iconId: <Edit />,
                            onElementClick: onEditNodeClick,
                        },
                        {
                            title: "Remove node",
                            iconId: <Delete />,
                            onElementClick: onDeleteClick,
                        },
                    ]}
                />
            </div>
        </div>
    );
};
