import React from "react";
import classNames from "classnames";

export interface INodeVersion {
    nodeVersion: string | null;
    latestVersion: string | null;
}

export const NodeVersion: React.FunctionComponent<INodeVersion> = ({
    nodeVersion,
    latestVersion,
}: INodeVersion): React.ReactElement => {
    const isUpdateAvailable = (): boolean => {
        if (latestVersion && nodeVersion) {
            return latestVersion !== nodeVersion;
        } else return false;
    };

    if (nodeVersion)
        return (
            <div className={classNames("row", {alert: isUpdateAvailable()})}>
                <p>{nodeVersion}</p>
                <i className={classNames("material-icons", {hidden: !isUpdateAvailable()})}>update</i>
            </div>
        );
    else
        return (
            <div className={"row"}>
                <p>Loading...</p>
            </div>
        );
};