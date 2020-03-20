import React, {ReactElement, useState, useEffect} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {formatBytes} from "../../app/utils";
import {storeSelectedNode} from "../Dashboard/AppSlice";
import {NotificationBell} from "../GeneralInfo/NotificationBell/NotificationBell";
import {INodesDetails} from "../../@types/ReduxStates";

interface INodeListProps {
    display?: boolean;
    onNodeHeaderClick: () => void;
}

export const NodeListContainer = ({display, onNodeHeaderClick}: INodeListProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const diskInfoList = state.nodeList.data;
    const [showArrow, setShowArrow] = useState<boolean>(true);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
    const dispatch = useDispatch();

    const isNodeSelected = (nodeIndex: number): string => {
        if (nodeIndex === selectedNodeIndex) return "selected";
        else return "notSelected";
    };

    const onNodeClick = (index: number): void => {
        setSelectedNodeIndex(index);
        dispatch(storeSelectedNode(diskInfoList[index].node.id));
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

            {diskInfoList.map((node: INodesDetails, index: number) => (
                <div key={index} className="node-list lower row-spaced">
                    <div className="node-options centered">
                        <p className={`node-name ${isNodeSelected(index)}`} onClick={(): void => onNodeClick(index)}>
                            {node.node.name}
                        </p>
                        <NotificationBell hasEnabledNotifications={node.node.hasEnabledNotifications} />
                    </div>

                    <p>
                        {formatBytes(node.latestDiskInformation.freeSpace)} /{" "}
                        {formatBytes(node.latestDiskInformation.takenSpace)}
                    </p>
                    <p className="yellow">Online</p>
                </div>
            ))}
        </div>
    );
};
