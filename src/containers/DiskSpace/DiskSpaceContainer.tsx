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
    const formatDiskData = (diskData: Array<INodeDiskState>): Array<DiskSpaceDataProps> => {
        const formatedData: Array<DiskSpaceDataProps> = [];
        diskData.forEach(e => {
            formatedData.push({
                date: e.updatedAt,
                free: Math.round(e.freeSpace / 1000000000),
                taken: Math.round(e.takenSpace / 1000000000),
            });
        });
        return formatedData;
    };

    const state = useSelector((state: RootState) => state);
    const {nodeDiskInfo, nodeList} = state.node;
    const dispatch = useDispatch();

    const [toolTip, setToolTip] = useState(formatDiskData(nodeDiskInfo)[0]);
    const [selectedInterval, setSelectedInterval] = useState("year");

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(formatDiskData(nodeDiskInfo)[e.activeTooltipIndex]);
        }
    };

    const tooltipValues = (free: number, taken: number): any => {
        return [
            {value: `Free - ${free} GB`, icon: <img src={require("../../assets/icons/polygon.svg")} />},
            {value: `Taken - ${taken} GB`, icon: <img src={require("../../assets/icons/polygon-dark.svg")} />},
        ];
    };

    useEffect(() => {
        if (nodeList[selectedNodeIndex]) dispatch(getDiskInfo(nodeList[selectedNodeIndex].id, selectedInterval));
    }, [selectedInterval, selectedNodeIndex, nodeList]);

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper">
                <label>disk space</label>
            </div>
            {toolTip ? (
                <ChartHeader
                    onIntervalClick={e => setSelectedInterval(e)}
                    date={toolTip.date}
                    values={tooltipValues(toolTip.free, toolTip.taken)}
                />
            ) : nodeDiskInfo && nodeDiskInfo[0] ? (
                <ChartHeader
                    onIntervalClick={e => setSelectedInterval(e)}
                    date={nodeDiskInfo[0].updatedAt}
                    values={tooltipValues(nodeDiskInfo[0].freeSpace, nodeDiskInfo[0].takenSpace)}
                />
            ) : (
                <ChartHeader onIntervalClick={e => setSelectedInterval(e)} values={tooltipValues(0, 0)} />
            )}
            <DiskSpaceChart data={formatDiskData(nodeDiskInfo)} onMouseMove={updateTooltip} />
        </div>
    );
};
