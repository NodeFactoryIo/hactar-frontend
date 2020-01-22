import React from "react";

enum TYPES {
    PRIMARY = "primary",
    SECONDARY = "secondary",
}

interface IBaseButtonProps extends React.HTMLProps<HTMLButtonElement> {
    type: string;
}

const BaseButton = ({type, ...props}: IBaseButtonProps) => <button {...props} className={`button btn-${type}`} />;

export const ButtonPrimary = (props: React.HTMLProps<HTMLButtonElement>) => (
    <BaseButton type={TYPES.PRIMARY} {...props} />
);

export const ButtonSecondary = (props: React.HTMLProps<HTMLButtonElement>) => (
    <BaseButton type={TYPES.SECONDARY} {...props} />
);
