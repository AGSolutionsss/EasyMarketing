import React, { useEffect, useState } from "react";
import { Grid, Button, makeStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";
import axios from "axios";
import Switch from '@mui/material/Switch';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.purple.main,
        '&:hover': {
            backgroundColor: theme.palette.purple.dark
        }
    },
    inactive: {
        backgroundColor: "green",
        '&:hover': {
            backgroundColor: "darkgreen"
        }
    },
}));

const UserList = () => {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);

    const onDevice = (e, value) => {
        e.preventDefault();
        axios({
            url: baseURL+"/web-update-user-device/"+value,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            let respon = res.data.user_list;
            let tempRows = [];
                for (let i = 0; i < respon.length; i++) {
              
                    tempRows.push([
                        i+1,
                        respon[i]["name"],
                        respon[i]["phone"],
                        respon[i]["plain_password"],
                        respon[i]["sent"]+" / "+respon[i]["pending"],
                        (respon[i]["device_id"] == null ? <Button
                        fullWidth
                        size="medium"
                        type="button"
                        disabled
                        variant="contained"
                        className={classes.active}
                        
                    >
                    No Device
                    </Button>: <Button
                        fullWidth
                        size="medium"
                        type="button"
                        variant="contained"
                        className={classes.inactive}
                        onClick={(e) => onDevice(e, respon[i]["id"])}
                    >
                    Reset Device
                    </Button>),
                        (respon[i]["is_status_active"] == "n" ? "Inactive": "Active"),
                        respon[i]["is_status_active"]+'#'+respon[i]["id"],
                    ]);
                  
                }
                setUserList(tempRows)
        });

        
    }

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("login");
        if(!isLoggedIn){

            window.location = "/login";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/web-user-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.user_list;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["phone"],
                    res[i]["plain_password"],
                    res[i]["sent"]+" / "+res[i]["pending"],
                    (res[i]["device_id"] == null ? <Button
                    fullWidth
                    size="medium"
                    type="button"
                    disabled
                    variant="contained"
                    className={classes.active}
                    
                >
                No Device
                </Button>: <Button
                    fullWidth
                    size="medium"
                    type="button"
                    variant="contained"
                    className={classes.inactive}
                    onClick={(e) => onDevice(e, res[i]["id"])}
                >
                Reset Device
                </Button>),
                    (res[i]["is_status_active"] == "n" ? "Inactive": "Active"),
                    res[i]["is_status_active"]+'#'+res[i]["id"],
                ]);
              
            }
            setUserList(tempRows)
        }); 
    }, []);

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
    }

    const columnData = [
        {
            name: "#",
            options: {
              filter: false,
              print:false,
              download:false,
            }
        },
        "Full Name",
        "Phone",
        "Password",
        "Sent/Pending",
        {
            name:"Device",
            options:{
                filter: false,
            },
        },
        "Status",
        {
            name: "Inactive/Active",
            options: {
              filter: false,
              print:false,
              download:false,
              customBodyRender: (value) => {

                return (
                  <div style={{ display:'flex', justifyContent:'space-between', minWidth: "150px" , fontWeight: 800}}>
                    <Switch {...value} onChange={(e) => handleChange(e, value)} defaultChecked={((!value.startsWith('y')) ? "": "defaultChecked")}  color="secondary" />
                  </div>
                );
              },
            },
        },
    ]
       

    const handleChange = (e,valuea) => {
        const value = e.target.checked;
        const id = valuea.slice(valuea.indexOf('#') + 1);

        axios({
            url: baseURL+"/web-update-user-status/"+id,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            let respon = res.data.user_list;
            let tempRows = [];
                for (let i = 0; i < respon.length; i++) {
              
                    tempRows.push([
                        i+1,
                        respon[i]["name"],
                        respon[i]["phone"],
                        respon[i]["plain_password"],
                        respon[i]["sent"]+" / "+respon[i]["pending"],
                        (respon[i]["device_id"] == null ? <Button
                        fullWidth
                        size="medium"
                        type="button"
                        disabled
                        variant="contained"
                        className={classes.active}
                        
                    >
                    No Device
                    </Button>: <Button
                        fullWidth
                        size="medium"
                        type="button"
                        variant="contained"
                        className={classes.inactive}
                        onClick={(e) => onDevice(e, respon[i]["id"])}
                    >
                    Reset Device
                    </Button>),
                        (respon[i]["is_status_active"] == "n" ? "Inactive": "Active"),
                        respon[i]["is_status_active"]+'#'+respon[i]["id"],
                    ]);
                  
                }
                setUserList(tempRows)
        });
    }
    

    return (
        <>
        <Grid container>
            <Grid item xs={12}>
                {userList.length > 0 && (
                    <MUIDataTable
                    data={userList}
                    columns={columnData}
                    options={option}
                  
                    />
                )}
                {userList.length <= 0 && (
                    <MUIDataTable
                    columns={columnData}
                    options={option}
                    />
                )}
            </Grid>
        </Grid>
    </>
    );
};

export default UserList;
