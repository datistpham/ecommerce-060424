import { Grid } from '@material-ui/core';
import PropTypes from "prop-types";
import React from 'react';
import Products from './Products';


const ProductList = (props) => {
    const { data } = props;
    return (
        <>
            <Grid container spacing={1}>
                {data.map((product) =>
                (
                    <Grid item xs={3} xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Products product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

ProductList.propTypes = {
    data: PropTypes.array.isRequired
}

export default ProductList
