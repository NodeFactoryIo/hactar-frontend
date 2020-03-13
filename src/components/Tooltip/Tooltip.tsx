import React, {ReactElement} from "react";
import Tooltip, {TooltipProps} from '@material-ui/core/Tooltip';
import {withStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Info from "@material-ui/icons/Info";
import Fade from '@material-ui/core/Fade';

const ageTooltipStyle = makeStyles(() => ({
    arrow: {
        color: "#E1E6F5",
    },
    tooltip: {
        backgroundColor: "#E1E6F5",
        color: "#242B3D",
    },
}))

export const AgeTooltip = (props: Omit<TooltipProps, "children">) => {
    const classes = ageTooltipStyle();
    return <Tooltip 
            title={props.title}
            placement="top" 
            arrow 
            classes={classes}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
            {...props} 
        >
            <Info />
        </Tooltip>
} 