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
import {logOutUser} from "../Register/UserSlice";
import {getAvailableNodeVersion, getNodeInformation} from "../GeneralInfo/GeneralInfoSlice";
import {getAllNodes} from "../NodeList/NodeListSlice";
import {getBalanceInfo} from "../Balance/BalanceSlice";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState<boolean>(true);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
    const [fetchingNodeList, setFetchingNodeList] = useState<boolean>(false);
    const [fetchingNodeStatus, setFetchingNodeStatus] = useState<boolean>(false);
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    // @ts-ignore
    const nodeList = state.nodeList.data;

    const onNodeSelect = (index: number): void => {
        setSelectedNodeIndex(index);
        setFetchingNodeStatus(false);
    };

    useEffect(() => {
        if (!fetchingNodeList) {
            setFetchingNodeList(true);
            dispatch(getAllNodes());
        }

        if (!fetchingNodeStatus && nodeList[0] && nodeList[0].id) {
            setFetchingNodeStatus(true);
            dispatch(getAvailableNodeVersion());
            dispatch(getNodeInformation(nodeList[selectedNodeIndex].id));
            dispatch(getBalanceInfo(nodeList[selectedNodeIndex].id));
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
                            <CurrentBalanceContainer balance={state.node.balance.data} />
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
