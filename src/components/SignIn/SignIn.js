import React, { useEffect, useState } from 'react';

import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { authContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'
import { useContext } from 'react';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.success.main
    },

    container: {
        backgroundColor: theme.palette.info.light,
    },
    typography: {
        color: theme.palette.text.primary,

    },
}));


export default function SignIn() {
    const classes = useStyles()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email can not be empty');
    const [passwordError, setPasswordError] = useState('Password can not be empty');
    const [formValid, setFormValid] = useState(false)

    const { login, user, isAuthorized } = useContext(authContext)


    useEffect(() => {
        if (emailError === '' || passwordError === '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        const { value } = e.target;
        setEmail(value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
            setEmailError('некорректный емайл')
            setEmailDirty(true)
        } else {
            setEmailError('')
            setEmailDirty(false)
        }

    }

    const passwordHandler = (e) => {
        const { value } = e.target
        setPassword(value)
        console.log(value.length)
        if (value.length < 3 || value.length > 8) {
            console.log('asdas')
            setPasswordError('пароль должен быть длиннее 3 и короче 8')
            setPasswordDirty(true)
            if (!value) {
                setPasswordError('некорректный пароль')
                setPasswordDirty(true)
            }
        } else {
            setPasswordError('')
            setPasswordDirty(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const params = {
                email,
                password
            }

            await login(params)
        } catch (e) {
            console.log(e)
        }
    }

    if (isAuthorized) {
        return <Redirect to="/" />
    }

    return (
        <Container className={classes.container} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography className={classes.typography} component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        autoComplete="email"
                        autoFocus
                        error={emailDirty}
                        helperText={emailError}
                        onChange={emailHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={passwordDirty}
                        helperText={passwordError}
                        onChange={passwordHandler}
                    />
                    <Button
                        type="submit"
                        disabled={!formValid}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Регистрация
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}