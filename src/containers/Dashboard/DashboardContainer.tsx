import React, {ReactElement} from "react";

import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";
import {CurrentBalanceContainer} from "../Balance/CurrentBalanceContainer";
import {BalanceHistoryContainer} from "../Balance/BalanceHistoryContainer";

export const DashboardContainer = (): ReactElement => {
    return (
        <div className="dashboard-container">
            <TopBar />

            <GeneralInfo />

            <div className="splitted-row">
                <div className="column">
                    <CurrentBalanceContainer />
                    <BalanceHistoryContainer />
                </div>
                <div className="column"></div>
            </div>
        </div>
    );
};
