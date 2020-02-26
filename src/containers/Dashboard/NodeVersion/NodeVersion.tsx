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
    const compareNodeVersions = (): boolean => {
        if (latestVersion && nodeVersion) {
            if (latestVersion.substring(1) === nodeVersion) return false;
            else return true;
        } else return false;
    };

    if (nodeVersion)
        return (
            <div className={classNames("row", {alert: compareNodeVersions})}>
                <p>{nodeVersion}</p>
                <i className={classNames("material-icons", {hidden: !compareNodeVersions})}>update</i>
            </div>
        );
    else
        return (
            <div className={"row"}>
                <p>Loading...</p>
            </div>
        );
};
