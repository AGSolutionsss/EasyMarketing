import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardHeader, Typography, Divider, CardContent } from '@material-ui/core';
import {baseURL} from "../../api/index";
import {gridSpacing} from '../../store/constant';
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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


const UserProfile = () => {
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{
            axios({
                url: baseURL+"/web-fetch-profile",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setUserProfile(res.data.profile)
                
              });
        }
    }, []);

    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        phone: "",
        company_full_name: "",
        location: "",
        address: "",
        whatsapp: "",
    });

    const onSubmit = (e) => {
        let data = {
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
            company_full_name: userProfile.company_full_name,
            location: userProfile.location,
            address: userProfile.address,
            whatsapp: userProfile.whatsapp,
        
        };

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/web-update-profile",
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Updated Sucessfully");
                history.push("dashboard/default");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
           return true;
         }else{
           return false;
         }
    }

    const onInputChange = (e) => {
        if(e.target.name=="whatsapp"){
            if(validateOnlyDigits(e.target.value)){
                setUserProfile({
                    ...userProfile,
                    [e.target.name]: e.target.value,
                });
            }
        }else{
            setUserProfile({
                ...userProfile,
                [e.target.name]: e.target.value,
            });
        }
    }
       
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Card >
                        <CardHeader title={<Typography variant="h5">Profile</Typography>} />
                        <Divider />
                        <CardContent>
                            <form id="addIndiv" autoComplete="off">
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
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
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.name}
                                                    label='name'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.email}
                                                    label='email'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Phone</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    disabled
                                                    name="phone"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.phone}
                                                    label='phone'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">whats App</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    name="whatsapp"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.whatsapp}
                                                    label='whatsapp'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Company</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    disabled
                                                    name="company_full_name"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.company_full_name}
                                                    label='company_full_name'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Location</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    name="location"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.location}
                                                    label='location'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <FormControl
                                                fullWidth
                                                className={classes.loginput}
                                                variant="outlined"
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-login">Address</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    required
                                                    name="address"
                                                    onChange={(e) => onInputChange(e)}
                                                    value={userProfile.address}
                                                    label='address'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
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
                                                Update
                                                </Button>
                                            </Grid>
                                            <Grid item lg={2} md={6} sm={6} xs={12}>
                                                <Link to="dashboard/default">
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

export default UserProfile;
