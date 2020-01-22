import React from "react";
import classNames from "classnames";

interface IInputContainerProps extends React.HTMLProps<HTMLInputElement> {
    icon?: string;
}

export const Input = (props: IInputContainerProps) => {
    let icon = null;
    if (props.icon) {
        icon = <i className="material-icons">{props.icon}</i>;
    }

    return (
        <div className={classNames("input-container", {"has-icon": !!icon})}>
            {icon}
            <input {...props} />
        </div>
    );
}
