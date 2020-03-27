import {Component, ReactElement} from "react";
import _ from "lodash";
import moment from "moment";

export interface IChartWrapper {
    data: any[];
    children?: ReactElement;
}

export class ChartWrapper<P extends IChartWrapper> extends Component<P> {
    public shouldComponentUpdate(nextProps: Readonly<IChartWrapper>): boolean {
        return !_.isEqual(this.props.data, nextProps.data);
    }

    public render() {
        return this.props.children;
    }

    protected formatAxisDateDisplay(value: string, interval: string): string {
        const format = interval === "day" ? "HH:mm" : "DD MMM";
        return moment(value)
            .utc()
            .format(format);
    }
}
