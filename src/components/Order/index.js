import React, { useEffect, useState } from "react";

import { Redirect, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Order() {
    const history = useHistory();

    const classes = useStyles();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [addressDirty, setAddressDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    const { order, isAuthorized } = useContext(authContext);

    useEffect(() => {
        if (phoneDirty === "" || addressDirty === "") {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [phoneDirty, addressDirty]);

    const nameHandler = (e) => {
        const { value } = e.target;
        setName(value);
    };

    const phoneHandler = (e) => {
        const { value } = e.target;
        setPhone(value);
    };

    const addressHandler = (e) => {
        const { value } = e.target;
        setAddress(value);
        console.log(value);
        if (!value) {
            setAddressDirty(true);
        } else {
            setAddressDirty(false);
        }
    };

    const handleSubmit = async (e) => {
        history.push("/order");

        e.preventDefault();

        try {
            const params = {
                name,
                phone,
                address,
            };

            await order(params);
        } catch (e) {
            console.log(e);
        }
    };

    if (isAuthorized) {
        return <Redirect to="/" />;
    }

    return (
        <Container fixed component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1">Экспресс Заказ</Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={nameHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={phone}
                        autoComplete="phone"
                        autoFocus
                        error={phoneDirty}
                        onChange={phoneHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        value={address}
                        label="address"
                        type="address"
                        id="address"
                        autoComplete="current-address"
                        error={addressDirty}
                        onChange={addressHandler}
                    />
                    <Link to="/">
                        <Button
                            type="submit"
                            disabled={!formValid}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Заказать
                        </Button>
                    </Link>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
