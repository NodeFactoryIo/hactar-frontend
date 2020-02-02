import React, {ReactElement} from "react";
import {TopBar} from "../../components/TopBar/TopBar";

export const NodeListContainer = (): ReactElement => {
    return (
        <div className="dashboard-container">
            <TopBar />

            <div className="container flex-column vertical-margin">
                <div className="upper">
                    <h1>Nodes</h1>
                </div>

                <div className="lower row-spaced">
                    <p>Node name</p>
                    <p>Free / Taken space</p>
                    <p>Status</p>
                </div>

                <div className="empty-list flex-column centered">
                    <i className="material-icons">search</i>
                    <h2>No nodes are added</h2>
                </div>
            </div>
        </div>
    );
};