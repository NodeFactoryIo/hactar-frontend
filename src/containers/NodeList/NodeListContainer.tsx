import React, {ReactElement, useState, useEffect} from "react";
import {EmptyList} from "../../components/EmptyList/EmptyList";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";

interface INodeListProps {
    display?: boolean;
    selectedNode?: number;
    onNodeHeaderClick: () => void;
    onNodeClick: (index: number) => void;
}

export const NodeListContainer = ({
    display,
    selectedNode,
    onNodeHeaderClick,
    onNodeClick,
}: INodeListProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const diskInfoList = state.node.nodeDiskInfoList;
    const [showArrow, setShowArrow] = useState<boolean>(true);

    const isNodeSelected = (nodeIndex: number): string => {
        if (nodeIndex === selectedNode) return "selected";
        else return "notSelected";
    };

    useEffect(() => {
        if (diskInfoList.length > 0) setShowArrow(false);
    }, [state.node.nodeDiskInfoList]);
    return (
        <div className={classNames("flex-column node-list-container", {hidden: !display})}>
            <div className="upper">
                <NodeNameTitle title="Nodes" onClick={onNodeHeaderClick} showArrow={showArrow} arrowOpen={true} />
            </div>

            <div className="lower row-spaced header">
                <p>Node name</p>
                <p>Free / Taken space</p>
                <p>Status</p>
            </div>

            {diskInfoList.length === 0 ? (
                <EmptyList message="No nodes are added" />
            ) : (
                diskInfoList.map((node, index) => (
                    <div key={index} className="node-list lower row-spaced">
                        <p className={`node-name ${isNodeSelected(index)}`} onClick={(): void => onNodeClick(index)}>
                            Node {node.nodeId}
                        </p>
                        <p>
                            {node.freeSpace} / {node.takenSpace}
                        </p>
                        {/* TODO - online status */}
                        {/* <p className={node.online ? "yellow" : "status"}>
                        {node.online ? "Online" : "Offline"}
                        </p> */}
                        <p className="yellow">Online</p>
                    </div>
                ))
            )}
        </div>
    );
};
