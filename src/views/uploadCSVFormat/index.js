import React, { useEffect, useState } from "react";
import { Grid, makeStyles, FormControl, InputLabel, OutlinedInput, Box, Button, Card, CardContent } from '@material-ui/core';
import {baseURL} from "../../api/index";
import File from './../../assets/images/sample.csv';
import CSVFile from './../../assets/images/csv_format.png';
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


const UploadCSVFormat = () => {
    const classes = useStyles();
    let history = useHistory();
    const [selectedFile, setSelectedFile] = React.useState(null);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }
    }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("uploaded_file",selectedFile);

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/web-upload-csv-files",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("upload-csv-format");
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
                                                <InputLabel htmlFor="outlined-adornment-email-login">Upload task to your account (CSV only)</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-login"
                                                    type="file"
                                                    required
                                                    name="uploaded_file"
                                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    label='uploaded_file'
                                                    inputProps={{
                                                        classes: {
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                            <img src={CSVFile}/>
                                            <p><a href={File} download>Download Sample Format</a></p>
                                            <small>( While Uploading remove the heading in the Excel File )</small>
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

export default UploadCSVFormat;
