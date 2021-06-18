import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../ProductItem";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

export default function ProductsListAll({ products }) {
    const classes = useStyles();

    return (
        <div style={{ padding: 25 }}>
            <Typography variant="subtitle1" gutterBottom>
                Все категории:
            </Typography>
            <Grid container spacing={5}>
                {products.map((product) => (
                    <Grid item xs={2}>
                        <ProductItem data={product} />
                    </Grid>
                ))}
            </Grid>
            <Divider className={classes.divider} />
        </div>
    );
}
