import React from "react";
import NotificationsActive from "@material-ui/icons/NotificationsActiveOutlined";
import NotificationsNone from "@material-ui/icons/NotificationsNone";

export interface INotificationBell {
    hasEnabledNotifications: boolean;
    onClick?: () => void;
}

export const NotificationBell: React.FunctionComponent<INotificationBell> = ({
    hasEnabledNotifications, onClick
}: INotificationBell): React.ReactElement => {
    return hasEnabledNotifications ? (
        <NotificationsActive onClick={onClick} className="notifications_active" />
    ) : (
        <NotificationsNone onClick={onClick} className="notifications_none" />
    );
};
