import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductItem from '../ProductItem';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProductsList({ products }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductItem data={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
