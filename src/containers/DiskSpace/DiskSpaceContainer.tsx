import React, {ReactElement, useState, useEffect} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {DiskSpaceChart} from "./DiskSpaceChart";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getDiskInfo} from "./DiskSpaceSlice";
import {INodeDiskState} from "../../@types/ReduxStates";
import {formatToGb} from "../../app/utils";

export type DiskSpaceDataProps = {
    date: string;
    free: number;
    taken: number;
};

export const DiskSpace: React.FC = (): ReactElement => {
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
    const selectedNodeId = state.app.selectedNodeId;
    const diskInformation = state.node.diskSpace.data;
    const nodeList = state.nodeList.data;
    const dispatch = useDispatch();

    const [toolTip, setToolTip] = useState<DiskSpaceDataProps>(formatDiskData(diskInformation)[0]);
    const [selectedInterval, setSelectedInterval] = useState("year");

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(formatDiskData(diskInformation)[e.activeTooltipIndex]);
        }
    };

    const tooltipValues = (free: number, taken: number): any => {
        return [
            {value: `Free - ${free} GB`, icon: <img src={require("../../assets/icons/polygon.svg")} />},
            {value: `Taken - ${taken} GB`, icon: <img src={require("../../assets/icons/polygon-dark.svg")} />},
        ];
    };

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getDiskInfo(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId, nodeList, dispatch]);

    if (diskInformation.isLoading) {
        return <div>Loading</div>;
    }

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
            ) : diskInformation && diskInformation[0] ? (
                <ChartHeader
                    selectedInterval={selectedInterval}
                    onIntervalClick={(e): void => setSelectedInterval(e)}
                    date={diskInformation[0].updatedAt}
                    values={tooltipValues(
                        formatToGb(diskInformation[0].freeSpace),
                        formatToGb(diskInformation[0].takenSpace),
                    )}
                />
            ) : null}
            <DiskSpaceChart data={formatDiskData(diskInformation)} onMouseMove={updateTooltip} />
        </div>
    );
};
