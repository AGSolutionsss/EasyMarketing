import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardContent } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    loginput: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > label': {
            top: '23px',
            left: 0,
            color: theme.palette.grey[500],
            '&[data-shrink="false"]': {
                top: '5px'
            }
        },
        '& > div > input': {
            padding: '30.5px 14px 11.5px !important'
        },
        '& legend': {
            display: 'none'
        },
        '& fieldset': {
            top: 0
        }
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
    login3: {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor:'darkred'
        }
    },
}));


const UploadCopyPaste = () => {
    const classes = useStyles();
    let history = useHistory();
    const [cpData, setCPData] = useState({
        no_of_count: "",
        marketing_data: "",
    });
    const [no_of_count, setCount] = useState(1);

    const useTemplate = {number:"", msg:""};
    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(no_of_count + 1);
    }

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(no_of_count - 1);
    }

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }
    }, []);

    const onSubmit = (e) => {
        let data = {
            marketing_data: users,
            no_of_count:no_of_count,
        };
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/web-upload-copy-paste",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("assign-task-list");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };
       
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    {users.map((user, index)=> (
                                    <Grid container spacing={gridSpacing} key={index}>
                                        <Grid item lg={8} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Message</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    name="msg"
                                                    value={user.msg}
                                                    onChange={e => onChange(e, index)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='msg'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Number</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    name="number"
                                                    value={user.number}
                                                    onChange={e => onChange(e, index)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='number'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={1} md={6} sm={6} xs={12}>
                                            <IconButton onClick={() => removeUser(index)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Grid>
                                        
                                    </Grid>
                                    ))}
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="button"
                                                    variant="contained"
                                                    className={classes.login3}
                                                    onClick={(e) => addItem(e)}
                                                >
                                                Add More
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    className={classes.login}
                                                    onClick={(e) => onSubmit(e)}
                                                >
                                                Submit
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="assign-task-list">
                                                    <Button
                                                        fullWidth
                                                        size="large"
                                                        type="buton"
                                                        variant="contained"
                                                        className={classes.login2}
                                                    >
                                                    Cancel
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default UploadCopyPaste;
