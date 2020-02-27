import React, {ReactElement, useState} from "react";

import {MiningRewardsChart} from "./MiningRewardsChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {RootState} from "../../app/rootReducer";
import {useSelector} from "react-redux";
import {formatTokens} from "../../app/utils";

export const MiningRewardsContainer = (): ReactElement => {
    const miningRewards = useSelector((state: RootState) => state.node.miningRewards);
    const [toolTip, setToolTip] = useState({rewardAmount: "0", updatedAt: new Date().toString()});

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(miningRewards.data[e.activeTooltipIndex]);
        }
    };

    if (!miningRewards.isLoading && toolTip.rewardAmount === "0") {
        setToolTip(miningRewards.data[miningRewards.data.length - 1]);
    }

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>mining rewards history</label>
            </div>

            <ChartHeader
                date={toolTip.updatedAt}
                values={[{value: `${formatTokens(toolTip.rewardAmount)} FIL`, icon: <i className="material-icons">account_balance_wallet</i>}]}
            />

            <MiningRewardsChart data={miningRewards.data} onMouseMove={updateTooltip} />
        </div>
    );
};
