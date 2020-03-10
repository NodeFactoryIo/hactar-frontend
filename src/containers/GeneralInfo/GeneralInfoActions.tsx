import React, {ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {ModalType, showConfirmationDialog} from "../../app/ModalRenderer/ModalSlice";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {RootState} from "../../app/rootReducer";
import {Dropdown} from "../../components/Dropdown/Dropdown";
import {NotificationBell} from "../GeneralInfo/NotificationBell/NotificationBell";
import {submitEditNode} from "../NodeList/NodeListSlice";
import MoreVert from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

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

    return (
        <div className="row-spaced upper">
            <NodeNameTitle
                title={selectedNode.name}
                description={selectedNode.description}
                onClick={props.onNodeHeaderClick}
                arrowOpen={false}
            />

            <div className="node-options">
                <NotificationBell
                    onClick={() =>
                        dispatch(
                            submitEditNode(selectedNode.id, {
                                hasEnabledNotifications: !selectedNode.hasEnabledNotifications,
                            }),
                        )
                    }
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
                            onElementClick: (): void => {
                                console.log("clicked delete");
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
};
