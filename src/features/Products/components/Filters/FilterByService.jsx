import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';


const FilterByService = props => {


    const { onChange, filters = {} } = props;
    const serviceArray = [
        {
            'value': 'isPromotion',
            'label': 'Có khuyến mãi'
        },
        {
            'value': 'isFreeShip',
            'label': 'Vận chuyển miễn phí'
        }
    ];

    const handleChange = (e) => {
        if (onChange) onChange({
            [e.target.name]: e.target.checked
        });
    }
    return (
        <Box>
            <h5>DỊCH VỤ</h5>
            <FormGroup>
                {serviceArray.map(i => (
                    <FormControlLabel key={i.value}
                        control={
                            <Checkbox
                                checked={Boolean(filters[i.value])}
                                onChange={handleChange}
                                name={i.value}
                                color="primary"
                            />
                        }
                        label={i.label}
                    />
                ))}
            </FormGroup>
        </Box>
    )
}

FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object
}

export default FilterByService
