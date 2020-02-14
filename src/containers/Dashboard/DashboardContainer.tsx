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
import jwt_decode from "jwt-decode";

export const DashboardContainer = (): ReactElement => {
    const [areElementsHidden, setElementsHidden] = useState(false);
    const history = useHistory();
    const stateToken = useSelector((state: RootState) => state.user.token);

    const checkTokenExpireTime = (token: string | null): boolean => {
        if(token) {
            const jwt: {id: number, iat: number, exp:number} = jwt_decode(token);
            const returnValue = (jwt.exp > Date.now()/1000) ? false : true;
            return returnValue
        } else return true
    }

    useEffect(() => {
        if (checkTokenExpireTime(stateToken)) history.push(Routes.LOGIN_ROUTE);
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
