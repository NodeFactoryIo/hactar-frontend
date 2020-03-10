import React from "react";
import NotificationsActive from "@material-ui/icons/NotificationsActiveOutlined";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import classNames from "classnames";

export interface INotificationBell {
    hasEnabledNotifications: boolean;
    onClick?: () => void;
}

export const NotificationBell: React.FunctionComponent<INotificationBell> = ({
    hasEnabledNotifications,
    onClick,
}: INotificationBell): React.ReactElement => {
    return hasEnabledNotifications ? (
        <NotificationsActive onClick={onClick} className={classNames({no_hover: !onClick}, "active")} />
    ) : (
        <NotificationsNone onClick={onClick} className={classNames({no_hover: !onClick}, "none")} />
    );
};
