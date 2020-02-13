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
import {useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {useHistory} from "react-router-dom";
import {Routes} from "../../constants/routes";
import {getNodes} from "./DashboardApi";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState(false);
    // const [storageToken, setStorageToken] = useState<string>("");
    const history = useHistory();
    const stateToken = useSelector((state: RootState) => state.login.token);
    const storageToken = localStorage.getItem("token");

    // if(storageTokenValue) setStorageToken(storageTokenValue);

    useEffect(() => {
        if (!stateToken && !storageToken) {
            history.push(Routes.LOGIN_ROUTE)
        } 
        else {
            const func = async () => {
                console.log(storageToken);
                const x = await getNodes(storageToken);
                console.log(x);
            }
            func();
            // if(stateToken) {
            //     const response = getNodes(stateToken);
            //     console.log(response);
            // }
            // else {
            //     const response = getNodes(storageToken);
            //     console.log(response);
            // }
        }
    }, [stateToken]);
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
