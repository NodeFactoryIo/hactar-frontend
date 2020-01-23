import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';
import '../../style/index.scss'

storiesOf('Button', module).add('Primary', () => {
    return <Button type="primary">login</Button>;
});
