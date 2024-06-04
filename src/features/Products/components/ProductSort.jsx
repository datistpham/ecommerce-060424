import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from "prop-types";

const useStyles = makeStyles({
    tabs: {
        borderBottom: '1px solid #f3e9e9'
    },
});

const ProductSort = (props) => {
    const { onChange, currentSort } = props;
    const classes = useStyles();

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue)
    };
    return (
        <>
            <div className={classes.tabs}>
                <Tabs
                    value={currentSort}
                    onChange={handleSortChange}
                    indicatorColor="primary"
                    textColor="primary"
                    left
                >
                    <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
                    <Tab label="Giá cao xuống thấp" value="salePrice:DESC"></Tab>
                </Tabs>
            </div>
        </>
    )
}

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default ProductSort
