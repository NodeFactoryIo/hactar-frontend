import React from "react";
import {Input} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button";

export const RegisterForm = () => {
    return (
        <form>
            <Input placeholder="Email" icon="email" />
            <Input placeholder="Password" type="password" icon="lock" />
            <Input placeholder="Repeat password" type="password" icon="lock" />

            <Button type="primary">Sign up</Button>
        </form>
    );
};
