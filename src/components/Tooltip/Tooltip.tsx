import React, {ReactElement} from "react";
import MaterialTooltip, {TooltipProps} from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const ageTooltipStyle = makeStyles(() => ({
    arrow: {
        color: "#E1E6F5",
    },
    tooltip: {
        backgroundColor: "#E1E6F5",
        color: "#242B3D",
    },
}));

export const Tooltip = (props: TooltipProps): ReactElement => {
    const classes = ageTooltipStyle();
    return (
        <MaterialTooltip
            title={<div className="tooltip-container">{props.title}</div>}
            placement="top"
            arrow
            classes={classes}
            TransitionComponent={Fade}
            TransitionProps={{timeout: 500}}
        >
            {props.children}
        </MaterialTooltip>
    );
};
