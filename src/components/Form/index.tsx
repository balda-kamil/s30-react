import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";

type Inputs = {
    email: "string";
    roles: string[];
    fullName: string;
};

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    console.log(watch("email"), watch("roles"), watch("fullName"));

    return <>user form</>;
};

export default Form;
