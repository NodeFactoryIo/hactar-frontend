import React, {ReactElement, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Input} from "../../../components/Input/Input";
import {Button} from "../../../components/Button/Button";

export interface IEditNodeFormData {
    nodeName: string;
    description?: string;
}

interface IEditNodeFormProps {
    onEditNodeSubmit: (submitData: IEditNodeFormData) => void;
    onCancel: () => void;
}  

export const EditNodeForm: React.FC<IEditNodeFormProps> = ({onEditNodeSubmit, onCancel}: IEditNodeFormProps): ReactElement => {
    const {register, handleSubmit, errors, control} = useForm<IEditNodeFormData>();

    const onSubmit = handleSubmit((submitData: IEditNodeFormData) => {
        onEditNodeSubmit(submitData);
    });

    useEffect(()=>{
        register(
            {name: "email"},
            {
                required: "Name is required!",
            },
        );
    },[register])
    return(
        <form onSubmit={onSubmit}>
            <Controller
            as={Input}
            control={control}
            name="nodeName"
            type="text"
            placeholder="Node name"
            error={errors.nodeName && errors.nodeName.message}
            />
            <Controller
            as={Input}
            control={control}
            name="description"
            type="text"
            placeholder="Description(optional)"
            error={errors.description && errors.description.message}
            />
            <div className="row button-container">
                <Button onClick={onCancel} type="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} type="primary">
                    SAVE
                </Button>
            </div>
        </form>
    );
}