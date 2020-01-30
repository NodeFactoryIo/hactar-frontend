import React, {ReactElement} from "react";
import Moment from "react-moment";

interface IChartHeaderProps {
    date: string;
    value: string;
}

export const ChartHeader = ({ date, value }: IChartHeaderProps): ReactElement => {
    return (
        <div className="lower row-spaced chart-header">
            <div className="row">
                <div className="row">
                    <img src={require("../../assets/icons/time.svg")} />
                    <p>
                        <Moment format="DD MMM, YYYY">{date}</Moment>
                    </p>
                </div>

                <div className="row">
                    <i className="material-icons">account_balance_wallet</i>
                    <p>{value}</p>
                </div>
            </div>

            <div className="row time">
                <span>Day</span>
                <span className="selected">Week</span>
                <span>Month</span>
                <span>Year</span>
            </div>
        </div>
    );
}
