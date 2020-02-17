import React, {ReactElement, Dispatch, SetStateAction} from "react";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";

interface IGeneralInfoProps {
    setElementsHidden: Dispatch<SetStateAction<boolean>>;
    areElementsHidden: boolean;
}

export const GeneralInfo = ({setElementsHidden, areElementsHidden}: IGeneralInfoProps): ReactElement => {
    const node = useSelector((state: RootState) => state.node);

    const onNodeClick = () => {
        setElementsHidden(!areElementsHidden);
    };

    return (
        <div className="container flex-column vertical-margin general-info">
            <NodeListContainer display={areElementsHidden} onNodeClick={onNodeClick} />

            <div className={classNames({hidden: areElementsHidden})}>
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
                        <p>{node.nodeInfo && node.nodeInfo.version}</p>
                    </div>

                    <div className="stat">
                        <label>node address</label>
                        <p>{node.nodeList[0] && node.nodeList[0].address}</p>
                    </div>

                    <div className="stat">
                        <label>miner power</label>
                        <p>{node.nodeInfo && node.nodeInfo.minerPower}</p>
                    </div>

                    <div className="stat">
                        <label>total power</label>
                        <p>{node.nodeInfo && node.nodeInfo.totalPower}</p>
                    </div>

                    <div className="stat">
                        <label>sector size</label>
                        <p>{node.nodeInfo && node.nodeInfo.sectorSize}</p>
                    </div>

                    <div className="stat">
                        <label>number of sectors</label>
                        <p>{node.nodeInfo && node.nodeInfo.sectorSize}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
