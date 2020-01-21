import React from "react";

enum TYPES {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface IBaseButtonProps {
    type: string;
    props: React.HTMLProps<HTMLButtonElement>;
}

const BaseButton = ({type, ...props}: IBaseButtonProps) => (
    <button {...props} className={`button btn-${type}`} />
);

export const ButtonPrimary = (props: React.HTMLProps<HTMLButtonElement>) => (
    <BaseButton type={TYPES.PRIMARY} props={props} />
);

export const ButtonSecondary = (props: React.HTMLProps<HTMLButtonElement>) => (
    <BaseButton type={TYPES.SECONDARY} props={props} />
);
