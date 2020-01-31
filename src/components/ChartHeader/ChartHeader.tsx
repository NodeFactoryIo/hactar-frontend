import React, {ReactElement} from "react";
import Moment from "react-moment";

interface IChartHeaderProps {
    date: string;
    values: {icon: string; value: string}[];
}

export const ChartHeader = ({date, values}: IChartHeaderProps): ReactElement => {
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
                    {values.map(v => (
                        <>
                            <i className="material-icons">{v.icon}</i>
                            <p>{v.value}</p>
                        </>
                    ))}
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
};
