import React, {ReactElement} from "react";
import "./balance.scss";
import {INodeBalance} from "../Dashboard/NodeInterface";

export interface ICurrentBalanceContainerProps {
    balance: INodeBalance | null;
}

export const CurrentBalanceContainer: React.FC<ICurrentBalanceContainerProps> = ({
    balance,
}: ICurrentBalanceContainerProps): ReactElement => {
    return (
        <div className="container flex-column">
            <div className="upper">
                <label>Current balance</label>
            </div>

            <div className="lower balance">
                <h2>{balance && balance.currentBalance} FIL</h2>
                <p className="yellow">
                    + {balance && balance.balanceChange} FIL ({balance && balance.balanceChangePerc})
                </p>
            </div>
        </div>
    );
};
