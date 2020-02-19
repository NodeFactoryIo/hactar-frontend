import React, {ReactElement, useState, useEffect} from "react";
import {EmptyList} from "../../components/EmptyList/EmptyList";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

interface INodeListProps {
    display?: boolean;
    onNodeClick: any;
}

export const NodeListContainer = ({display, onNodeClick}: INodeListProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const diskInfo = state.node.nodeDiskInfo;
    const [showArrow, setShowArrow] = useState<boolean>(true);

    useEffect(() => {
        if (diskInfo.length > 0) setShowArrow(false);
    }, [state.node.nodeDiskInfo]);
    return (
        <div className={classNames("flex-column node-list-container", {hidden: !display})}>
            <div className="upper">
                <div className="row node-name">
                    <h3>Nodes</h3>
                    <a
                        href="#"
                        onClick={onNodeClick}
                        // className="accented"
                        className={classNames("accented", {hidden: showArrow})}
                    >
                        <i className="material-icons">arrow_drop_up</i>
                    </a>
                </div>
            </div>

            <div className="lower row-spaced header">
                <p>Node name</p>
                <p>Free / Taken space</p>
                <p>Status</p>
            </div>

            {diskInfo.length === 0 ? (
                <EmptyList message="No nodes are added" />
            ) : (
                diskInfo.map((node, index) => (
                    <div key={index} className="node-list lower row-spaced">
                        <p>Node {node.nodeId}</p>
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
