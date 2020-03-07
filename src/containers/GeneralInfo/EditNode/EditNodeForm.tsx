import React, {ReactElement, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import {Input} from "../../../components/Input/Input";
import {Button} from "../../../components/Button/Button";
import {RootState} from "../../../app/rootReducer";
import {submitEditNode} from "../../NodeList/NodeListSlice";

export interface IEditNodeFormData {
    name: string;
    description?: string;
}

interface IEditNodeFormProps {
    onSubmit: () => void;
}

export const EditNodeForm: React.FC<IEditNodeFormProps> = ({onSubmit}: IEditNodeFormProps): ReactElement => {
    const state = useSelector((state: RootState) => state);
    const {data} = state.nodeList;
    const selectedNode = _.find(data, (node: any) => node.id === state.app.selectedNodeId);

    const {register, handleSubmit, errors, control} = useForm<IEditNodeFormData>({
        defaultValues: {
            name: selectedNode.name,
            description: selectedNode.description || "",
        },
    });

    const dispatch = useDispatch();

    const onFormSubmit = handleSubmit((submitData: IEditNodeFormData) => {
        dispatch(submitEditNode(state.app.selectedNodeId!, submitData));
        onSubmit();
    });

    useEffect(() => {
        register(
            {name: "name"},
            {
                required: "Name is required.",
            },
        );
    }, [register]);

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <Controller
                    as={Input}
                    control={control}
                    name="name"
                    type="text"
                    placeholder="Node name"
                    error={errors.name && errors.name.message}
                />
                <Controller
                    as={Input}
                    control={control}
                    name="description"
                    type="text"
                    placeholder="Description (optional)"
                    error={errors.description && errors.description.message}
                />

                <div className="row button-container">
                    <Button onClick={onSubmit} type="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onFormSubmit} type="primary">
                        SAVE
                    </Button>
                </div>
            </form>
        </>
    );
};
