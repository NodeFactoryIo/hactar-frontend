import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

import {UptimeProps} from "./UptimeContainer";
import {ChartWrapper} from "../../components/ChartWrapper";

type BalanceChartProps = {
    data: UptimeProps[];
    onMouseMove: (e: any) => void;
};

export class UptimeChart extends ChartWrapper<BalanceChartProps> {
    constructor(props: BalanceChartProps) {
        super(props);
    }

    public render() {
        const {data, onMouseMove} = this.props;
        const formattedData = data.map(v => ({date: v.date, online: v.value ? 1 : 0, offline: v.value ? 0 : 1}));

        return (
            <ResponsiveContainer width="100%" height={100}>
                <BarChart data={formattedData} margin={{top: 10, left: 30, bottom: 0}} onMouseMove={onMouseMove}>
                    <XAxis dataKey="date" tickFormatter={v => super.formatXAxis(v)} />
                    <Tooltip content={() => null} />
                    <Bar dataKey="online" stackId="a" fill="#EECA1C" radius={[4, 4, 0, 0]} barSize={21} />
                    <Bar dataKey="offline" stackId="a" fill="#756B30" radius={[4, 4, 0, 0]} barSize={21} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
