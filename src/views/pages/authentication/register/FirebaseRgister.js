import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useHistory  } from "react-router-dom";
import clsx from 'clsx';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
    Typography
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {baseURL} from '../../../../api/index';
import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { NotificationManager } from "react-notifications";
import Google from './../../../../assets/images/icons/social-google.svg';

import {strengthColor, strengthIndicator} from '../../../../utils/password-strength';

const useStyles = makeStyles((theme) => ({
    root: {},
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    margin: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1)
    },
    forgot: {
        textDecoration: 'none'
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    title: {
        color: theme.palette.grey[600]
    },
    login: {
        backgroundColor: '#fec501',
        '&:hover': {
            backgroundColor: '#b08903'
        }
    },
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
    startAdornment: {
        color: theme.palette.grey[500],
        marginTop: '18px',
        width: 'auto'
    }
}));

const FirebaseRgister = ({className, ...rest}) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    let history = useHistory();
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const googleHandler = async () => {

    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassowd = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    fetch(
        encodeURI(baseURL+'/web-check-status'),
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
         
          if (JSON.stringify(data).includes("ok")) {
            
           
          }else{
          
            history.push("/maintenance");
          }
          
         
  
        })
        .catch((err) => {
  
         
         
    });

    useEffect(() => {
        changePassowd('123456');
    }, []);

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    user_company: '',
                    company_full_name: '',
                    location: '',
                    address: '',
                    whatsapp: '',
                    
                    business_type: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    phone: Yup.string().max(255).required('Mobile is required'),
                    user_company: Yup.string().max(255).required('Short Name is required'),
                    company_full_name: Yup.string().max(255).required('Company Full Name is required'),
                })}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    try {

                        if (scriptedRef.current) {

                            let formData = new FormData(); 
                            formData.append('name', values.name);   
                            formData.append('email', values.email);
                            formData.append('phone', values.phone);
                            formData.append('user_company', values.user_company);
                            formData.append('company_full_name', values.company_full_name);
                            formData.append('location', values.location);
                            formData.append('address', values.address);
                            formData.append('whatsapp', values.whatsapp);
                            formData.append('business_type', values.business_type);
                            fetch(
                                encodeURI(baseURL+'/web-signup'),
                                {
                                  method: "POST",
                                  body:formData
                                }
                            )
                            .then((response) => response.json())
                            .then((data) => {
                                if(data.code == 200){
                                    NotificationManager.success("Password is sent to Email");
                                    history.push("/login");
                                }else{
                                    NotificationManager.error("Duplicate data in Mobile or Email");
                                }
                            })
                            .catch((err) => {
                                NotificationManager.error("Duplicate data in Mobile or Email");
                            });

                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({success: false});
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Full Name"
                                    margin="normal"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="company_full_name"
                                    type="text"
                                    value={values.company_full_name}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Short Name"
                                    required
                                    margin="normal"
                                    name="user_company"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.user_company}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Name"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="name"
                                    type="text"
                                    value={values.name}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    className={classes.loginput}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        labelWidth={70}
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {' '}
                                            {errors.email}{' '}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Mobile"
                                    margin="normal"
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="phone"
                                    type="text"
                                    value={values.phone}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Whats App"
                                    margin="normal"
                                    name="whatsapp"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.whatsapp}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="address"
                                    type="text"
                                    value={values.address}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                            
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Location"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="location"
                                    type="text"
                                    value={values.location}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Business Type"
                                    margin="normal"
                                    name="business_type"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.business_type}
                                    variant="outlined"
                                    className={classes.loginput}
                                />
                            </Grid>
                        </Grid>
                        

                        
                        {errors.submit && (
                            <Box mt={3}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box mt={2}>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                className={classes.login}
                            >
                                Sign up
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default FirebaseRgister;
