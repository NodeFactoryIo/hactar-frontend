import React, {ReactElement, useState} from "react";

import {MiningRewardsChart} from "./MiningRewardsChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {RootState} from "../../app/rootReducer";
import {useSelector} from "react-redux";

export const MiningRewardsContainer = (): ReactElement => {
    const data = useSelector((state: RootState) => state.node.miningRewards);
    const [toolTip, setToolTip] = useState({rewardAmount: "0", updatedAt: new Date().toString()});

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(data[e.activeTooltipIndex]);
        }
    };

    // TODO: When loaded, setTooltip to data[data.length]

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>mining rewards history</label>
            </div>

            <ChartHeader
                date={toolTip.updatedAt}
                values={[{value: toolTip.rewardAmount, icon: <i className="material-icons">account_balance_wallet</i>}]}
            />

            <MiningRewardsChart data={data} onMouseMove={updateTooltip} />
        </div>
    );
};
