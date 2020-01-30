import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

import {BalanceProps} from "./BalanceHistoryContainer";
import {ChartWrapper} from "../../components/ChartWrapper";

type BalanceChartProps = {
    data: BalanceProps[];
    onMouseMove: (e: any) => void;
};

export class BalanceChart extends ChartWrapper<BalanceChartProps> {
    constructor(props: BalanceChartProps) {
        super(props);
    }

    public render() {
        const {data, onMouseMove} = this.props;
        const formattedData = data.map(v => ({date: v.date, balance: parseInt(v.balance)}));

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
                    <Area type="monotone" strokeWidth={2} dataKey="balance" stroke="#EECA1C" fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}
