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
import {getNodeList} from "./NodeSlice";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState(true);
    const history = useHistory();
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state.user.token) {
            history.push(Routes.LOGIN_ROUTE);
        } else {
            dispatch(getNodeList(state.user.token));
        }
        if (state.node.nodeList.length) setElementsHidden(false);
    }, [state.node.nodeListComplete]);

    return (
        <div className="dashboard-container">
            <TopBar />

            <GeneralInfo setElementsHidden={setElementsHidden} areElementsHidden={areElementsHidden} />

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
