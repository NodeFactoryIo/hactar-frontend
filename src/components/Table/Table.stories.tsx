import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './Table';
import '../../style/index.scss'

storiesOf('Table', module).add('Deals', () => {
    const data = [
        {id: 'baf5relasidadasidadmv', status: 'Rejected', provider: "t01440", size: "254 bytes", price: "0.5", duration: 12},
        {id: 'jf3ij56lasdakdja', status: 'Accepted', provider: "t01440", size: "254 bytes", price: "0.4", duration: 25},
    ];

    const columns = [
        { key: "id" },
        { key: "status" },
        { key: "provider" },
        { key: "size" },
        { key: "price", label: "Total price (FIL)" },
        { key: "duration", label: "Duration (blocks)" },
    ];

    return <Table data={data} columns={columns} />;
});