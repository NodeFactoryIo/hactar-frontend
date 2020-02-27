import React, {ReactElement, useState} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {DiskSpaceChart} from "./DiskSpaceChart";

export type DiskSpaceProps = {
    date: string;
    free: number;
    taken: number;
};

export const DiskSpace = (): ReactElement => {
    const data: DiskSpaceProps[] = [
        {date: "2020-01-23T14:43:42.856Z", free: 81, taken: 22},
        {date: "2020-01-24T14:43:42.856Z", free: 102, taken: 68},
        {date: "2020-01-25T14:43:42.856Z", free: 1343, taken: 1001},
        {date: "2020-01-26T14:43:42.856Z", free: 200, taken: 20},
        {date: "2020-01-27T14:43:42.856Z", free: 1234, taken: 1092},
        {date: "2020-01-28T14:43:42.856Z", free: 926, taken: 925},
    ];

    const [toolTip, setToolTip] = useState(data[5]);
    const [selectedInterval, setSelectedInterval] = useState<string>("Week");

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(data[e.activeTooltipIndex]);
        }
    };

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>disk space</label>
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={e => setSelectedInterval(e)}
                date={toolTip.date}
                values={[
                    {value: `Free - ${toolTip.free} GB`, icon: <img src={require("../../assets/icons/polygon.svg")} />},
                    {
                        value: `Taken - ${toolTip.taken} GB`,
                        icon: <img src={require("../../assets/icons/polygon-dark.svg")} />,
                    },
                ]}
            />

            <DiskSpaceChart data={data} onMouseMove={updateTooltip} />
        </div>
    );
};
