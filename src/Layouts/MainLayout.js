import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { storeContext } from "../contexts/StoreContext";
import { authContext } from "../contexts/AuthContext";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import BackGroundImg from "../assets/images/wallpaper.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#6c8784",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        minHeight: "100vh",
        position: "relative",
    },
    addBtn: {
        position: "fixed",
        top: "50%",
        right: 15,
        backgroundColor: "#209393",
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    navContent: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
    },
    logo: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    brandLogo: {
        width: 56,
        objectFit: "contain",
    },
}));

export default function MainLayout(props) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const { brands, fetchBrands } = useContext(storeContext);
    const { user, logout } = useContext(authContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnch = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        try {
            logout();
            handleClose();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <IconButton color="inherit">

            <ShoppingCartIcon />
          </IconButton> */}
                    <Link
                        to="/cart"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <IconButton color="inherit">
                            <LocalMallIcon />
                        </IconButton>
                    </Link>
                    <div className={classes.navContent}>
                        <NavLink
                            className={classes.logo}
                            style={{ textDecoration: "none", color: "black" }}
                            to="/"
                        >
                            <Typography variant="h6" noWrap>
                                MyStore
                            </Typography>
                        </NavLink>

                        <SearchBar />
                        {user ? (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={openAnch}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        Выход
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="black"
                                >
                                    Login
                                </Button>

                                <Button
                                    component={Link}
                                    to="/register"
                                    color="red"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {brands.map((brand) => (
                        <Link to={`/brand/${brand.title}`}>
                            <ListItem button key={brand.id}>
                                <ListItemText primary={brand.title} />
                                <ListItemIcon>
                                    <img
                                        className={classes.brandLogo}
                                        src={brand.logo}
                                        alt={`${brand.title} logo`}
                                    />
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <main
                style={{
                    // backgroundImage: `url(${BackGroundImg})`,
                    // objectFit: "cover",
                    backgroundColor: "#D2D7D3",
                }}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div style={{ height: 64 }}></div>
                {props.children}
                <Fab
                    onClick={() => history.push("/products/create")}
                    className={classes.addBtn}
                    color="primary"
                    aria-label="add"
                >
                    <AddIcon />
                </Fab>
            </main>
        </div>
    );
}
