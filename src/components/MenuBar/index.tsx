import React from "react";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";

const MenuBar: React.FC = () => {
    const buttons = [
        {
            text: "Home",
            link: "/"
        },
        {
            text: "Users",
            link: "users"
        }
    ];

    return (
        <Grid container spacing={2} sx={{mb: 4}}>
            {buttons.map((button, i) => {
                return (
                    <Grid item xs={6} key={`${button.text}_${i}`}>
                        <Link to={button.link}>
                            <Button variant="contained" sx={{width: "100%", py: 1}}>
                                <Typography
                                    component="span"
                                    align="center"
                                    sx={{fontWeight: "bold"}}
                                >
                                    {button.text}
                                </Typography>
                            </Button>
                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default MenuBar;
