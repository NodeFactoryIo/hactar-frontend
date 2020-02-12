import React, {ReactElement} from "react";
import {TableCellProps} from "react-virtualized";
import {Table} from "../../components/Table/Table";

export const DealsContainer = (): ReactElement => {
    const data = [
        {
            id: "baf5relasida14dasidadmv129kadn",
            status: "Rejected",
            provider: "t01440",
            size: "254 bytes",
            price: "0.5",
            duration: 12,
        },
        {
            id: "jf3ij56lasdak42djapasurmdanddu728",
            status: "Accepted",
            provider: "t01440",
            size: "254 bytes",
            price: "0.4",
            duration: 25,
        },
    ];

    const statusCellRenderer = ({cellData}: TableCellProps) => {
        return <span className={cellData}>{cellData}</span>;
    };

    const columns = [
        {key: "id", label: "ID"},
        {key: "status", renderer: statusCellRenderer},
        {key: "provider"},
        {key: "size"},
        {key: "price", label: "Total price (FIL)"},
        {key: "duration", label: "Duration (blocks)"},
    ];

    return (
        <div className="container flex-column">
            <div className="upper">
                <label>Deals</label>
            </div>

            <Table data={data} columns={columns} />
        </div>
    );
};
