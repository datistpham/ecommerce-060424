import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        '& input': {
            marginRight: theme.spacing(1),
            width: '95px',
            height: '30px',
            padding: '0px 8px',
            background: 'rgb(255, 255, 255)',
            borderRadius: '4px',
            textAlign: 'left',
            border: '1px solid rgb(184, 184, 184)',
            'outline': '0px',
            fontSize: '13px'
        }
    },
    formPrice: {
        marginTop: '10px'
    },
    buttonSubmit: {
        width: '90px',
        height: '27px',
        textAlign: 'center',
        borderRadius: '4px',
        border: '1px solid rgb(13, 92, 182)',
        'outline': '0px',
        fontSize: '13px',
        padding: '0px 8px',
        color: 'rgb(13, 92, 182)',
        background: 'rgb(255, 255, 255)',
        marginTop: '10px',
        cursor: 'pointer'
    }
}));
const FilterByPrice = props => {
    const { onChange } = props;
    const classes = useStyles();
    const schema = yup.object().shape({
        salePrice_gte: yup.number().required('Please enter your price'),
        salePrice_lte: yup.string().required('Please enter your price'),
    });
    const form = useForm({
        defaultValues: {
            salePrice_gte: '',
            salePrice_lte: '',
        },
        resolver: yupResolver(schema),
    });
    const { register, formState: { errors }, } = form;
    const onSubmit = (values) => {
        if (onChange) {
            onChange(values)
        }
        form.reset();
    }
    return (
        <>
            <h5>GIÁ</h5>
            <form onSubmit={form.handleSubmit(onSubmit)} className={classes.formPrice}>
                <div className={classes.inputGroup}>
                    <Controller
                        render={({ field }) =>
                            <input
                                {...register("salePrice_gte")}
                                {...field}
                                type="text"
                            />}
                        control={form.control}
                        name="salePrice_gte"
                    />
                    <p className="error ">{errors.salePrice_gte?.message}</p>
                    <span>-</span>
                    <Controller
                        render={({ field }) =>
                            <input
                                {...register("salePrice_lte")}
                                {...field}
                                type="text"
                            />}
                        control={form.control}
                        name="salePrice_lte"
                    />
                    <p className="error ">{errors.salePrice_lte?.message}</p>
                </div>
                <button className={classes.buttonSubmit} type="submit">
                    Áp dụng
                </button>
            </form>
        </>
    )
}

FilterByPrice.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default FilterByPrice
