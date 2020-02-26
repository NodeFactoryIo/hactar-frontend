import React, {ReactElement} from "react";
import Moment from "react-moment";

interface IChartHeaderProps {
    date: string;
    values: {icon: ReactElement; value: string}[];
    onIntervalClick: (e: string) => void;
}

export const ChartHeader = ({date, values, onIntervalClick}: IChartHeaderProps): ReactElement => {
    return (
        <div className="lower row-spaced chart-header">
            <div className="row wrapped">
                <div className="row icon-padding">
                    <img src={require("../../assets/icons/time.svg")} />
                    <p>
                        <Moment format="DD MMM, YYYY">{date}</Moment>
                    </p>
                </div>

                {values.length > 1 ? <div className="break-row" /> : null}

                <div className="row">
                    {values.map((v, index) => (
                        <div className="tooltip-values" key={index}>
                            {v.icon}
                            <p>{v.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row time">
                <span 
                    onClick={() => onIntervalClick("day")}
                    className=""
                >Day</span>
                <span 
                    onClick={() => onIntervalClick("week")}
                    className="selected"
                >Week</span>
                <span
                    onClick={() => onIntervalClick("month")}
                    className=""
                >Month</span>
                <span
                    onClick={() => onIntervalClick("year")}
                    className=""
                >Year</span>
            </div>
        </div>
    );
};
