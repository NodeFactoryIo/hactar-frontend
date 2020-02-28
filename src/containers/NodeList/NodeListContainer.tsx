import React, {ReactElement, useState, useEffect} from "react";
import {EmptyList} from "../../components/EmptyList/EmptyList";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {formatBytes} from "../../app/utils";
import {storeSelectedNode} from "../Dashboard/NodeSlice";

interface INodeListProps {
    display?: boolean;
    onNodeHeaderClick: () => void;
}

export const NodeListContainer = ({
    display,
    onNodeHeaderClick,
}: INodeListProps): ReactElement => {
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
        dispatch(storeSelectedNode(diskInfoList[index].id));
        onNodeHeaderClick();
    };

    useEffect(() => {
        if (diskInfoList.length > 0) setShowArrow(false);
    }, [diskInfoList]);

    return (
        <div className={classNames("flex-column node-list-container", {hidden: !display})}>
            <div className="upper">
                <NodeNameTitle
                    title="Nodes"
                    onClick={onNodeHeaderClick}
                    showArrow={showArrow}
                    arrowOpen={true}
                />
            </div>

            <div className="lower row-spaced header">
                <p>Node name</p>
                <p>Free / Taken space</p>
                <p>Status</p>
            </div>

            {diskInfoList.map((node: any, index: number) => (
                <div key={index} className="node-list lower row-spaced">
                    <p className={`node-name ${isNodeSelected(index)}`} onClick={(): void => onNodeClick(index)}>
                        Node {node.nodeId}
                    </p>
                    <p>
                        {formatBytes(node.diskDetails.freeSpace)} / {formatBytes(node.diskDetails.takenSpace)}
                    </p>
                    {/* TODO - online status */}
                    {/* <p className={node.online ? "yellow" : "status"}>
                    {node.online ? "Online" : "Offline"}
                    </p> */}
                    <p className="yellow">Online</p>
                </div>
            ))}
        </div>
    );
};
