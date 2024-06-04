import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from "prop-types";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/common';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box: {
        padding: '10px 16px',
        '&:hover': {
            boxShadow: '1px 3px 10px #ccc'
        },
        cursor: 'pointer',
        height: '320px'
    },
    control: {
        padding: theme.spacing(2),
    },
    img: {
        width: '100%',
        height: 'auto',
        '& img': {
            maxWidth: '100%'
        }
    },
    productName: {
        fontSize: '13px',
        fontWeight: 400,
        margin: '0px 0px 4px',
        lineHeight: '20px'
    },
    price: {
        fontSize: '15px',
        lineHeight: '24px',
        fontWeight: '500',
        margin: '0px 8px 0px 0px'
    }
}));

const Products = props => {
    const { product } = props;
    const classes = useStyles();
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER;
    return (
        <>
            <Box className={classes.box}>
                <div className={classes.img}>
                    <img src={thumbnailUrl} alt={product.name} />
                </div>
                <p className={classes.productName}>{product.name}</p>
                <p className={classes.price}>{product.salePrice} đ</p>
            </Box>
        </>
    )
}

Products.propTypes = {
    product: PropTypes.object.isRequired
}

export default Products
