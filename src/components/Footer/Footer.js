import { Link } from "@material-ui/core";
import React from "react";
import classes from "../Footer/footer.module.css";
import CallEndOutlinedIcon from "@material-ui/icons/CallEndOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function Footer() {
    return (
        <footer>
            <div className={classes.ContInfo}>
                <h2>Контакты:</h2>
                <CallEndOutlinedIcon style={{ color: "black" }} />
                <a href="+996555555555"> +996 555 555 555</a>
                <br />
                <MailOutlineIcon style={{ color: "black" }} />
                <a href="Bookshop@gmail.com">bookshop@gmail.com</a>
            </div>
            <div>
                <h2>Реклама на сайте</h2>
                <CallEndOutlinedIcon style={{ color: "black" }} />
                <a href="+996555666666"> +996 555 666 666</a>
                <br />
                <MailOutlineIcon style={{ color: "black" }} />
                <a href="Bookshop@gmail.com">bookshop.ofis@gmail.com</a>
            </div>
            <div>
                <h2>Информация:</h2>
                <a href="+996555666666"> Скоро в продаже</a>
                <br />
                <a href="+996555666666"> Подарки </a>
            </div>
            <div></div>
        </footer>
    );
}
