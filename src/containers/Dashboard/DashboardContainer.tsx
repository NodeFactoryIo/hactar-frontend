import React, {ReactElement, useState, useEffect} from "react";
import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {BalanceHistoryContainer} from "../Balance/BalanceHistoryContainer";
import {Uptime} from "../Uptime/UptimeContainer";
import {DiskSpace} from "../DiskSpace/DiskSpaceContainer";
import classNames from "classnames";
import {DealsContainer} from "../Deals/DealsContainer";
import {PledgedCollateralContainer} from "../PledgedCollateral/PledgedCollateralContainer";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {useHistory} from "react-router-dom";
import {Routes} from "../../constants/routes";
import {getNodeList, getDiskInfo, getGeneralInfo} from "./NodeSlice";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState<boolean>(true);
    const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const token = state.user.token;
    const nodeList = state.node.nodeList;

    useEffect(() => {
        if (!token) {
            history.push(Routes.LOGIN_ROUTE);
        } else {
            dispatch(getNodeList(token));
            if (nodeList[0] && nodeList[0].id) {
                dispatch(getGeneralInfo(token, nodeList[selectedNodeIndex].id));
                dispatch(getDiskInfo(token, nodeList));
                if (nodeList.length) setElementsHidden(false);
            }
        }
    }, [state.node.nodeListComplete, selectedNodeIndex]);

    return (
        <div className="dashboard-container">
            <TopBar />

            <GeneralInfo
                setElementsHidden={setElementsHidden}
                areElementsHidden={areElementsHidden}
                setSelectedNodeIndex={setSelectedNodeIndex}
                selectedNodeIndex={selectedNodeIndex}
            />

            <div className={classNames("splitted-row", {hidden: areElementsHidden})}>
                <div className="column left">
                    <CurrentBalanceContainer />
                    <BalanceHistoryContainer />
                </div>
                <div className="column right">
                    <Uptime />
                    <DiskSpace />
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
        </div>
    );
};
