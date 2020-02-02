import React, {ReactElement} from "react";
import {EmptyList} from "../../components/EmptyList/EmptyList";

export const NodeListContainer = (): ReactElement => {
    const data = [
        {name: "Node name 1", freeSpace: "0.5 TB", takenSpace: "2.1 TB", online: true},
        {name: "Node name 2", freeSpace: "32 GB", takenSpace: "1.1 TB", online: false},
    ];

    return (
        <div className="container flex-column vertical-margin node-list-container">
            <div className="upper">
                <div className="row node-name">
                    <h3>Nodes</h3>
                    <i className="material-icons">arrow_drop_up</i>
                </div>
            </div>

            <div className="lower row-spaced header">
                <p>Node name</p>
                <p>Free / Taken space</p>
                <p>Status</p>
            </div>

            {data.length === 0 ? <EmptyList message="No nodes are added" /> :
                data.map((node) => (
                    <div className="node-list lower row-spaced">
                        <p>{node.name}</p>
                        <p>{node.freeSpace} / ${node.takenSpace}</p>
                        <p className={node.online ? 'yellow' : 'status'}>{node.online ? "Online" : "Offline"}</p>
                    </div>
                ))
            }
        </div>
    );
};