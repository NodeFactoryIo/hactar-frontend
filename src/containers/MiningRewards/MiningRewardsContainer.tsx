import React, {ReactElement, useState} from "react";

import {MiningRewardsChart} from "./MiningRewardsChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";

export type MiningRewardsProp = {
    date: string;
    amount: string;
};

export const MiningRewardsContainer = (): ReactElement => {
    const data: MiningRewardsProp[] = [
        {date: "2020-01-23T14:43:42.856Z", amount: "100.12340"},
        {date: "2020-01-24T14:43:42.856Z", amount: "60.12"},
        {date: "2020-01-25T14:43:42.856Z", amount: "120.2192"},
        {date: "2020-01-26T14:43:42.856Z", amount: "190.623"},
        {date: "2020-01-27T14:43:42.856Z", amount: "390.931"},
        {date: "2020-01-28T14:43:42.856Z", amount: "310.302"},
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
                <label>mining rewards history</label>
            </div>

            <ChartHeader
                date={toolTip.date}
                values={[{value: toolTip.amount, icon: <i className="material-icons">account_balance_wallet</i>}]}
            />

            <MiningRewardsChart data={data} onMouseMove={updateTooltip} />
        </div>
    );
};
