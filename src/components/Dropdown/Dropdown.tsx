import React from "react";
import classNames from "classnames";

interface IDropdownElement {
    title: string;
    iconId: string;
    onElementClick: () => void;
}

interface IDropdownProps {
    elements: Array<IDropdownElement>;
    showDropdown: boolean;
}

export const Dropdown: React.FC<IDropdownProps> = (props: IDropdownProps) => {
    return (
        <div className={classNames("dropdown", {hidden: !props.showDropdown})}>
            {props.elements.map((el, index) => {
                return (
                    <div key={index} onClick={() => el.onElementClick()} className="item">
                        <i className="material-icons">{el.iconId}</i>
                        <div>{el.title}</div>
                    </div>
                );
            })}
        </div>
    );
};
