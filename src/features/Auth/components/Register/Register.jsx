import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from 'react-redux';
import RegisterForm from "../RegisterForm/RegisterForm";
import { register } from '../../userSlice';
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

const Register = (props) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()

    const { onClose } = props;
    const handleSubmit = async (values) => {
        try {
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            if (onClose) {
                await onClose()
            }
            enqueueSnackbar('Registerd successfully', { variant: 'success' });
        } catch (error) {
            console.log('Register failed');
            enqueueSnackbar('Register failed', { variant: 'error' });
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
};

Register.propTypes = {
    onClose: PropTypes.func
};

export default Register;
