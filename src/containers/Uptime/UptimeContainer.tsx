import React, {ReactElement, useState} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {UptimeChart} from "./UptimeChart";

export type UptimeProps = {
    date: string;
    value: boolean;
};

export const Uptime = (): ReactElement => {
    const data: UptimeProps[] = [
        {date: "2020-01-23T14:43:42.856Z", value: true},
        {date: "2020-01-24T14:43:42.856Z", value: true},
        {date: "2020-01-25T14:43:42.856Z", value: false},
        {date: "2020-01-26T14:43:42.856Z", value: true},
        {date: "2020-01-27T14:43:42.856Z", value: false},
        {date: "2020-01-28T14:43:42.856Z", value: true},
    ];

    const [toolTip, setToolTip] = useState(data[5]);
    const [selectedInterval, setSelectedInterval] = useState<string>("Week");

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(data[e.activeTooltipIndex]);
        }
    };

    return (
        <div className="container flex-column">
            <div className="upper">
                <label>uptime</label>
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={(e): void => setSelectedInterval(e)}
                date={toolTip.date}
                values={[
                    {
                        icon: <img src={require("../../assets/icons/polygon.svg")} />,
                        value: toolTip.value ? "Online" : "Offline",
                    },
                ]}
            />

            <UptimeChart data={data} onMouseMove={updateTooltip} />
        </div>
    );
};
