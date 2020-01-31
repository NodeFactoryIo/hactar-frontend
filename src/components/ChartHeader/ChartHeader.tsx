import React, {ReactElement} from "react";
import Moment from "react-moment";

interface IChartHeaderProps {
    date: string;
    values: {icon: ReactElement; value: string}[];
}

export const ChartHeader = ({date, values}: IChartHeaderProps): ReactElement => {
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
                <span>Day</span>
                <span className="selected">Week</span>
                <span>Month</span>
                <span>Year</span>
            </div>
        </div>
    );
};
