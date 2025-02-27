import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import { calcTotalPrice } from "../../helpers/calcPrice";
import { storeContext } from "../../contexts/StoreContext";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    paper: {
        maxWidth: 1000,
        margin: "40px auto",
        backgroundColor: theme.palette.divider,
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        Color: theme.palette.action.active,
        borderRadius: 5,
        margin: theme.spacing(3, 2, 2),
    },
}));

export default function Cart() {
    const classes = useStyles();
    const { cart, getCart, changeProductCount } = useContext(storeContext);

    useEffect(() => {
        getCart();
    }, []);

    const handleOrder = () => {
        localStorage.removeItem("cart");
    };

    return (
        <>
            <Link to="/">
                <button className={classes.button}>Home</button>
            </Link>
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">SubPrice</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.products ? (
                            <>
                                {cart.products.map((elem) => (
                                    <TableRow key={elem.item.id}>
                                        <TableCell>
                                            <img
                                                style={{ width: "50px" }}
                                                src={elem.item.images[0]}
                                                alt=""
                                            />{" "}
                                        </TableCell>
                                        <TableCell align="right">
                                            {elem.item.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {elem.item.price}
                                        </TableCell>
                                        <TableCell align="right">
                                            <input
                                                type="number"
                                                value={elem.count}
                                                onChange={(e) =>
                                                    changeProductCount(
                                                        e.target.value,
                                                        elem.item.id
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            {elem.subPrice}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : null}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>
                                <Typography variant="h5">Total: </Typography>{" "}
                            </TableCell>
                            {cart.products ? (
                                <TableCell align="right">
                                    <Typography variant="h5">
                                        {" "}
                                        {calcTotalPrice(cart.products)}{" "}
                                    </Typography>{" "}
                                </TableCell>
                            ) : null}
                        </TableRow>
                        <Link to="/order">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleOrder}
                            >
                                Заказать
                            </Button>
                        </Link>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
