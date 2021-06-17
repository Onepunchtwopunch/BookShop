import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Truncate from "react-truncate";
import { useHistory } from "react-router";
import { storeContext } from "../../contexts/StoreContext";
import { useContext } from "react";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        borderRadius: 15,
    },
    media: {
        height: 520,
        objectFit: "contain",
    },
    description: {
        height: 100,
        marginTop: 20,
    },
});

export default function ProductItem({ data }) {
    const classes = useStyles();

    const { genre, title, author, images, price, description, id } = data;

    const { addProductToCart } = useContext(storeContext);

    const history = useHistory();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={images[0]}
                    title={title}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        spacing={8}
                        variant="h4"
                        component="h2"
                    >
                        <Truncate
                            style={{ color: "black" }}
                            lines={2}
                            ellipsis={"..."}
                        >
                            {title}
                        </Truncate>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Truncate
                            style={{ color: "black" }}
                            lines={2}
                            ellipsis={"..."}
                        >
                            {author}
                        </Truncate>
                    </Typography>

                    <Typography
                        className={classes.description}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        <Truncate lines={3} ellipsis={"..."}>
                            {description}
                        </Truncate>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            variant="h5"
                        >
                            {price} руб
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    onClick={() => addProductToCart(data)}
                    size="small"
                    color="primary"
                >
                    Cart
                </Button>
                <Button
                    onClick={() => history.push(`/products/${id}`)}
                    size="small"
                    color="primary"
                >
                    Далее
                </Button>
            </CardActions>
        </Card>
    );
}
