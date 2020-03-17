import React, {ReactElement, useState, useEffect} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {formatBytes} from "../../app/utils";
import {storeSelectedNode} from "../Dashboard/AppSlice";
import {NotificationBell} from "../GeneralInfo/NotificationBell/NotificationBell";

interface INodeListProps {
    display?: boolean;
    onNodeHeaderClick: () => void;
}

export const NodeListContainer = ({display, onNodeHeaderClick}: INodeListProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const diskInfoList = state.nodeList.data;
    const [showArrow, setShowArrow] = useState<boolean>(true);
    const dispatch = useDispatch();

    const isNodeSelected = (selectedNodeIndex: number, listIndex: number): string => {
        if (selectedNodeIndex === listIndex + 1) return "selected";
        else return "notSelected";
    };

    const onNodeClick = (index: number): void => {
        dispatch(storeSelectedNode(diskInfoList[index].id));
        onNodeHeaderClick();
    };

    useEffect(() => {
        if (diskInfoList.length > 0) setShowArrow(false);
    }, [diskInfoList]);

    return (
        <div className={classNames("flex-column node-list-container", {hidden: !display})}>
            <div className="upper">
                <NodeNameTitle title="Your nodes" onClick={onNodeHeaderClick} showArrow={showArrow} arrowOpen={true} />
            </div>

            <div className="lower row-spaced header">
                <p>Node name</p>
                <p>Free / Taken space</p>
                <p>Status</p>
            </div>

            {diskInfoList.map((node: any, index: number) => (
                <div key={index} className="node-list lower row-spaced">
                    <div className="node-options centered">
                        <p
                            className={`node-name ${isNodeSelected(state.app.selectedNodeId!, index)}`}
                            onClick={(): void => onNodeClick(index)}
                        >
                            {node.name}
                        </p>
                        <NotificationBell hasEnabledNotifications={node.hasEnabledNotifications} />
                    </div>

                    <p>
                        {formatBytes(node.diskDetails.freeSpace)} / {formatBytes(node.diskDetails.takenSpace)}
                    </p>
                    <p className="yellow">Online</p>
                </div>
            ))}
        </div>
    );
};
