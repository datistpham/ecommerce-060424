import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import categoryApi from '../../../../api/categoryApi';

const useStyle = makeStyles((theme) => ({
    categoryList: {
        marginTop: '10px',
        '& li': {
            marginBottom: '5px',
            fontSize: '13px',
            cursor: 'pointer'
        }
    }
}));
const FilterByCategories = props => {
    const [category, setCategory] = useState([]);
    const { onChange } = props;
    useEffect(() => {
        (async () => {
            try {
                const category = await categoryApi.getAll();
                setCategory(category)
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const classes = useStyle();
    const handleCategories = (categoryId) => {
        if (onChange) {
            onChange(categoryId.id)
        }
    }
    return (
        <Box>
            <h5>DANH MỤC SẢN PHẨM</h5>
            <ul className={classes.categoryList}>
                {category.map(i => (
                    <li key={i.id} onClick={() => handleCategories(i)}>{i.name}</li>
                ))}
            </ul>
        </Box>
    )
}

FilterByCategories.propTypes = {
    onChange: PropTypes.func
}

export default FilterByCategories
