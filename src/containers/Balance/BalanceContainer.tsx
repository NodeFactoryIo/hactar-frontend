import React, {ReactElement} from "react";
import "./balance.scss";

export const BalanceContainer = (): ReactElement => {
    return (
        <div className="container flex-column">
            <div className="upper">
                <label>Current balance</label>
            </div>

            <div className="lower balance">
                <h2>122.4589 FIL</h2>
                <p className="yellow">+ 0.0189 FIL (0,0318%)</p>
            </div>
        </div>
    );
};
