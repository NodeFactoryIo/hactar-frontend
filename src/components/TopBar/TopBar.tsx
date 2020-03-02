import React, {useState} from "react";
import classNames from "classnames";
import {Dropdown} from "../../components/Dropdown/Dropdown";

export interface ITopBarProps {
    email: string;
    logOut: () => void;
}

export const TopBar: React.FunctionComponent<ITopBarProps> = (props: ITopBarProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    return (
        <>
            <div
                onClick={(): void => {
                    setShowDropdown(false);
                }}
                className={classNames("dropdown-screen", {hidden: !showDropdown})}
            />
            <div className="container top-bar">
                <div className="logo-horizontal bar-element" />

                <div onClick={(): void => setShowDropdown(true)} className="bar-element">
                    {props.email}
                    <i className="material-icons">arrow_drop_down</i>
                    <Dropdown
                        showDropdown={showDropdown}
                        elements={[
                            {
                                title: "Log out",
                                iconId: "exit_to_app",
                                onElementClick: (): void => {
                                    props.logOut();
                                },
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};
