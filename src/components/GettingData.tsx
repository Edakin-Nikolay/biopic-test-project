import React, {Dispatch, SetStateAction, useState} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import {Avatar, Button, CircularProgress, Grid, TextField, Typography} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

type GettingDataProps = {
    getPage: (url: string,
              setLoading: Dispatch<SetStateAction<boolean>>,
              setSuccess: Dispatch<SetStateAction<boolean>>,
              setFailed: Dispatch<SetStateAction<boolean>>) => void,
    label: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pink: {
            color: theme.palette.getContrastText(pink[500]),
            backgroundColor: pink[500],
        },
        green: {
            color: '#fff',
            backgroundColor: green[500],
        },
    }),
);

const GettingData = ({getPage, label}: GettingDataProps) => {
    const [loading, setLoading] = useState(false);
    const [successLoaded, setSuccessLoaded] = useState(false);
    const [failLoaded, setFailLoaded] = useState(false);
    const [url, setUrl] = useState("");
    const classes = useStyles();

    function progress () {
        if (loading && !successLoaded && !failLoaded) {
            return <CircularProgress color="primary"/>;
        }
        else if (!loading && successLoaded && !failLoaded) {
            return <Avatar className={classes.green}><DoneIcon/></Avatar>
        }
        else if (!loading && !successLoaded && failLoaded) {
            return <Avatar className={classes.pink}><CloseIcon/></Avatar>
        }
        else return <div/>
    }

    return (<Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
            <Typography variant="body1">{label}</Typography>
        </Grid>
        <Grid item xs={6}>
            <TextField
                variant="standard"
                label="Введите URL запроса"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}/>
        </Grid>
        <Grid item xs={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => getPage(url, setLoading, setSuccessLoaded, setFailLoaded)}
                disabled={loading || !(url.length !== 0)}>Получить</Button>
        </Grid>
        <Grid item xs={1}>
            {progress()}
        </Grid>
    </Grid>)
}

export default GettingData;
