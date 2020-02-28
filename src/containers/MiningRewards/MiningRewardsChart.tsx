import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React, {ReactElement} from "react";

import {ChartWrapper} from "../../components/ChartWrapper";
import {IMiningReward} from "../Dashboard/NodeInterface";
import {formatTokens} from "../../app/utils";

type MiningRewardChartProps = {
    data: IMiningReward[];
    onMouseMove: (e: any) => void;
};

export class MiningRewardsChart extends ChartWrapper<MiningRewardChartProps> {
    public render(): ReactElement {
        const {data, onMouseMove} = this.props;
        const formattedData = data.map(v => ({date: v.updatedAt, amount: parseFloat(formatTokens(v.rewardAmount))}));

        return (
            <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={formattedData} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(238, 202, 28)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="rgba(238, 202, 28)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tickFormatter={(v): string => super.formatXAxis(v)} />
                    <YAxis orientation="right" />
                    <CartesianGrid strokeDasharray="6 6" stroke="#363C4D" />
                    <Tooltip content={(): null => null} />
                    <Area type="monotone" strokeWidth={2} dataKey="amount" stroke="#EECA1C" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
