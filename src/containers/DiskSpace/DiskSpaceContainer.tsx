import React, {ReactElement, useState, useEffect} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {DiskSpaceChart} from "./DiskSpaceChart";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getDiskInfo} from "../Dashboard/NodeSlice";
import {INodeDiskState} from "../Dashboard/NodeInterface";
import {formatToGb} from "../../app/utils";

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
            formatedData.unshift({
                date: e.updatedAt,
                free: formatToGb(e.freeSpace),
                taken: formatToGb(e.takenSpace),
            });
        });
        return formatedData;
    };

    const state = useSelector((state: RootState) => state);
    const {nodeDiskInfo, nodeList} = state.node;
    const dispatch = useDispatch();

    const [toolTip, setToolTip] = useState<DiskSpaceDataProps>(formatDiskData(nodeDiskInfo)[0]);
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
                    selectedInterval={selectedInterval}
                    onIntervalClick={(e): void => setSelectedInterval(e)}
                    date={toolTip.date}
                    values={tooltipValues(toolTip.free, toolTip.taken)}
                />
            ) : nodeDiskInfo && nodeDiskInfo[0] ? (
                <ChartHeader
                    selectedInterval={selectedInterval}
                    onIntervalClick={(e): void => setSelectedInterval(e)}
                    date={nodeDiskInfo[0].updatedAt}
                    values={tooltipValues(
                        formatToGb(nodeDiskInfo[0].freeSpace),
                        formatToGb(nodeDiskInfo[0].takenSpace),
                    )}
                />
            ) : null}
            <DiskSpaceChart data={formatDiskData(nodeDiskInfo)} onMouseMove={updateTooltip} />
        </div>
    );
};
