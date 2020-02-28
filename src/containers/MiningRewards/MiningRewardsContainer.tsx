import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {MiningRewardsChart} from "./MiningRewardsChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {RootState} from "../../app/rootReducer";
import {formatTokens} from "../../app/utils";
import {getMiningRewards} from "./MiningRewardsSlice";

export const MiningRewardsContainer = (): ReactElement => {
    const miningRewards = useSelector((state: RootState) => state.node.miningRewards);
    const [toolTip, setToolTip] = useState({rewardAmount: "0", updatedAt: new Date().toString()});
    const [selectedInterval, setSelectedInterval] = useState<string>("week");
    const selectedNodeId = useSelector((state: RootState) => state.node.selected.selectedNodeId);
    const dispatch = useDispatch();

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(miningRewards.data[e.activeTooltipIndex]);
        }
    };

    // Set tooltip for chart header to display latest value as initial
    if (!miningRewards.isLoading && toolTip.rewardAmount === "0" && miningRewards.data.length > 0) {
        setToolTip(miningRewards.data[miningRewards.data.length - 1]);
    }

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getMiningRewards(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId]);

    if (miningRewards.isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>mining rewards history</label>
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={(e): void => setSelectedInterval(e)}
                date={toolTip.updatedAt}
                values={[
                    {
                        value: `${formatTokens(toolTip.rewardAmount)} FIL`,
                        icon: <i className="material-icons">account_balance_wallet</i>,
                    },
                ]}
            />

            <MiningRewardsChart data={miningRewards.data} onMouseMove={updateTooltip} />
        </div>
    );
};
