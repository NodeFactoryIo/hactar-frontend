import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './Table';
import '../../style/index.scss'

storiesOf('Table', module).add('Table', () => {
    return <Table />;
});