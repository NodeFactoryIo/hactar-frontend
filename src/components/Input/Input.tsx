import React from "react";
import classNames from "classnames";

interface IInputContainerProps extends React.HTMLProps<HTMLInputElement> {
    icon?: string;
    error?: string;
}

export const Input = (props: IInputContainerProps) => {
    const {icon, error} = props;
    let iconElement = null;
    if (icon) {
        iconElement = <i className="material-icons">{icon}</i>;
    }

    // let hasError = error;
    // function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     if (props.error) {
    //         hasError = false;
    //     }
    //     if (props.onChange) {
    //         props.onChange(e);
    //     }
    // }

    return (
        <div className="input-wrapper">
            <div className={classNames("input-container", {"has-icon": !!icon, error})}>
                {iconElement}
                <input {...props} />
            </div>
            <div className="error-message">{props.error}</div>
        </div>
    );
};
