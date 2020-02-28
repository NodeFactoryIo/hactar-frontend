import React, {ReactElement} from "react";
import Moment from "react-moment";
import classNames from "classnames";

interface IChartHeaderProps {
    date: string;
    values: {icon: ReactElement; value: string}[];
    onIntervalClick: (e: string) => void;
    selectedInterval?: string;
}

export const ChartHeader = ({date, values, onIntervalClick, selectedInterval}: IChartHeaderProps): ReactElement => {
    const renderInterval = (interval: string): ReactElement => (
        <span
            className={classNames({selected: selectedInterval === interval}, "capitalize")}
            onClick={(): void => onIntervalClick(interval)}
        >
            {interval}
        </span>
    );
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
                {renderInterval("day")}
                {renderInterval("week")}
                {renderInterval("month")}
                {renderInterval("year")}
            </div>
        </div>
    );
};
