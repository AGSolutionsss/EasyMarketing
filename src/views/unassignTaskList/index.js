import React, { useEffect, useState } from "react";
import { Grid } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {baseURL} from "../../api/index";

const UnassignTaskList = () => {
    
    const [unassignList, setUnAssignList] = useState([]);

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


        fetch(baseURL+'/web-unassign-task-list', requestOptions)
        .then(response => response.json())
        .then(data => {
            let res = data.unassigntasklist;
            let tempRows = [];
            for (let i = 0; i < res.length; i++) {
          
                tempRows.push([
                    i+1,
                    res[i]["number"],
                    res[i]["msg"],
                    res[i]["id"],
                ]);
              
            }
            setUnAssignList(tempRows)
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
        "Number",
        "Message",  
    ];
       
    return (
        <>
        <Grid container>
            <Grid item xs={12}>
                {unassignList.length > 0 && (
                    <MUIDataTable
                    data={unassignList}
                    columns={columnData}
                    options={option}
                  
                    />
                )}
                {unassignList.length <= 0 && (
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

export default UnassignTaskList;
