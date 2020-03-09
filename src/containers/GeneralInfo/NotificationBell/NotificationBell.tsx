import React from "react";
import NotificationsActive from "@material-ui/icons/NotificationsActiveOutlined";
import NotificationsNone from "@material-ui/icons/NotificationsNone";

export interface INotificationBell {
    hasEnabledNotifications: boolean;
}

export const NotificationBell: React.FunctionComponent<INotificationBell> = ({
    hasEnabledNotifications,
}: INotificationBell): React.ReactElement => {
    return hasEnabledNotifications ? (
        <NotificationsActive className="notifications_active" />
    ) : (
        <NotificationsNone className="notifications_none" />
    );
};
