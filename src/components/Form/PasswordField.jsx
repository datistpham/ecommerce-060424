import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormHelperText } from "@material-ui/core";
const PasswordField = (props) => {
    const { name, disabled, form, label } = props;
    const { formState: { errors }, register } = form;
    const hasError = errors[name];
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((x) => !x);
    };
    return (
        <>
            <FormControl fullWidth error={hasError} margin="normal" variant="outlined"
            >
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    control={form.control}
                    name={name}
                    disabled={disabled}
                    render={({ field }) => (
                        <OutlinedInput
                            id={name}
                            type={showPassword ? "text" : "password"}
                            label={label}
                            {...register(name)}
                            {...field}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                />

                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </>
    );
};

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export default PasswordField;
