import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MiningRewardsChart} from "./MiningRewardsChart";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {RootState} from "../../app/rootReducer";
import {formatTokens} from "../../app/utils";
import {getMiningRewards} from "./MiningRewardsSlice";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import {Loading} from "../../components/Loading/Loading";
import {AgeTooltip} from "../../components/Tooltip/AgeTooltip";

export const MiningRewardsContainer = (): ReactElement => {
    const miningRewards = useSelector((state: RootState) => state.node.miningRewards);
    const [toolTip, setToolTip] = useState({rewardSum: "0", updatedAt: new Date().toString()});
    const [selectedInterval, setSelectedInterval] = useState<string>("week");
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    const dispatch = useDispatch();

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(miningRewards.data[e.activeTooltipIndex]);
        }
    };

    // Set tooltip for chart header to display latest value as initial
    if (!miningRewards.isLoading && toolTip.rewardSum === "0" && miningRewards.data.length > 0) {
        setToolTip(miningRewards.data[miningRewards.data.length - 1]);
    }

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getMiningRewards(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId, dispatch]);

    if (miningRewards.isLoading) {
        return <Loading />;
    }

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper row-spaced">
                <label>mining rewards history</label>
                <AgeTooltip updatedAt={miningRewards.data[0] && miningRewards.data[0].createdAt} />
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={(e): void => setSelectedInterval(e)}
                date={toolTip.updatedAt}
                values={[
                    {
                        value: `${formatTokens(toolTip.rewardSum)} FIL`,
                        icon: <AccountBalanceWallet />,
                    },
                ]}
            />

            <MiningRewardsChart data={miningRewards.data} onMouseMove={updateTooltip} />
        </div>
    );
};
