import React, {ReactElement} from "react";
import Tooltip, {TooltipProps} from '@material-ui/core/Tooltip';
import {withStyles, Theme, makeStyles} from '@material-ui/core/styles';

interface IAgeTooltip {
    content: string;
}

const ageTooltipStyle = makeStyles(() => ({
    arrow: {
        backgroundColor: "blue",
        color: "yellow",
    },
    tooltip: {
        backgroundColor: "blue",
        color: "yellow",
    },
}))

export const AgeTooltip = (props: Omit<TooltipProps, "title"> & IAgeTooltip) => {
    const classes = ageTooltipStyle();
    return <Tooltip 
            title={`${props.content}`}
            placement="top" 
            arrow 
            classes={classes} 
            {...props} 
        />
} 