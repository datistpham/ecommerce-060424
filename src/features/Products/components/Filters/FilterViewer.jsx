import { Chip, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import categoryApi from '../../../../api/categoryApi';

const useStyle = makeStyles((theme) => ({
    chipList: {
        margin: '8px 0',
        width: '100%',
        float: 'left',
        '& li': {
            float: 'left',
            marginRight: '10px',
            cursor: 'pointer !important'
        },
    }
}));


const FilterViewer = (props) => {
    const [category, setCategory] = useState([]);
    const classes = useStyle();
    const { onChange = null, filters = {} } = props;
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const category = await categoryApi.get(filters['category.id']);
    //             setCategory(category)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         return () => {
    //             let oldCategory = { ...category }
    //             delete oldCategory.name;
    //         }
    //     })();
    // }, [filters['category.id']]);
    const FILTER_LIST = [
        {
            id: 1,
            getLabel: () => 'Vận chuyển miễn phí',
            isActive: (filters) => filters.isFreeShip,
            isVisible: () => true,
            isRemovable: false,
            onToggle: (filters) => {
                let newFilters = { ...filters };
                newFilters.isFreeShip = !newFilters.isFreeShip;
                return newFilters;
            },
            onRemove: () => { }
        },
        {
            id: 2,
            getLabel: () => 'Có khuyến mãi',
            isActive: () => true,
            isVisible: (filters) => filters.isPromotion,
            isRemovable: (filters) => true,
            onToggle: (filters) => {

            },
            onRemove: (filters) => {
                let newFilters = { ...filters };
                if (newFilters.isPromotion) {
                    delete newFilters.isPromotion
                }
                return newFilters;
            }
        },
        {
            id: 3,
            getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
            isActive: (filters) => true,
            isVisible: (filters) => filters.salePrice_gte || filters.salePrice_lte,
            isRemovable: (filters) => true,
            onToggle: (filters) => { },
            onRemove: (filters) => {
                let newFilters = { ...filters };
                if (newFilters.salePrice_gte && newFilters.salePrice_lte) {
                    delete newFilters.salePrice_gte;
                    delete newFilters.salePrice_lte;
                }
                return newFilters;
            }
        },
        // {
        //     id: 4,
        //     getLabel: (filters) => `${category.name}`,
        //     isActive: (filters) => true,
        //     isVisible: (filters) => { return filters['category.id'] },
        //     isRemovable: (filters) => true,
        //     onToggle: (filters) => { },
        //     onRemove: (filters) => {
        //         let newFilters = { ...filters };
        //         if (newFilters['category.id']) {
        //             delete newFilters['category.id'];
        //         }
        //         return newFilters;
        //     }
        // }
    ];
    const memoizedValue = useMemo(() => FILTER_LIST.filter(x => x.isVisible(filters)), [filters]);
    return (
        <>
            <ul className={classes.chipList}>
                {memoizedValue.map(x => (
                    <li key={x.id}>
                        <Chip
                            label={x.getLabel(filters)}
                            color={x.isActive(filters) ? "primary" : "default"}
                            clickable={!x.isRemovable}
                            onClick={x.isRemovable ? null : () => {
                                if (onChange) onChange(x.onToggle(filters));
                            }}
                            onDelete={x.isRemovable ? () => {
                                if (onChange) onChange(x.onRemove(filters));
                            } : null}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

FilterViewer.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object.isRequired
}

export default FilterViewer
