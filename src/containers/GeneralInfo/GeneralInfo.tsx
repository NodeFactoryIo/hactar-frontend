import React, {ReactElement, Dispatch, SetStateAction} from "react";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {Clipboard} from "../../components/Clipboard/Clipboard";
import {NodeNameTitle} from "../../components/NodeNameTitle/NodeNameTitle";

interface IGeneralInfoProps {
    setElementsHidden: Dispatch<SetStateAction<boolean>>;
    areElementsHidden: boolean;
    setSelectedNodeIndex: Dispatch<SetStateAction<number>>;
    selectedNodeIndex: number;
}

export const GeneralInfo = ({
    setElementsHidden,
    areElementsHidden,
    setSelectedNodeIndex,
    selectedNodeIndex,
}: IGeneralInfoProps): ReactElement => {
    const node = useSelector((state: RootState) => state.node);

    const onNodeHeaderClick = (): void => {
        setElementsHidden(!areElementsHidden);
    };

    const onNodeClick = (index: number): void => {
        setSelectedNodeIndex(index);
    };

    return (
        <div className="container flex-column vertical-margin general-info">
            <NodeListContainer
                display={areElementsHidden}
                selectedNode={selectedNodeIndex}
                onNodeHeaderClick={onNodeHeaderClick}
                onNodeClick={onNodeClick}
            />

            <div className={classNames({hidden: areElementsHidden})}>
                <div className="row-spaced upper">
                    <NodeNameTitle
                        title={`Node ${node.nodeList[selectedNodeIndex].id}`}
                        onClick={onNodeHeaderClick}
                        arrowOpen={false}
                    />
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
                        <Clipboard copyText={node.nodeList[0] && node.nodeList[0].address} />
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
