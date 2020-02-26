import React, {ReactElement, useState} from "react";

import "./balance.scss";
import {BalanceChart} from "./BalanceChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";

export type BalanceProps = {
    date: string;
    balance: string;
};

export const BalanceHistoryContainer = (): ReactElement => {
    const data: BalanceProps[] = [
        {date: "2020-01-23T14:43:42.856Z", balance: "100.12340"},
        {date: "2020-01-24T14:43:42.856Z", balance: "60.12"},
        {date: "2020-01-25T14:43:42.856Z", balance: "120.2192"},
        {date: "2020-01-26T14:43:42.856Z", balance: "190.623"},
        {date: "2020-01-27T14:43:42.856Z", balance: "390.931"},
        {date: "2020-01-28T14:43:42.856Z", balance: "310.302"},
    ];

    const [toolTip, setToolTip] = useState(data[5]);

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(data[e.activeTooltipIndex]);
        }
    };

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>balance history</label>
            </div>

            <ChartHeader
                onIntervalClick={()=>{}}
                date={toolTip.date}
                values={[{value: toolTip.balance, icon: <i className="material-icons">account_balance_wallet</i>}]}
            />

            <BalanceChart data={data} onMouseMove={updateTooltip} />
        </div>
    );
};
