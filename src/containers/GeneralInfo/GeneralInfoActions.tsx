import React, {ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {ModalType, showConfirmationDialog} from "../../app/ModalRenderer/ModalSlice";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {RootState} from "../../app/rootReducer";
import {Dropdown} from "../../components/Dropdown/Dropdown";
import {NotificationBell} from "../GeneralInfo/NotificationBell/NotificationBell";

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
                <NotificationBell hasEnabledNotifications={true} />
                <i onClick={() => props.setShowDropdown(true)} className="material-icons">
                    more_vert
                </i>
                <Dropdown
                    showDropdown={props.showDropdown}
                    elements={[
                        {
                            title: "Edit node",
                            iconId: "edit",
                            onElementClick: onEditNodeClick,
                        },
                        {
                            title: "Remove node",
                            iconId: "delete",
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
