import React, {ReactElement} from "react";
import Tooltip, {TooltipProps} from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import Info from "@material-ui/icons/Info";
import Fade from "@material-ui/core/Fade";
import Moment from "react-moment";

interface IAgeTooltip {
    updatedAt: string | null;
}

const ageTooltipStyle = makeStyles(() => ({
    arrow: {
        color: "#E1E6F5",
    },
    tooltip: {
        backgroundColor: "#E1E6F5",
        color: "#242B3D",
    },
}));

export const AgeTooltip = (props: IAgeTooltip & Omit<TooltipProps, "children" | "title">): ReactElement => {
    const classes = ageTooltipStyle();
    return (
        <Tooltip
            title={
                props.updatedAt ? (
                    <div className="tooltip-container">
                        <div>This information was updated</div>
                        <Moment date={props.updatedAt} fromNow />
                    </div>
                ) : (
                    <div className="tooltip-container">Unknown how old is information</div>
                )
            }
            placement="top"
            arrow
            classes={classes}
            TransitionComponent={Fade}
            TransitionProps={{timeout: 500}}
            {...props}
        >
            <Info />
        </Tooltip>
    );
};
