import React from "react";
import Icon from "@material-ui/icons/Search";

export const EmptyChartData = () => (
    <div className="centered flex-column uptime-empty">
        <Icon />
        <div>No data for selected interval</div>
    </div>
);
