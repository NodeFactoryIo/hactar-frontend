import React from "react";
import { Table as RTable, Column } from "react-virtualized";

interface ITableProps {
    data: Object[];
    columns: any[];
}

export const Table = ({ data, columns }: ITableProps) => {
    return (
        <RTable
            width={1000}
            height={400}
            headerHeight={20}
            rowHeight={30}
            rowCount={data.length}
            rowGetter={({index}) => data[index]}
        >
            {columns.map((column, index) => (
                <Column
                    key={index}
                    label={column.label || column.key}
                    dataKey={column.key}
                    width={200}
                />
            ))}
        </RTable>
    );
}

