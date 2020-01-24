import React, {ReactElement} from "react";

import "./dashboard.scss";
import {TopBar} from "../../components/TopBar/TopBar";

export const DashboardContainer = (): ReactElement => {
    return (
        <div className="dashboard-container">
            <TopBar />
        </div>
    );
};
