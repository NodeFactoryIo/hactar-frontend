import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import '../../style/index.scss'

storiesOf('Input', module).add('Input', () => {
    return <Input placeholder="placeholder" />;
});

storiesOf('Input', module).add('Input with icon', () => {
    return <Input placeholder="placeholder" icon="email" />;
});

storiesOf('Input', module).add('Input with error', () => {
    return <Input placeholder="placeholder" icon="email" error="Invalid email" value="fake@email.com" />;
});