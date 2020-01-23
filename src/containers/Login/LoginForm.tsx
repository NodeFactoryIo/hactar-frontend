import React from "react";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";

export const LoginForm = () => {
    return (
        <form className="login-form">
            <Input placeholder="Email" icon="email" />
            <Input placeholder="Password" icon="lock" />

            <Button type="primary">Login</Button>
        </form>
    );
};
