import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';


const ProductSkeletons = props => {
    const { length } = props;
    return (
        <>
            <Grid container spacing={1}>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item xs={3} key={index} xs={12} sm={6} md={4} lg={3}>
                        <Skeleton variant="rect" width={210} height={118} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Grid>
                ))}
            </Grid>


        </>
    )
}

ProductSkeletons.propTypes = {
    length: PropTypes.number
}

export default ProductSkeletons
