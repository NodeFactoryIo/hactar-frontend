import React, {ReactElement, Dispatch, SetStateAction} from "react";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import classNames from "classnames";

interface IGeneralInfoProps {
    setElementsHidden: Dispatch<SetStateAction<boolean>>;
    areElementsHidden: boolean;
}

export const GeneralInfo = ({ setElementsHidden, areElementsHidden }: IGeneralInfoProps): ReactElement => {
    const onNodeClick = () => {
        setElementsHidden(!areElementsHidden);
    };

    return (
        <div className="container flex-column vertical-margin general-info">
            <NodeListContainer display={areElementsHidden} onNodeClick={onNodeClick} />

            <div className={classNames({"hidden": areElementsHidden})}>
                <div className="row-spaced upper">
                    <div className="centered">
                        <h3>Node name 1</h3>
                        <a href="#" onClick={onNodeClick}>
                            <i className="material-icons">arrow_drop_down</i>
                        </a>
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
        </div>
    );
};
