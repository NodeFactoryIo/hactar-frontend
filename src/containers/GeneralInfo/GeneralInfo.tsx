import React, {ReactElement} from "react";

export const GeneralInfo = (): ReactElement => {
    return (
        <div className="container flex-column vertical-margin general-info">
            <div className="row-spaced upper">
                <div className="centered">
                    <h3>Node name 1</h3>
                    <i className="material-icons">arrow_drop_down</i>
                </div>

                <div className="node-options">
                    <i className="material-icons">notifications_none</i>
                    <i className="material-icons">more_vert</i>
                </div>
            </div>

            <div className="general-info-stats lower">
                <div className="stat">
                    <label>node version</label>
                    <p>0.11.0</p>
                </div>

                <div className="stat">
                    <label>node address</label>
                    <p>t3xgw3...</p>
                </div>

                <div className="stat">
                    <label>miner power</label>
                    <p>1 TiB</p>
                </div>

                <div className="stat">
                    <label>total power</label>
                    <p>30.4 TiB</p>
                </div>

                <div className="stat">
                    <label>sector size</label>
                    <p>3.56 GB</p>
                </div>

                <div className="stat">
                    <label>number of sectors</label>
                    <p>14</p>
                </div>
            </div>
        </div>
    );
};
