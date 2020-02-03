import React, {ReactElement} from "react";
import {Table} from "../../components/Table/Table";

export const PledgedCollateralContainer = (): ReactElement => {
    const data = [
        {id: 'jf3ij56lasdak42djapasurmdanddu728', amount: "0.4", sectors: 25},
        {id: 'kas791jsga82093udmaska7291jkadjad', amount: "1.2", sectors: 12},
    ];

    const columns = [
        { key: "id", label: "ID" },
        { key: "amount", label: "Amount (FIL)" },
        { key: "sectors", label: "Sectors Slashed" },
    ];

    return (
        <div className="container flex-column">
            <div className="upper">
                <label>Pledged collateral</label>
            </div>

            <Table data={data} columns={columns} />
        </div>
    )
};
