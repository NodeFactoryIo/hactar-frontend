import React, {useState} from "react";
import classNames from "classnames"

export interface ITopBarProps {
    email: string;

}

export const TopBar: React.FunctionComponent<ITopBarProps> = (props: ITopBarProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);


    return (
        <>
        <div 
            onClick={()=>{setShowDropdown(false)}} 
            className={classNames("dropdown-screen", {hidden: !showDropdown}, )}
        />
        <div className="container top-bar">
            <div className="logo-horizontal bar-element" />
    
            <div onClick={(): void => setShowDropdown(true)} className="bar-element">
                {props.email}
                <i className="material-icons">arrow_drop_down</i>
                    <div className={classNames("dropdown", {hidden: !showDropdown}, )}>
                        <div className="item">
                            <i className="material-icons">exit_to_app</i>
                            <div>Log out</div>
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}