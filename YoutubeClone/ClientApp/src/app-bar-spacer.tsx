import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    toolbar: theme.mixins.toolbar,
}));

const AppBarSpacer = () => {
    const classes = useStyles();
    return <Box className={classes.toolbar}></Box>    
}

export default AppBarSpacer;