import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    rightCol: {
        borderLeft: '1px solid #f3e9e9 !important',
        backgroundColor: '#fff'
    },
    leftCol: {
        backgroundColor: '#fff'
    }
}));
const DetailPage = props => {
    const classes = useStyles();
    console.log('Detail Page');
    return (
        // <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        //     <Grid container spacing={2}>
        //         <Grid item xs={3} className={classes.leftCol}>
        //             thumbnail
        //             </Grid>
        //         <Grid item xs={9} className={classes.rightCol}>
        //             info asdasdasd
        //         </Grid>
        //     </Grid>
        // </Container>
        <>
            <h2>Detail Page</h2>
        </>
    )
}

DetailPage.propTypes = {

}

export default DetailPage
