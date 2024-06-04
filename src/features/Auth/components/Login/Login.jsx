import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../LoginForm/LoginForm'
import { useSnackbar } from "notistack";
import { login } from '../../userSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
const Login = (props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()

    const { onClose } = props;
    const handleSubmit = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            if (onClose) {
                await onClose()
            }
            console.log(user);
            enqueueSnackbar('Login successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Login failed', { variant: 'error' });
            console.log(error);
        }
    };
    return (
        <>
            <LoginForm onSubmit={handleSubmit} />
        </>
    );
}

Login.propTypes = {
    onClose: PropTypes.func
}

export default Login
