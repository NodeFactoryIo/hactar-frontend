import React, {ReactElement} from "react";
import {TooltipProps} from "@material-ui/core/Tooltip";
import Info from "@material-ui/icons/Info";
import Moment from "react-moment";

import {Tooltip} from "./Tooltip";

interface IAgeTooltip {
    updatedAt: string | null;
}

export const AgeTooltip = (props: IAgeTooltip & Omit<TooltipProps, "children" | "title">): ReactElement => {
    return (
        <Tooltip
            title={
                props.updatedAt ? (
                    <>
                        <div>This information was updated</div>
                        <Moment date={props.updatedAt || 0} fromNow />
                    </>
                ) : <span>Unknown how old is information</span>
            }
        >
            <Info />
        </Tooltip>
    );
};
