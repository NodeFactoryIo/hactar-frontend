import React, {ReactElement, Dispatch, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../components/Loading/Loading";
import {NodeListContainer} from "../NodeList/NodeListContainer";
import {RootState} from "../../app/rootReducer";
import {Clipboard} from "../../components/Clipboard/Clipboard";
import {NodeVersion} from "../Dashboard/NodeVersion/NodeVersion";
import {formatBytes} from "../../app/utils";
import {getNodeInformation} from "./GeneralInfoSlice";
import {GeneralInfoActions} from "./GeneralInfoActions";

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
    }, [selectedNodeId, dispatch]);

    if (nodeInformation.isLoading) {
        return <Loading />;
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
                    <GeneralInfoActions
                        onNodeHeaderClick={onNodeHeaderClick}
                        setShowDropdown={setShowDropdown}
                        showDropdown={showDropdown}
                    />

                    <div className="general-info-stats lower">
                        <div className="stat">
                            <label>node version</label>
                            <NodeVersion nodeVersion={nodeInformation.data.version} latestVersion={latestNodeVersion} />
                        </div>

                        <div className="stat">
                            <label>owner address</label>
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
