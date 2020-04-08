import React, {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";

import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {UptimeChart} from "./UptimeChart";
import {RootState} from "../../app/rootReducer";
import {getUptime} from "./UptimeSlice";
import {AgeTooltip} from "../../components/Tooltip/AgeTooltip";
import {Loading} from "../../components/Loading/Loading";

export const Uptime = (): ReactElement => {
    const uptime = useSelector((state: RootState) => state.node.uptime.data);
    const isLoading = useSelector((state: RootState) => state.node.uptime.isLoading);
    const [toolTip, setToolTip] = useState({isWorking: true, updatedAt: new Date().toString()});
    const [isTooltipUsed, setIsTooltipUsed] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState<string>("week");
    const selectedNodeId = useSelector((state: RootState) => state.app.selectedNodeId);
    const dispatch = useDispatch();

    const updateTooltip = (e: any): void => {
        if (e.activePayload) {
            setToolTip(uptime[e.activeTooltipIndex]);
        }
    };

    useEffect(() => {
        if (selectedNodeId) {
            dispatch(getUptime(selectedNodeId, selectedInterval));
        }
    }, [selectedInterval, selectedNodeId, dispatch]);

    // Set tooltip for chart header to display latest value as initial
    useEffect(() => {
        if (!isLoading && !isTooltipUsed && uptime.length > 0) {
            setToolTip(uptime[uptime.length - 1]);
            setIsTooltipUsed(true);
        }
    }, [isLoading, isTooltipUsed, uptime]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={classNames("container flex-column", {stretch: uptime.length === 0})}>
            <div className="upper row-spaced">
                <label>uptime</label>
                <AgeTooltip updatedAt={uptime[uptime.length - 1] && uptime[uptime.length - 1].updatedAt} />
            </div>

            <ChartHeader
                selectedInterval={selectedInterval}
                onIntervalClick={(e): void => setSelectedInterval(e)}
                date={toolTip.updatedAt}
                values={[
                    {
                        icon: <img src={require("../../assets/icons/polygon.svg")} alt="Polygon" />,
                        value: toolTip.isWorking ? "Online" : "Offline",
                    },
                ]}
            />

            <UptimeChart data={uptime} onMouseMove={updateTooltip} interval={selectedInterval} />
        </div>
    );
};
