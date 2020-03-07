import React from "react";
import classNames from "classnames";

export interface INodeNameTitle {
    title: string;
    onClick: () => void;
    showArrow?: boolean;
    arrowOpen: boolean;
    description?: string;
}

export const NodeNameTitle: React.FunctionComponent<INodeNameTitle> = (props: INodeNameTitle): React.ReactElement => {
    const isActive = (showArrow: boolean | undefined): string => {
        if (showArrow) return "inactive";
        else return "active";
    };
    const handleArrow = (arrowOpen: boolean): string => {
        if (arrowOpen) return "up";
        else return "down";
    };

    return (
        <div>
            <div onClick={props.onClick} className={`node-name-title ${isActive(props.showArrow)}`}>
                <h3>{props.title}</h3>
                <div className={classNames({hidden: props.showArrow})}>
                    <i className="material-icons">{`arrow_drop_${handleArrow(props.arrowOpen)}`}</i>
                </div>
            </div>

            <span className="node-name-description">{props.description}</span>
        </div>
    );
};
