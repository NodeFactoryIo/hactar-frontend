import React from 'react';
import {storiesOf} from "@storybook/react";
import {Pagination} from "./Pagination";

storiesOf('Pagination', module).add('One page', () => {
    return <Pagination numberOfRecords={10} pageRecordsLimit={10} onPageChange={() => {}}/>
});

storiesOf('Pagination', module).add('Two pages', () => {
    return <Pagination numberOfRecords={20} pageRecordsLimit={10} onPageChange={() => {}}/>
});

storiesOf('Pagination', module).add('Five pages', () => {
    return <Pagination numberOfRecords={50} pageRecordsLimit={10} onPageChange={() => {}}/>
});