import React from 'react';
import {storiesOf} from "@storybook/react";
import {Pagination} from "./Pagination";

storiesOf('Pagination', module).add('One page', () => {
    return <Pagination numberOfRecords={10}/>
});

storiesOf('Pagination', module).add('Two pages', () => {
    return <Pagination numberOfRecords={20}/>
});

storiesOf('Pagination', module).add('Five pages', () => {
    return <Pagination numberOfRecords={50}/>
});