import React, { useEffect, useState } from "react";
import {Card, CardContent, Grid, Typography, useTheme} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import barChart from './chart/bar-chart';
import {gridSpacing} from '../../../store/constant';
import {baseURL} from "../../../api/index";

const ChartCard = (props) => {
    const [userList, setUserList] = useState([]);
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
        fetch(baseURL+'/web-dashboard', requestOptions)
        .then(response => response.json())
        .then(data => {
            
            let res = data.total_user_last_login;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["name"],
                    res[i]["phone"],
                    res[i]["last_login"],
                ]);
              
            }
            setUserList(tempRows)
        }); 
    }, []);
    const theme = useTheme();

    const option = {
        filterType: "dropDown",
        selectableRows: false,
        viewColumns : false,
        filter: false,
        print:false,
        download:false,
        search: false,
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
        "Last Login",
    ]

    const primary = theme.palette.secondary.main;
    barChart.options.grid.borderColor = theme.palette.primary.light;
    barChart.options.yaxis.labels.style.colors = [theme.palette.secondary.main];
    barChart.options.xaxis.labels.style.colors = [primary, primary, primary, primary, primary, primary, primary];

    return (
        <Card>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container direction="column" spacing={1}>
                                    <Grid item>
                                        <Typography variant="subtitle2">Total Active</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3">{props.total_active_user}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Inactive</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">{props.total_inactive_user}</Typography>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <MUIDataTable
                            
                            data={userList}
                            columns={columnData}
                            options={option}
                    
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ChartCard;
