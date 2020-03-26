import React from "react";
import NotificationsActive from "@material-ui/icons/NotificationsActiveOutlined";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import classNames from "classnames";
import {Tooltip} from "../../../components/Tooltip/Tooltip";

export interface INotificationBell {
    hasEnabledNotifications: boolean;
    onClick?: () => void;
}

export const NotificationBell: React.FunctionComponent<INotificationBell> = ({
    hasEnabledNotifications,
    onClick,
}: INotificationBell): React.ReactElement => {
    return hasEnabledNotifications ? (
        <Tooltip title="Email notifications are enabled">
            <NotificationsActive onClick={onClick} className={classNames({no_hover: !onClick}, "active")} />
        </Tooltip>
    ) : (
        <Tooltip title="Email notifications are disabled">
            <NotificationsNone onClick={onClick} className={classNames({no_hover: !onClick}, "none")} />
        </Tooltip>
    );
};
