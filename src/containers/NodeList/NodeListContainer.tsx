import React, {ReactElement} from "react";
import {TopBar} from "../../components/TopBar/TopBar";
import {EmptyList} from "../../components/EmptyList/EmptyList";

export const NodeListContainer = (): ReactElement => {
    const data = [

    ];

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

                {data.length === 0 ? <EmptyList message="No nodes are added" /> :
                    <div>

                    </div>
                }
            </div>
        </div>
    );
};