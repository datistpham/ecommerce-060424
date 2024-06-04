import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import productApi from '../../../api/productApi';
import ProductSort from '../components/ProductSort';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletons from '../components/ProductSkeletons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    floatRight: {
        float: 'right !important'
    },
    pagination: {
        width: '100%'
    },
    rightCol: {
        borderLeft: '1px solid #f3e9e9 !important',
        backgroundColor: '#fff'
    },
    leftCol: {
        backgroundColor: '#fff'
    }
}));
const ListPage = props => {
    const [product, setProduct] = useState([]);
    const [loading, isLoading] = useState(true);
    let history = useHistory();
    let location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 10,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search]);
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _total: 10
    });
    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                setProduct(data);
                setPagination(pagination);
            } catch (error) {
                console.log(error);
            }
            isLoading(false)
        })();
    }, [queryParams]);

    const classes = useStyles();
    const handlePageChange = (e, _page) => {
        const filters = {
            ...queryParams,
            _page: _page
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    };
    const handleSortChange = (newSortValue) => {
        const filters = {
            ...queryParams,
            _sort: newSortValue
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        });
    };
    const handleFilterChange = (newFilterValue) => {
        const filters = {
            ...queryParams,
            ...newFilterValue
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        });
    };
    const handleViewerFilter = (newFilterValue) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilterValue)
        });
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.leftCol}>
                    <Box>
                        <ProductFilter onChange={handleFilterChange} filters={queryParams} />
                    </Box>
                </Grid>
                <Grid item xs={9} className={classes.rightCol}>
                    <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                    <FilterViewer onChange={handleViewerFilter} filters={queryParams} />
                    {loading ? <ProductSkeletons length={8} /> : <ProductList data={product} />}
                </Grid>
                <div className={classes.pagination}>
                    <Pagination
                        className={classes.floatRight}
                        count={Math.ceil(pagination._total / pagination._limit)}
                        page={pagination._page}
                        onChange={handlePageChange}
                        color="primary" />
                </div>
            </Grid>
        </Container>
    )
}

ListPage.propTypes = {

}

export default ListPage
