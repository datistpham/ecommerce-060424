import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategories from './Filters/FilterByCategories';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const ProductFilter = props => {
    const { onChange, filters } = props;
    const handleCategories = (CategoryId) => {
        if (onChange) {
            onChange({
                'category.id': CategoryId
            });
        }
    };
    const handleChange = (filteredValues) => {
        if (onChange) onChange(filteredValues)
    }
    const handleSubmitPrice = (submittedPrice) => {
        if (onChange) onChange(submittedPrice)
    }
    return (
        <>
            <FilterByCategories onChange={handleCategories} />
            <FilterByService onChange={handleChange} filters={filters} />
            <FilterByPrice onChange={handleSubmitPrice} />
        </>
    )
}

ProductFilter.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object.isRequired
}

export default ProductFilter
