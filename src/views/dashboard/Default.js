import React, { useEffect, useState } from "react";
import {Grid} from '@material-ui/core';
import {gridSpacing} from '../../store/constant';
import EarningCard from '../../ui-component/cards/EarningCard';
import TotalCard from '../../ui-component/cards/TotalCard';
import TotalChartCard from '../../ui-component/cards/TotalChartCard';
import TotalIncomePatternCard from '../../ui-component/cards/TotalIncomePatternCard';
import TotalIncomeCard from '../../ui-component/cards/TotalIncomeCard';
import ChartCard from '../../ui-component/cards/ChartCard';
import TotalPatternCard from '../../ui-component/cards/TotalPatternCard';
import {baseURL} from "../../api/index";

const Dashboard = () => {

    const [userList, setUserList] = useState([]);
    console.log("test",userList)
    const [total_unassigned_task, settotal_unassigned_task] = useState("");
    const [total_today_assign_task, settotal_today_assign_task] = useState("");
    const [total_pending_task, settotal_pending_task] = useState("");
    const [total_today_sent_task, settotal_today_sent_task] = useState("");
    const [total_sent_task, settotal_sent_task] = useState("");
    const [total_complete_task, settotal_complete_task] = useState("");
    const [total_active_user, settotal_active_user] = useState("");
    const [total_inactive_user, settotal_inactive_user] = useState("");

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
            settotal_unassigned_task(data.total_unassigned_task);
            settotal_today_assign_task(data.total_today_assign_task);
            settotal_pending_task(data.total_pending_task);
            settotal_today_sent_task(data.total_today_sent_task);
            settotal_sent_task(data.total_sent_task);
            settotal_complete_task(data.total_complete_task);
            settotal_active_user(data.total_active_user);
            settotal_inactive_user(data.total_inactive_user);
            setUserList(data.total_user_last_login);
        }); 
    }, []);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard total_unassigned_task={total_unassigned_task}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalChartCard total_today_assign_task={total_today_assign_task}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalCard total_pending_task={total_pending_task}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={8}>
                        <ChartCard total_inactive_user={total_inactive_user} total_active_user={total_active_user}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomePatternCard  total_today_sent_task={total_today_sent_task}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeCard total_sent_task={total_sent_task}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalPatternCard  total_complete_task={total_complete_task}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
