import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardContent,TextField } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

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
}));

const user_privileges = [
    {
      value: "call",
      label: "call",
    },
    {
      value: "all",
      label: "all",
    },
  ];

const UserAdd = () => {
    const classes = useStyles();
    let history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        user_privilege: "",
        whatsapp: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }
    }, []);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
    }

    const onInputChange = (e) => {

        if(e.target.name=="phone"){
          if(validateOnlyDigits(e.target.value)){
            setUser({
              ...user,
              [e.target.name]: e.target.value,
            });
          }
        }else{
            setUser({
          ...user,
          [e.target.name]: e.target.value,
          });
        }
      };

    const onSubmit = (e) => {
        let data = {
            name: user.name,
            email:user.email,
            phone: user.phone,
            user_privilege: user.user_privilege,
        };
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/web-create-user",
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
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Full Name</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    name="name"
                                                    value={user.name}
                                                    onChange={e => onInputChange(e)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='name'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={e => onInputChange(e)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='email'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Phone</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    name="phone"
                                                    value={user.phone}
                                                    onChange={e => onInputChange(e)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='phone'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Privilege"
                                            margin="normal"
                                            required
                                            onChange={e => onInputChange(e)}
                                            name="user_privilege"
                                            select
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            
                                            value={user.user_privilege}
                                            variant="outlined"
                                            className={classes.loginput}
                                            >
                                            {user_privileges.map((up, key) => (
                                                <MenuItem key={key} value={up.value}>
                                                    {up.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                                <Box mt={2}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={gridSpacing}>
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

export default UserAdd;
