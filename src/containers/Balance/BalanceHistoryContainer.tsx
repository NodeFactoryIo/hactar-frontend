import React, {ReactElement} from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ResponsiveContainer, Label
} from "recharts";

import "./balance.scss";

export const BalanceHistoryContainer = (): ReactElement => {
    const data = [
        {name: "14 Dec", uv: 100},
        {name: "15 Dec", uv: 60},
        {name: "16 Dec", uv: 120},
        {name: "17 Dec", uv: 190},
        {name: "18 Dec", uv: 390},
        {name: "Today", uv: 310},
    ];

    return (
        <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(238, 202, 28)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="rgba(238, 202, 28)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis orientation="right" />
                <CartesianGrid strokeDasharray="6 6" stroke="#363C4D" />
                <Tooltip />
                <Area type="monotone" strokeWidth={2} dataKey="uv" stroke="#EECA1C" fill="url(#colorPv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};
