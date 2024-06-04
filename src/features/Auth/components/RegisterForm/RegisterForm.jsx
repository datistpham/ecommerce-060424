import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from "react-hook-form";
import InputField from '../../../../components/Form/InputField';
import PasswordField from '../../../../components/Form/PasswordField';
import './style.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const RegisterForm = (props) => {
    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your full name').test('should have at least two words', 'Your name should be larger than 2 words', value => {
            return value.split(' ').length >= 2
        }),
        email: yup.string().required('Please enter your email').email('Invalid email'),
        password: yup.string().required('Please enter your password').min(8, 'Please enter at least 8 characters'),
        retypePassword: yup.string().required('Please retype your password').min(8, 'Please enter at least 8 characters')
            .oneOf([yup.ref('password')], 'Your password does not match')
    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
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
                <InputField name="fullName" label="Full name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype password" form={form} />
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </form>
        </>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default RegisterForm
