import React, {ReactElement, useState, useEffect} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {DiskSpaceChart} from "./DiskSpaceChart";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getDiskInfo} from "./DiskSpaceSlice";
import {INodeDiskState} from "../../@types/ReduxStates";
import {formatToGb} from "../../app/utils";
import {Loading} from "../../components/Loading/Loading";
import {AgeTooltip} from "../../components/Tooltip/AgeTooltip";

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
            {
                value: `Free - ${free ? free + " GB" : ""}`,
                icon: <img src={require("../../assets/icons/polygon.svg")} />,
            },
            {
                value: `Taken - ${taken ? taken + " GB" : ""}`,
                icon: <img src={require("../../assets/icons/polygon-dark.svg")} />,
            },
        ];
    };

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getDiskInfo(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId, nodeList, dispatch]);

    if (diskInformation.isLoading) {
        return <Loading />;
    }

    return (
        <div className="container flex-column vertical-margin">
            <div className="upper row-spaced">
                <label>disk space</label>
                <AgeTooltip
                    updatedAt={diskInformation[diskInformation.length-1] && diskInformation[diskInformation.length-1].updatedAt}
                />
            </div>
            {toolTip ? (
                <ChartHeader
                    selectedInterval={selectedInterval}
                    onIntervalClick={(e): void => setSelectedInterval(e)}
                    date={toolTip.date}
                    values={tooltipValues(toolTip.free, toolTip.taken)}
                />
            ) : (
                <ChartHeader
                    selectedInterval={selectedInterval}
                    onIntervalClick={(e): void => setSelectedInterval(e)}
                    date={diskInformation[0] && diskInformation[0].updatedAt}
                    values={tooltipValues(
                        diskInformation[0] && formatToGb(diskInformation[0].freeSpace),
                        diskInformation[0] && formatToGb(diskInformation[0].takenSpace),
                    )}
                />
            )}
            <DiskSpaceChart
                data={formatDiskData(diskInformation)}
                onMouseMove={updateTooltip}
                interval={selectedInterval}
            />
        </div>
    );
};
