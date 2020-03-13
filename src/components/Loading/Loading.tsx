import React, {ReactElement} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = (): ReactElement => {
    return (
        <div className="loading-container">
            <CircularProgress color="inherit" />
        </div>
    );
};
