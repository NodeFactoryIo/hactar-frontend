import React, {ReactElement, useState} from "react";
import Moment from "react-moment";

interface IChartHeaderProps {
    date?: string;
    values: {icon: ReactElement; value: string}[];
    onIntervalClick: (e: string) => void;
}

export const ChartHeader: React.FC<IChartHeaderProps> = ({
    date,
    values,
    onIntervalClick,
}: IChartHeaderProps): ReactElement => {
    const [selectedInterval, setSelectedInterval] = useState<string>("year");

    const handleIntervalClick = (interval: string): void => {
        onIntervalClick(interval);
        setSelectedInterval(interval);
    };
    const handleClass = (spanValue: string): string => {
        if (spanValue === selectedInterval) return "selected";
        else return "";
    };

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
                <span onClick={() => handleIntervalClick("day")} className={handleClass("day")}>
                    Day
                </span>
                <span onClick={() => handleIntervalClick("week")} className={handleClass("week")}>
                    Week
                </span>
                <span onClick={() => handleIntervalClick("month")} className={handleClass("month")}>
                    Month
                </span>
                <span onClick={() => handleIntervalClick("year")} className={handleClass("year")}>
                    Year
                </span>
            </div>
        </div>
    );
};
