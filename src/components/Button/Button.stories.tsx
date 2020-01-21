import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonPrimary, ButtonSecondary } from './Button';
import '../../style/index.scss'

storiesOf('Button', module).add('Primary', () => {
    return <ButtonPrimary >login</ButtonPrimary>;
});
