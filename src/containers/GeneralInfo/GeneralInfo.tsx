import React, {ReactElement, Dispatch, SetStateAction, useEffect, useState} from "react";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {Clipboard} from "../../components/Clipboard/Clipboard";
import {NodeNameTitle} from "../Dashboard/NodeNameTitle/NodeNameTitle";
import {NodeVersion} from "../Dashboard/NodeVersion/NodeVersion";
import {formatBytes} from "../../app/utils";
import {showConfirmationDialog, ModalType} from "../../app/ModalRenderer/ModalSlice";
import {Dropdown} from "../../components/Dropdown/Dropdown";
import {getNodeInformation} from "./GeneralInfoSlice";

interface IGeneralInfoProps {
    setElementsHidden: Dispatch<SetStateAction<boolean>>;
    areElementsHidden: boolean;
}

export const GeneralInfo = ({setElementsHidden, areElementsHidden}: IGeneralInfoProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const nodeInformation = state.node.information;
    const latestNodeVersion = nodeInformation.latestAvailableVersion;
    const selectedNodeId = state.app.selectedNodeId;
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const onNodeHeaderClick = (): void => {
        setElementsHidden(!areElementsHidden);
    };

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getNodeInformation(selectedNodeId));
        }
    }, [selectedNodeId]);

    if (nodeInformation.isLoading) {
        return <div>Loading</div>;
    }

    return (
        <>
            <div
                onClick={(): void => {
                    setShowDropdown(false);
                }}
                className={classNames("dropdown-screen", {hidden: !showDropdown})}
            />
            <div className="container flex-column vertical-margin general-info">
                <NodeListContainer display={areElementsHidden} onNodeHeaderClick={onNodeHeaderClick} />

                <div className={classNames({hidden: areElementsHidden})}>
                    <div className="row-spaced upper">
                        {/* TODO */}
                        {selectedNodeId &&
                        state.nodeList.data[selectedNodeId] &&
                        state.nodeList.data[selectedNodeId].name &&
                        state.nodeList.data[selectedNodeId].description ? (
                                <div>
                                    <NodeNameTitle
                                    title={state.nodeList.data[selectedNodeId].name}
                                    onClick={onNodeHeaderClick}
                                    arrowOpen={false}
                                />
                                    <div>{state.nodeList.data[selectedNodeId].description}</div>
                                </div>
                            ) : (
                                <NodeNameTitle
                                    title={`Node ${selectedNodeId}`}
                                    onClick={onNodeHeaderClick}
                                    arrowOpen={false}
                                />
                        )}
                        )}
                        <div className="node-options">
                            <i className="material-icons">notifications_none</i>
                            <i
                                onClick={() => {
                                    setShowDropdown(true);
                                }}
                                className="material-icons"
                            >
                                more_vert
                            </i>
                            <Dropdown
                                showDropdown={showDropdown}
                                elements={[
                                    {
                                        title: "Edit node",
                                        iconId: "edit",
                                        onElementClick: (): void => {
                                            dispatch(showConfirmationDialog(ModalType.EditNode));
                                            setShowDropdown(false);
                                        },
                                    },
                                    {
                                        title: "Remove node",
                                        iconId: "delete",
                                        onElementClick: (): void => {},
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="general-info-stats lower">
                        <div className="stat">
                            <label>node version</label>
                            <NodeVersion nodeVersion={nodeInformation.data.version} latestVersion={latestNodeVersion} />
                        </div>

                        <div className="stat">
                            <label>node address</label>
                            <Clipboard copyText={nodeInformation.data.walletAddress || ""} truncate={true} />
                        </div>

                        <div className="stat">
                            <label>miner power</label>
                            <p>{formatBytes(nodeInformation.data.minerPower)}</p>
                        </div>

                        <div className="stat">
                            <label>total power</label>
                            <p>{formatBytes(nodeInformation.data.totalPower)}</p>
                        </div>

                        <div className="stat">
                            <label>sector size</label>
                            <p>{nodeInformation.data.sectorSize}</p>
                        </div>

                        <div className="stat">
                            <label>number of sectors</label>
                            <p>{nodeInformation.data.numberOfSectors}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
