import React, {ReactElement, useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import classNames from "classnames";
import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {MiningRewardsContainer} from "../MiningRewards/MiningRewardsContainer";
import {Uptime} from "../Uptime/UptimeContainer";
import {DiskSpace} from "../DiskSpace/DiskSpaceContainer";
import {DealsContainer} from "../Deals/DealsContainer";
import {PledgedCollateralContainer} from "../PledgedCollateral/PledgedCollateralContainer";
import {RootState} from "../../app/rootReducer";
import {
    getNodeList,
    getDiskInfoList,
    getGeneralInfo,
    getBalanceInfo,
    getNodeVersion,
    getMiningRewards,
} from "./NodeSlice";
import {logOutUser} from "../Register/UserSlice";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState<boolean>(true);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
    const [fetchingNodeList, setFetchingNodeList] = useState<boolean>(false);
    const [fetchingNodeStatus, setFetchingNodeStatus] = useState<boolean>(false);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const nodeList = state.node.nodeList;

    const onNodeSelect = (index: number): void => {
        setSelectedNodeIndex(index);
        setFetchingNodeStatus(false);
    };

    useEffect(() => {
        if (!fetchingNodeList) {
            setFetchingNodeList(true);
            dispatch(getNodeList());
        }

        if (!fetchingNodeStatus && nodeList[0] && nodeList[0].id) {
            setFetchingNodeStatus(true);
            dispatch(getNodeVersion());
            dispatch(getGeneralInfo(nodeList[selectedNodeIndex].id));
            dispatch(getDiskInfoList(nodeList));
            dispatch(getBalanceInfo(nodeList[selectedNodeIndex].id));
            dispatch(getMiningRewards(nodeList[selectedNodeIndex].id));
            setElementsHidden(false);
        }
    }, [fetchingNodeList, fetchingNodeStatus, selectedNodeIndex, nodeList]);

    return (
        <div className="dashboard-container">
            <TopBar logOut={() => dispatch(logOutUser())} email="johndoe@nodefactory.io" />

            <GeneralInfo
                setElementsHidden={setElementsHidden}
                areElementsHidden={areElementsHidden}
                setSelectedNodeIndex={onNodeSelect}
                selectedNodeIndex={selectedNodeIndex}
            />

            {nodeList.length > 0 ? (
                <>
                    <div className={classNames("splitted-row", {hidden: areElementsHidden})}>
                        <div className="column left">
                            <CurrentBalanceContainer balance={state.node.nodeBalance} />
                            <MiningRewardsContainer nodeId={nodeList[selectedNodeIndex].id} />
                        </div>
                        <div className="column right">
                            <Uptime />
                            <DiskSpace selectedNodeIndex={selectedNodeIndex} />
                        </div>
                    </div>

                    <div className={classNames("tables", {hidden: areElementsHidden})}>
                        <div className="column left">
                            <DealsContainer />
                        </div>
                        <div className="column right">
                            <PledgedCollateralContainer />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};
