import React from "react";
import { Table as RTable, Column } from "react-virtualized";

export const Table = () => {
    const list = [
        {name: 'Brian Vaughn', description: 'Software engineer', status: "Accepted"},
        {name: 'Alan Ford', description: 'CEO', status: "Unknown"},
        {name: 'Dylan Dog', description: 'Fixer', status: "Failed"},
    ];

    return (
        <RTable
            width={1000}
            height={400}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({index}) => list[index]}
        >
            <Column label="Name" dataKey="name" width={200} />
            <Column label="Status" dataKey="status" width={200} />
            <Column width={300} label="Description" dataKey="description" />
        </RTable>
    );
}

