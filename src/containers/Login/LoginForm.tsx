import React from "react";
import { useHistory } from "react-router-dom";

import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";
import {Routes} from "../../constants/routes";

export const LoginForm = () => {
    const history = useHistory();

    const onClick = () => {
        history.push(Routes.DASHBOARD_ROUTE);
    };

    return (
        <form>
            <Input placeholder="Email" icon="email" />
            <Input placeholder="Password" icon="lock" />

            <Button type="primary" onClick={onClick}>Login</Button>
        </form>
    );
};
