import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from "react-hook-form";
import InputField from '../../../../components/Form/InputField';
import PasswordField from '../../../../components/Form/PasswordField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const LoginForm = (props) => {
    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email').email('Invalid email'),
        password: yup.string().required('Please enter your password').min(8, 'Please enter at least 8 characters'),
    });
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });


    const handleSubmit = async (data) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(data);
        }
        form.reset();
    };
    const { isSubmitting } = form.formState;
    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm
