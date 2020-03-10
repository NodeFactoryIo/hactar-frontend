import React from "react";
import classNames from "classnames";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

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

    return (
        <div>
            <div onClick={props.onClick} className={`node-name-title ${isActive(props.showArrow)}`}>
                <h3>{props.title}</h3>
                <div className={classNames({hidden: props.showArrow})}>
                    {props.arrowOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
            </div>

            <span className="node-name-description">{props.description}</span>
        </div>
    );
};
