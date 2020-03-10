import React, {useState} from "react";
import classNames from "classnames";
import {Dropdown} from "../../components/Dropdown/Dropdown";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ExitToApp from "@material-ui/icons/ExitToApp";

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
                    <ArrowDropDown />
                    <Dropdown
                        showDropdown={showDropdown}
                        elements={[
                            {
                                title: "Log out",
                                iconId: <ExitToApp />,
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
