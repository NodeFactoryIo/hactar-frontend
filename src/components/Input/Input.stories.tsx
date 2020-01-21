import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import '../../style/index.scss'

storiesOf('Input', module).add('Input', () => {
    return <Input placeholder="placeholder" />;
});
