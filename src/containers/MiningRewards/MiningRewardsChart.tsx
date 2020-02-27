import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

import {MiningRewardsProp} from "./MiningRewardsContainer";
import {ChartWrapper} from "../../components/ChartWrapper";

type MiningRewardChartProps = {
    data: MiningRewardsProp[];
    onMouseMove: (e: any) => void;
};

export class MiningRewardsChart extends ChartWrapper<MiningRewardChartProps> {
    public render() {
        const {data, onMouseMove} = this.props;
        const formattedData = data.map(v => ({date: v.date, amount: parseInt(v.amount)}));

        return (
            <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={formattedData} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(238, 202, 28)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="rgba(238, 202, 28)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tickFormatter={v => super.formatXAxis(v)} />
                    <YAxis orientation="right" />
                    <CartesianGrid strokeDasharray="6 6" stroke="#363C4D" />
                    <Tooltip content={() => null} />
                    <Area type="monotone" strokeWidth={2} dataKey="amount" stroke="#EECA1C" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
