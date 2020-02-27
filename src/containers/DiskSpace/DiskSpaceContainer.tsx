import React, {ReactElement, useState, useEffect} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {DiskSpaceChart} from "./DiskSpaceChart";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getDiskInfo} from "../Dashboard/NodeSlice";
import {INodeDiskState} from "../Dashboard/NodeInterface";

export interface IDiskSpaceProps {
    selectedNodeIndex: number;
}

export type DiskSpaceDataProps = {
    date: string;
    free: number;
    taken: number;
};

export const DiskSpace: React.FC<IDiskSpaceProps> = ({selectedNodeIndex}: IDiskSpaceProps): ReactElement => {
    const data: DiskSpaceDataProps[] = [
        {date: "2020-01-23T14:43:42.856Z", free: 81, taken: 22},
        {date: "2020-01-24T14:43:42.856Z", free: 102, taken: 68},
        {date: "2020-01-25T14:43:42.856Z", free: 1343, taken: 1001},
        {date: "2020-01-26T14:43:42.856Z", free: 200, taken: 20},
        {date: "2020-01-27T14:43:42.856Z", free: 1234, taken: 1092},
        {date: "2020-01-28T14:43:42.856Z", free: 926, taken: 925},
    ];
    const state = useSelector((state: RootState) => state);
    const nodeList = state.node.nodeList;
    const dispatch = useDispatch();
    const [toolTip, setToolTip] = useState(data[5]);
    const [selectedInterval, setSelectedInterval] = useState("year");

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(data[e.activeTooltipIndex]);
        }
    };

    const formatDiskData = (diskData: Array<INodeDiskState>): Array<DiskSpaceDataProps> => {
        const formatedData: Array<DiskSpaceDataProps> = [];
        diskData.forEach(e => {
            formatedData.push({
                date: e.updatedAt,
                free: e.freeSpace / 1000000000,
                taken: e.takenSpace / 1000000000,
            });
        });
        return formatedData;
    };

    useEffect(() => {
        if (nodeList[selectedNodeIndex]) dispatch(getDiskInfo(nodeList[selectedNodeIndex].id, selectedInterval));
    }, [selectedInterval, selectedNodeIndex, nodeList]);

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>disk space</label>
            </div>
            <ChartHeader
                onIntervalClick={e => setSelectedInterval(e)}
                date={toolTip.date}
                values={[
                    {
                        value: `Free - ${toolTip.free} GB`,
                        icon: <img src={require("../../assets/icons/polygon.svg")} />,
                    },
                    {
                        value: `Taken - ${toolTip.taken} GB`,
                        icon: <img src={require("../../assets/icons/polygon-dark.svg")} />,
                    },
                ]}
            />
            <DiskSpaceChart data={formatDiskData(state.node.nodeDiskInfo)} onMouseMove={updateTooltip} />
        </div>
    );
};
