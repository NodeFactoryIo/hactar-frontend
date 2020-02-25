import React from "react";
import classNames from "classnames";

export interface INodeVersion {
    version: string | null;
    updateAvailabe: boolean;
}

export const NodeVersion: React.FunctionComponent<INodeVersion> = ({version, updateAvailabe}: INodeVersion): React.ReactElement => {
    
    return(
        <div className={classNames("row", {alert: updateAvailabe})}>
            <p>{version}</p>
            <i className={classNames("material-icons", {hidden: !updateAvailabe})}>update</i>
        </div>
    );
};
