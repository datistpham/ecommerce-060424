import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const InputField = (props) => {
    const { name, disabled, form, label } = props;
    const { formState: { errors }, register } = form;
    const hasError = errors[name];
    return (
        <>
            <Controller
                render={({ field }) =>
                    <TextField
                        {...register(name)}
                        {...field}
                        type="text"
                        margin="normal"
                        variant="outlined"
                        label={label}
                        fullWidth
                        error={!!hasError}
                        helperText={errors[name]?.message}
                    />}
                control={form.control}
                name={name}
                disabled={disabled}
            />
        </>
    );
};

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputField;
