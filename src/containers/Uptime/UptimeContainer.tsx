import React, {ReactElement, useEffect, useState} from "react";
import {ChartHeader} from "../../components/ChartHeader/ChartHeader";
import {UptimeChart} from "./UptimeChart";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {getUptime} from "./UptimeSlice";
import {AgeTooltip} from "../../components/Tooltip/Tooltip";

export const Uptime = (): ReactElement => {
    const uptime = useSelector((state: RootState) => state.node.uptime.data);
    const [toolTip, setToolTip] = useState({isWorking: true, updatedAt: new Date().toString()});
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

    return (
        <div className="container flex-column">
            <div className="upper row-spaced">
                <label>uptime</label>
                <AgeTooltip updatedAt={uptime[0] && uptime[0].updatedAt} />
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

            <UptimeChart data={uptime} onMouseMove={updateTooltip} />
        </div>
    );
};
