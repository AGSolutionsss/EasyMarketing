import React, { useEffect, useState } from "react";
import {Grid, Button, Card, CardContent, List, ListItem, ListItemText, makeStyles, Typography,OutlinedInput,InputLabel,FormControl} from '@material-ui/core';
import {baseURL} from "../../api/index";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.dark
    },
    secondary: {
        color: theme.palette.grey[500],
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    },
    login: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    login2: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
}));

const AssignModal = (props) => {
    const classes = useStyles();
    const [countvalue, setCountValue] = useState("");
    const [inputvalue, setInputValue] = useState("");

    useEffect(() => {
        
        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/web-pending-task-count', requestOptions)
        .then(response => response.json())
        .then(data => {
            setCountValue(data.pendingtaskcount)
        }); 
    }, []);

    const removeTask = (e) => {
        e.preventDefault();
        props.assignValue('Yes',inputvalue);
    }

    const removeTask2 = (e) => {
        e.preventDefault();
        props.assignValue('No','3');
    }

    return(
        <Card>
            <CardContent className={classes.content}>
                <List className={classes.padding}>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <ListItemText
                            className={classes.padding}
                            primary={<Typography variant="h4">Total remaining task : {countvalue}</Typography>}
                        />
                    </ListItem>
                    <ListItem alignItems="center" disableGutters className={classes.padding}>
                        <form style={{paddingTop:'10px'}}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <FormControl
                                    fullWidth
                                    className={classes.loginput}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-login">No of Task</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        required
                                        type="number"
                                        name="inputvalue"
                                        onChange={(e) => 
                                            {
                                                var value = parseInt(e.target.value, 10);
                                                if (value > countvalue) value = countvalue;
                                                if (value < 1) value = 1;
                                                setInputValue(value);
                                            }}
                                        value={inputvalue}
                                        label='inputvalue'
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            },
                                            min: 1, max: countvalue
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </form>
                    </ListItem>
                    <ListItem alignItems="center" disableGutters style={{paddingTop:'20px'}} className={classes.padding}>
                        <Button
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained"
                            style={{marginRight:'5px',width:'25%'}}
                            className={classes.login}
                            onClick={(e) => removeTask(e)}
                        >
                            Submit
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained"
                            style={{marginRight:'5px',width:'25%'}}
                            className={classes.login2}
                            onClick={(e) => removeTask2(e)}
                        >
                            Cancel
                        </Button>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default AssignModal;