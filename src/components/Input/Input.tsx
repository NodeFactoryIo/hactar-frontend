import React from "react";
import classNames from "classnames";

interface IInputContainerProps extends React.HTMLProps<HTMLInputElement> {
    icon?: string;
    error?: boolean;
}

export const Input = (props: IInputContainerProps) => {
    const {icon, error} = props;

    let iconElement = null;
    if (icon) {
        iconElement = <i className="material-icons">{icon}</i>;
    }

    return (
        <div className={classNames("input-container", {"has-icon": !!icon, error})}>
            {iconElement}
            <input {...props} />
        </div>
    );
}
