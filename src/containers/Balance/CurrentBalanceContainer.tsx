import React, {ReactElement} from "react";
import "./balance.scss";
import {INodeBalance} from "../Dashboard/NodeInterface";

export interface ICurrentBalanceContainerProps {
    balance: INodeBalance | null;
}

export const CurrentBalanceContainer: React.FC<ICurrentBalanceContainerProps> = ({
    balance,
}: ICurrentBalanceContainerProps): ReactElement => {
    if (balance)
        return (
            <div className="container flex-column">
                <div className="upper">
                    <label>Current balance</label>
                </div>

                <div className="lower balance">
                    <h2>{balance.currentBalance} FIL</h2>
                    <p className="yellow">
                        + {balance.balanceChange} FIL ({balance.balanceChangePerc})
                    </p>
                </div>
            </div>
        );
    else
        return (
            <div className="container flex-column">
                <div className="upper">
                    <label>Loading balance...</label>
                </div>
            </div>
        );
};
