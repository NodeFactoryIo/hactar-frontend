import React, {ReactElement} from "react";

import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";
import {GeneralInfo} from "../GeneralInfo/GeneralInfo";

export const DashboardContainer = (): ReactElement => {
    return (
        <div className="dashboard-container">
            <TopBar />

            <GeneralInfo />
        </div>
    );
};
