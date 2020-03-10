import React from "react";
import NotificationsActive from "@material-ui/icons/NotificationsActiveOutlined";
import NotificationsNone from "@material-ui/icons/NotificationsNone";

export interface INotificationBell {
    hasEnabledNotifications: boolean;
    onClick?: () => void;
}

export const NotificationBell: React.FunctionComponent<INotificationBell> = ({
    hasEnabledNotifications,
    onClick,
}: INotificationBell): React.ReactElement => {
    return hasEnabledNotifications ? (
        <NotificationsActive onClick={onClick} className={`active ${onClick ? "" : "no_hover"}`} />
    ) : (
        <NotificationsNone onClick={onClick} className={`none ${onClick ? "" : "no_hover"}`} />
    );
};
